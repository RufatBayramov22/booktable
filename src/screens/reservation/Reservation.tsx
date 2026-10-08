import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import _styles from './styles';
import apiRequest from '../../api/apirequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetToLogin} from '../../navigation/navigationRef';

const RESERVATION_GUEST_COUNT_MAP_KEY = 'reservationGuestCountMap';

interface ReservationItem {
  id: number;
  reservationId?: number;
  Id?: number;
  ReservationId?: number;
  reservationDate?: string;
  reservationTime?: string;
  reservationStartDate?: string;
  startDate?: string;
  startTime?: string;
  date?: string;
  time?: string;
  guestCount?: number;
  personCount?: number;
  guestsCount?: number;
  numberOfGuests?: number;
  peopleCount?: number;
  count?: number;
  guest?: number;
  guests?: number;
  numberOfPeople?: number;
  placeName?: string;
  seatOptionName?: string;
  status?: string;
  restaurantId?: number;
  restaurant?: {
    id?: number;
    name?: string;
    restaurantImages?: {
      restaurantImgUrl?: string;
    }[];
  } | null;
  restaurantName?: string;
  restaurantImages?: {
    restaurantImgUrl?: string;
  }[];
}

const getReservationList = (payload: any): ReservationItem[] => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.Data)) return payload.Data;
  return [];
};

const parseGuestCountValue = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const digits = value.match(/\d+/)?.[0];
    if (!digits) {
      return null;
    }

    const parsed = Number(digits);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const getGuestCount = (item: ReservationItem): number => {
  const candidateValues: unknown[] = [
    item.guestCount,
    item.personCount,
    item.guestsCount,
    item.numberOfGuests,
    item.peopleCount,
    item.count,
    item.guest,
    item.guests,
    item.numberOfPeople,
    (item as any)?.guest_count,
    (item as any)?.person_count,
    (item as any)?.guest_count_text,
  ];

  for (const candidate of candidateValues) {
    const parsed = parseGuestCountValue(candidate);
    if (parsed !== null && parsed > 0) {
      return parsed;
    }
  }

  return 0;
};

const getReservationIdentity = (item: ReservationItem): string | null => {
  const identity = item.id || item.reservationId || item.Id || item.ReservationId;
  return identity ? String(identity) : null;
};

const formatReservationDateTime = (item: ReservationItem): string => {
  const dateValue =
    item.reservationDate ||
    item.date ||
    item.reservationStartDate ||
    item.startDate;
  const timeValue = item.reservationTime || item.time || item.startTime;

  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedTime = timeValue
    ? timeValue
    : dateValue
      ? new Date(dateValue).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : '';

  return [formattedDate, formattedTime].filter(Boolean).join(' - ');
};

const getReservationImage = (item: ReservationItem): string | null => {
  return (
    item.restaurantImages?.[0]?.restaurantImgUrl ||
    item.restaurant?.restaurantImages?.[0]?.restaurantImgUrl ||
    null
  );
};

const getReservationTitle = (item: ReservationItem): string => {
  return item.restaurantName || item.restaurant?.name || 'Restaurant';
};

const Reservation = () => {
  const styles = _styles;
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guestCountMap, setGuestCountMap] = useState<Record<string, number>>({});

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const cachedGuestCountMapRaw = await AsyncStorage.getItem(
        RESERVATION_GUEST_COUNT_MAP_KEY,
      );

      if (cachedGuestCountMapRaw) {
        setGuestCountMap(JSON.parse(cachedGuestCountMapRaw));
      }

      if (!token) {
        setError('Please login again.');
        setLoading(false);
        return;
      }

      const res = await apiRequest.get('/Users/reservations', {
        headers: {Authorization: `Bearer ${token}`},
      });

        console.log(token),        


      setReservations(getReservationList(res.data));
    } catch (err: any) {
      if (err.response?.status === 401) {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        setReservations([]);
        setError('Session expired. Please login again.');
        resetToLogin();
      } else {
        setError(err.response?.data?.message || 'Failed to load reservations');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <View style={[styles.reservations, styles.centeredState]}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.reservations, styles.centeredState]}>
        <Text style={styles.reservationTitle}>Reservations</Text>
        <View style={styles.emptyContent}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={fetchReservations}>Try again</Text>
        </View>
      </View>
    );
  }

  if (reservations.length === 0) {
    return (
      <View style={[styles.reservations, styles.emptyReservations]}>
        <Text style={styles.reservationTitle}>Reservations</Text>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyMessage}>No Upcoming Reservations</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.reservations}>
      <Text style={styles.reservationTitle}>Reservations</Text>
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 14 }}>
        <View style={styles.reservationCards}>
          {reservations.map(res => (
            <View key={res.id} style={styles.card}>
              <View>
                <Image
                  source={
                    getReservationImage(res)
                      ? {uri: getReservationImage(res)!}
                      : require('../../assets/images/reservationImg.png')
                  }
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{getReservationTitle(res)}</Text>
                <View style={styles.date}>
                  <Image source={require('../../assets/images/icon/calendar.png')} />
                  <Text style={styles.dateTitle}>{formatReservationDateTime(res)}</Text>
                </View>
                <View style={styles.persons}>
                  <Image source={require('../../assets/images/icon/person.png')} />
                  <Text style={styles.dateTitle}>{`${(() => {
                    const apiCount = getGuestCount(res);
                    if (apiCount > 0) {
                      return apiCount;
                    }

                    const reservationIdentity = getReservationIdentity(res);
                    if (reservationIdentity && guestCountMap[reservationIdentity]) {
                      return guestCountMap[reservationIdentity];
                    }

                    return 0;
                  })()} Persons`}</Text>
                </View>
                <View style={styles.status}>
                  <View style={styles.place}>
                    <Image source={require('../../assets/images/icon/table.png')} />
                    <Text style={styles.dateTitle}>{res.placeName || res.seatOptionName || 'Table'}</Text>
                  </View>
                  <View style={styles.statusComp}>
                    <Image source={require('../../assets/images/icon/pending.png')} />
                    <Text style={styles.dateTitle}>{res.status || 'Pending'}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Reservation;
