import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import _styles from './style';
import apiRequest from '../../api/apirequest.ts';
import { saveChatToList } from '../../api/chat';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
  userId?: string | number;
  partnerId?: string | number;
  restaurantImages?: {
    id: number;
    restaurantId: number;
    restaurantImgUrl: string;
  }[];
}

interface WorkingHour {
  id?: string;
  day: string;
  hours: string;
}


const DAY_MAP: Record<string, string> = {
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
  '7': 'Sunday',
};


const formatDay = (raw: any): string => {
  if (raw === null || raw === undefined) return '';
  const normalized = String(raw).trim();
  if (!normalized) return '';
  if (DAY_MAP[normalized]) return DAY_MAP[normalized];
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
};

const formatTime = (value?: string): string => {
  if (!value) return '';
  const text = String(value).trim();

  // already formatted (contains AM/PM)
  if (/am|pm/i.test(text)) {
    return text.toUpperCase();
  }

  // HH:mm or HH:mm:ss
  const match = text.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) return text;

  const hour24 = Number(match[1]);
  const minute = match[2];
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12.toString().padStart(2, '0')}:${minute} ${suffix}`;
};

const normalizeWorkingHours = (payload: any): WorkingHour[] => {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : payload
        ? [payload]
        : [];

  return source
    .map((item: any, index: number) => {
      const day = formatDay(
        item?.day ||
        item?.dayName ||
        item?.weekDay ||
        item?.weekDayName ||
        item?.dayOfWeek ||
        item?.dayOfWeekName
      );

      const start =
        item?.openingTime || item?.startTime || item?.openTime || item?.from;
      const end = item?.closingTime || item?.endTime || item?.closeTime || item?.to;

      const range = start && end ? `${formatTime(start)} - ${formatTime(end)}` : '';

      const rawHours = item?.hours || item?.workingHours || item?.time;
      let hours = '';

      if (rawHours && String(rawHours).includes('-')) {
        const [from, to] = String(rawHours)
          .split('-')
          .map((x: string) => x.trim());
        hours = `${formatTime(from)} - ${formatTime(to)}`;
      } else if (rawHours) {
        hours = formatTime(String(rawHours));
      } else if (range) {
        hours = range;
      } else {
        hours = item?.isClosed ? 'Closed' : 'N/A';
      }

      return {
        id: String(item?.id ?? `${day}-${index}`),
        day,
        hours,
      };
    })
    .filter((x: WorkingHour) => !!x.day && !!x.hours);
};

const AboutRestaurant: React.FC = () => {
  const style = _styles;
  const route = useRoute<SingleRestaurantRouteProp>();
  const { id } = route.params;
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRestaurant = await apiRequest.get(
          `/Restaurants/get-by-id?Id=${id}`
        );
        setRestaurant(resRestaurant.data.data);

        try {
          const resWorkingHours = await apiRequest.get(
            `/RestaurantWorkingHour/getById/${id}/1`
          );
          const normalized = normalizeWorkingHours(resWorkingHours.data);
          if (normalized.length > 0) {
            setWorkingHours(normalized);
          } else {
            const fallback = normalizeWorkingHours(
              resRestaurant.data?.data?.restaurantWorkingHours
            );
            setWorkingHours(fallback);
          }
        } catch (hourError) {
          const fallback = normalizeWorkingHours(
            resRestaurant.data?.data?.restaurantWorkingHours
          );
          setWorkingHours(fallback);
        }
      } catch (error) {
        console.error('Məlumatlar yüklənmədi:', error);
        setWorkingHours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <TouchableOpacity
          style={style.call}
          onPress={async () => {
            // Save chat to local list first
            await saveChatToList({
              id: id,
              title: restaurant.name,
              contactName: restaurant.name,
              lastMessage: '',
              lastUpdated: new Date().toISOString(),
              unreadCount: 0,
              partnerUserId: restaurant.userId || restaurant.partnerId,
            });
            // Then navigate to chat
            navigation.navigate('SingleChat', {
              chatId: id,
              contactName: restaurant.name,
              restaurantImage: restaurant.restaurantImages?.[0]?.restaurantImgUrl,
              partnerUserId: restaurant.userId || restaurant.partnerId,
            });
          }}
        >
          <Image source={require('../../assets/images/icon/chat.png')} />
          <Text>Chat</Text>
        </TouchableOpacity>
      </View>

      {/* İşləmə saatları */}
      <View style={style.openingHours}>
        {workingHours.length > 0 ? (
          <>
            <Text style={style.openTitle}>Opening Hours</Text>
            <View style={style.hours}>
              {workingHours.map((item, index) => (
                <View key={item.id || `day-${index}`} style={style.day}>
                  <Text style={style.weekDay}>{item.day}</Text>
                  <Text style={style.hour}>{item.hours}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <Text style={style.hour}>Don't have working hours</Text>
        )}

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
