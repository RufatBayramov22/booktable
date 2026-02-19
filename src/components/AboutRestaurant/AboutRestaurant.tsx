import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import _styles from './style';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stack';

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
}

interface WorkingHour {
  day: string;
  hours: string;
}

const AboutRestaurant: React.FC = () => {
  const style = _styles;
  const route = useRoute<SingleRestaurantRouteProp>();
  const { id } = route.params;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Restoran məlumatlarını gətiririk
        const resRestaurant = await axios.get(
          `https://booktables-001-site1.anytempurl.com/api/Restaurants/get-by-id?Id=${id}`
        );
        setRestaurant(resRestaurant.data.data);

        // İşləmə saatlarını gətiririk
        const resWorkingHours = await axios.get(
          `https://booktables-001-site1.anytempurl.com/api/RestaurantWorkingHour?restaurantId=${id}`
        );
        setWorkingHours(resWorkingHours.data.data);
      } catch (error) {
        console.error('Məlumatlar yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Restoran tapılmadı</Text>
      </View>
    );
  }

  return (
    <ScrollView style={style.aboutRestaurant}>
      {/* Restoran haqqında */}
      <Text style={style.description}>{restaurant.about}</Text>

      {/* Call & Chat düymələri */}
      <View style={style.dialog}>
        <TouchableOpacity style={style.call}>
          <Image source={require('../../assets/images/icon/calling.png')} />
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.call}>
          <Image source={require('../../assets/images/icon/chat.png')} />
          <Text>Chat</Text>
        </TouchableOpacity>
      </View>

      {/* İşləmə saatları */}
      <View style={style.openingHours}>
        <Text style={style.openTitle}>Opening Hours</Text>
        <View style={style.hours}>
          {workingHours.map((item, index) => (
            <View key={index} style={style.day}>
              <Text style={style.weekDay}>{item.day}</Text>
              <Text style={style.hour}>{item.hours}</Text>
            </View>
          ))}
        </View>

        {/* Location */}
        <View style={style.location}>
          <Text style={style.locationTitle}>Location</Text>
          <View style={style.map}>
            <Image source={require('../../assets/images/map.png')} />
            <View style={style.mapOverlay}>
              <Image source={require('../../assets/images/icon/mark.png')} />
              <View style={style.mapTextContainer}>
                <Text style={style.mapText}>Address</Text>
                <Text style={style.mapAddress}>{restaurant.locationAddress}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={style.mapButton}>
            <Text style={style.mapButtonText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutRestaurant;
