import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ScrollView as GHScrollView} from 'react-native-gesture-handler';
import _styles from '../../screens/home/styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import axios from 'axios';

interface Restaurant {
  id: number;
  name: string;
  isPriceRangeVisible: boolean;
  about: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
  isAviable: boolean;
}
const MustTry = () => {
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
        const res = await axios.get(
          'https://booktables-001-site1.anytempurl.com/api/Restaurants/get-all',
        );
        setRestaurant(res.data.data);
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
        {restaurant.map(rest => (
          <TouchableOpacity
            onPress={() => singleRestaurant(rest.id)}
            key={rest.id}>
            <View style={styles.restaurantCard}>
              <Image
                source={require('../../assets/images/restaurantcard.png')}
                resizeMode="cover"
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{rest.name}</Text>
                <View style={styles.restType}>
                  <Image
                    source={require('../../assets/images/icon/meal.png')}
                  />
                  <Text style={styles.restTypeText}>{rest.about}</Text>
                </View>
                <View style={styles.restType}>
                  <Image
                    source={require('../../assets/images/icon/restLocation.png')}
                  />
                  <Text style={styles.restTypeText}>
                    {rest.locationAddress}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </GHScrollView>
    </View>
  );
};

export default MustTry;
