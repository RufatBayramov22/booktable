import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import style, { _styles } from './style';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import AboutRestaurant from '../../components/AboutRestaurant/AboutRestaurant';
import Menu from '../../components/RestaurantMenu/Menu';
import Gallery from '../../components/Gallery/Gallery';
import { ScrollView } from 'react-native-gesture-handler';
import apiRequest from '../../api/apirequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SingleRestaurantRouteProp = RouteProp<RootStackParamList, 'SingleRestaurant'>;

interface Restaurant {
  id: number;
  name: string;
  about: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
  isPriceRangeVisible: boolean;
  isAviable: boolean;
  restaurantImages?: {
    id: number;
    restaurantId: number;
    restaurantImgUrl: string;
  }[];
}

interface WishlistItem {
  id: number;
  restaurantId?: number;
  restaurant?: {
    id: number;
  } | null;
}

const SingleRestaurant: React.FC = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<SingleRestaurantRouteProp>();
  const { id } = route.params;

  const [activeTab, setActiveTab] = useState<string>('About');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const loadWishlistStatus = async (token: string, restaurantId: number) => {
    try {
      const wishlistRes = await apiRequest.get('/UserWishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const wishlistData: WishlistItem[] = Array.isArray(wishlistRes.data?.data)
        ? wishlistRes.data.data
        : Array.isArray(wishlistRes.data)
          ? wishlistRes.data
          : [];

      const exists = wishlistData.some(item => {
        return item.restaurantId === restaurantId || item.restaurant?.id === restaurantId || item.id === restaurantId;
      });

      setIsFavorite(exists);
    } catch {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await apiRequest.get(
          `/Restaurants/get-by-id?Id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRestaurant(res.data.data);

        if (token) {
          await loadWishlistStatus(token, id);
        }
      } catch (error) {
        console.error('Restoran detalları yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const toggleWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      if (isFavorite) {
        await apiRequest.delete(
          `/UserWishlist?restaurantId=${restaurant?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIsFavorite(false);
        Alert.alert('Success', 'Removed from wishlist');
      } else {
        try {
          await apiRequest.post(
            '/UserWishlist',
            { restaurantId: restaurant?.id },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          setIsFavorite(true);
          Alert.alert('Success', 'Added to wishlist');
        } catch (error: any) {
          if (error.response?.status === 400 || error.response?.status === 404) {
            await apiRequest.post(
              '/UserWishlist',
              null,
              {
                headers: { Authorization: `Bearer ${token}` },
                params: { restaurantId: restaurant?.id },
              },
            );
            setIsFavorite(true);
            Alert.alert('Success', 'Added to wishlist');
          } else if (error.response?.status === 409) {
            setIsFavorite(true);
            Alert.alert('Info', 'Already in your wishlist');
          } else {
            throw error;
          }
        }
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || error.response?.data?.title || 'Failed to update wishlist'
      );
    }
  };


  if (loading) {
    return (
      <View
        style={[
          styles.singleRestaurant,
          { justifyContent: 'center', alignItems: 'center' },
        ]}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Yüklənir...</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.singleRestaurant}>
        <Text>Restoran tapılmadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.singleRestaurant}>
      <View style={styles.slider}>
        <View style={styles.sliderImg}>
          <Image
            style={{ width: '100%', height: 200 }}
            source={
              restaurant.restaurantImages?.[0]?.restaurantImgUrl
                ? { uri: restaurant.restaurantImages[0].restaurantImgUrl }
                : require('../../assets/images/singleRestaurant.png')
            }
            resizeMode="cover"
          />
          <View style={style.icon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={style.iconFavorite}
                source={require('../../assets/images/icon/left.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleWishlist}>
              <Image
                style={[
                  style.iconFavorite,
                  {
                    tintColor: isFavorite ? 'red' : '#000',
                  },
                ]}
                source={require('../../assets/images/icon/favorite.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={style.details}>
          <View style={style.restaurantTitle}>
            <Text style={style.restaurantName}>{restaurant.name}</Text>
            <View style={style.kitchen}>
              <Image
                style={style.mealIcon}
                source={require('../../assets/images/icon/meal.png')}
              />
              <Text style={style.kitchenName}>{restaurant.about}</Text>
            </View>
          </View>

          <View style={style.restaurantInfo}>
            <TouchableOpacity
              onPress={() => setActiveTab('About')}
              style={[
                style.tabButton,
                activeTab === 'About' && style.activeTabButton,
              ]}>
              <Text
                style={[
                  style.infoTitle,
                  activeTab === 'About' && style.activeTabText,
                ]}>
                About
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('Menu')}
              style={[
                style.tabButton,
                activeTab === 'Menu' && style.activeTabButton,
              ]}>
              <Text
                style={[
                  style.infoTitle,
                  activeTab === 'Menu' && style.activeTabText,
                ]}>
                Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('Gallery')}
              style={[
                style.tabButton,
                activeTab === 'Gallery' && style.activeTabButton,
              ]}>
              <Text
                style={[
                  style.infoTitle,
                  activeTab === 'Gallery' && style.activeTabText,
                ]}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 16 }}>
            {activeTab === 'About' && <AboutRestaurant />}
            {activeTab === 'Menu' && <Menu />}
            {activeTab === 'Gallery' && <Gallery />}
          </View>
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('Booktable', {
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
            })
          }>
          <Text style={styles.btnTitle}>Book a Table</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleRestaurant;
