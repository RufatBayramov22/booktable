import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import style, {_styles} from './style';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import AboutRestaurant from '../../components/AboutRestaurant/AboutRestaurant';
import Menu from '../../components/RestaurantMenu/Menu';
import Gallery from '../../components/Gallery/Gallery';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SingleRestaurantRouteProp = RouteProp<RootStackParamList,'SingleRestaurant'>;

interface Restaurant {
  id: number;
  name: string;
  about: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
  isPriceRangeVisible: boolean;
  isAviable: boolean;
}

const SingleRestaurant: React.FC = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<SingleRestaurantRouteProp>();
  const {id} = route.params;

  const [activeTab, setActiveTab] = useState<string>('About');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

useEffect(() => {
  const fetchRestaurant = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get(
        `https://booktables-001-site1.anytempurl.com/api/Restaurants/get-by-id?Id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRestaurant(res.data.data);
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
    if (!token) return;

    if (isFavorite) {
      // Əgər artıq favorite-dirsə, sil
      await axios.delete(
        `https://booktables-001-site1.anytempurl.com/api/UserWishlist?restaurantId=${restaurant?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setIsFavorite(false);
    } else {
      // Əlavə et
      await axios.post(
        'https://booktables-001-site1.anytempurl.com/api/UserWishlist',
        { restaurantId: restaurant?.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setIsFavorite(true);
    }
  } catch (error: any) {
    console.error('Wishlist API xətası:', error.response?.data || error.message);
  }
};


  if (loading) {
    return (
      <View
        style={[
          styles.singleRestaurant,
          {justifyContent: 'center', alignItems: 'center'},
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
            style={{width: '100%', height: 200}}
            source={require('../../assets/images/singleRestaurant.png')}
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
                style={style.iconFavorite}
                source={require('../../assets/images/icon/favorite.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
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

          <View style={{padding: 16}}>
            {activeTab === 'About' && <AboutRestaurant />}
            {activeTab === 'Menu' && <Menu />}
            {activeTab === 'Gallery' && <Gallery />}
          </View>
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Booktable')}>
          <Text style={styles.btnTitle}>Book a Table</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleRestaurant;
