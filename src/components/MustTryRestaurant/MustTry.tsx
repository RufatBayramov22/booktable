import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ScrollView as GHScrollView} from 'react-native-gesture-handler';
import _styles from '../../screens/home/styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import apiRequest from '../../api/apirequest';
import {FilterValues} from '../FilterModal/FilterModal';

interface Restaurant {
  id: number;
  name: string;
  isPriceRangeVisible: boolean;
  about: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
  isAviable: boolean;
  cuisineType?: {
    id: number;
    name: string;
  } | null;
  restaurantSpecialFeatures?: {
    id: number;
    featureName?: string;
    name?: string;
    title?: string;
  }[];
  restaurantImages?: {
    id: number;
    restaurantId: number;
    restaurantImgUrl: string;
  }[];
}

interface RestaurantsResponse {
  data: Restaurant[];
}

interface MustTryProps {
  filters?: FilterValues;
  searchText?: string;
}

const MustTry: React.FC<MustTryProps> = ({filters, searchText = ''}) => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const singleRestaurant = (id: number) => {
    navigation.navigate('SingleRestaurant', {id});
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await apiRequest.get<RestaurantsResponse>(
          '/Restaurants/get-all',
        );
        setRestaurant(res.data.data ?? []);
      } catch (error) {
        console.error('Restoran yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, []);

  if (loading) {
    return (
      <View style={styles.categories}>
        <Text>Yüklənir...</Text>
      </View>
    );
  }

  const filteredRestaurants = restaurant.filter(rest => {
    const q = searchText.trim().toLowerCase();
    if (q) {
      const haystack = `${rest.name} ${rest.about} ${rest.locationAddress}`.toLowerCase();
      if (!haystack.includes(q)) {
        return false;
      }
    }

    if (filters?.cuisine) {
      const cuisineText = `${rest.cuisineType?.name || ''} ${rest.about || ''}`.toLowerCase();
      if (!cuisineText.includes(filters.cuisine.toLowerCase())) {
        return false;
      }
    }

    if (filters?.price) {
      if (!rest.isPriceRangeVisible) {
        return false;
      }
    }

    if (filters?.seating) {
      const seatingText = `${rest.about || ''}`.toLowerCase();
      if (!seatingText.includes(filters.seating.toLowerCase())) {
        return false;
      }
    }

    if (filters?.features?.length) {
      const featureText = `${rest.about || ''} ${(rest.restaurantSpecialFeatures || [])
        .map(f => f.featureName || f.name || f.title || '')
        .join(' ')}`.toLowerCase();

      const hasFeature = filters.features.some(feature =>
        featureText.includes(feature.toLowerCase()),
      );
      if (!hasFeature) {
        return false;
      }
    }

    return true;
  });

  return (
    <View>
      <TouchableOpacity style={{marginBottom: 10}}>
        <View style={styles.restaurantItem}>
          <Text style={styles.restaurantTitle}>Must-Try Places</Text>
          <Image
            source={require('../../assets/images/icon/right.png')}
            style={{width: 20, height: 20}}
          />
        </View>
      </TouchableOpacity>
      <GHScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {filteredRestaurants.map(rest => (
          <TouchableOpacity
            onPress={() => singleRestaurant(rest.id)}
            key={rest.id}>
            <View style={styles.restaurantCard}>
              <Image
                source={
                  rest.restaurantImages?.[0]?.restaurantImgUrl
                    ? {uri: rest.restaurantImages[0].restaurantImgUrl}
                    : require('../../assets/images/restaurantcard.png')
                }
                style={styles.restaurantCardImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{rest.name}</Text>
                <View style={styles.restType}>
                  <Image
                    source={require('../../assets/images/icon/meal.png')}
                  />
                  <Text
                    style={styles.restTypeText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {rest.about}
                  </Text>
                </View>
                <View style={styles.restType}>
                  <Image
                    source={require('../../assets/images/icon/restLocation.png')}
                  />
                  <Text
                    style={styles.restTypeText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {rest.locationAddress}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {filteredRestaurants.length === 0 && (
          <View style={{paddingVertical: 20, paddingHorizontal: 8}}>
            <Text style={styles.restTypeText}>No restaurants found</Text>
          </View>
        )}
      </GHScrollView>
    </View>
  );
};

export default MustTry;
