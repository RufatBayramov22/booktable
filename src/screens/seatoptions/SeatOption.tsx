import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../api/apirequest';

const RESERVATION_GUEST_COUNT_MAP_KEY = 'reservationGuestCountMap';

type SeatOptionRouteProp = RouteProp<RootStackParamList, 'SeatOption'>;

const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Table Decoration',
  'Pet-Friendly Area',
  'Non-smoking area',
];

interface PlaceOfRestaurant {
  id: number;
  name?: string;
  title?: string;
  placeName?: string;
}

interface SeatOptionItem {
  id?: number;
  name?: string;
  title?: string;
  seatOptionName?: string;
  isAvailable?: boolean;
  status?: string;
}

const FALLBACK_SEAT_OPTIONS: SeatOptionItem[] = [
  {id: 1, name: 'Terrace', isAvailable: true},
  {id: 2, name: 'Indoor', isAvailable: false},
  {id: 3, name: 'Private Rooms', isAvailable: false},
];

const getSeatOptionList = (payload: any): SeatOptionItem[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.Data)) {
    return payload.Data;
  }

  return [];
};

const getSeatOptionName = (item: SeatOptionItem): string => {
  return item.name || item.title || item.seatOptionName || 'Seat';
};

const getSeatAvailabilityLabel = (item: SeatOptionItem): string => {
  if (typeof item.isAvailable === 'boolean') {
    return item.isAvailable ? 'Available' : 'Full';
  }

  if (item.status) {
    return item.status;
  }

  return 'Available';
};

const extractApiErrorMessage = (error: any) => {
  const data = error?.response?.data;
  if (!data) return error?.message || 'Failed to create reservation';

  if (typeof data === 'string') return data;
  if (data.Message) return data.Message;
  if (data.message) return data.message;
  if (data.title) return data.title;
  if (Array.isArray(data.Errors) && data.Errors.length > 0) {
    return String(data.Errors[0]);
  }
  return 'Failed to create reservation';
};

const formatDisplayDate = (dateText: string) => {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

const buildReservationPayload = (params: {
  restaurantId: number;
  guestCount: number;
  reservationDate: string;
  reservationTime: string;
  seatOption?: string;
  placeOfRestaurantId?: number | null;
  occasion?: string;
  note?: string;
}) => {
  const reservationStartDate = new Date(
    `${params.reservationDate}T${params.reservationTime}:00`,
  ).toISOString();

  return {
    restaurantId: params.restaurantId,
    guestCount: params.guestCount,
    personCount: params.guestCount,
    guestsCount: params.guestCount,
    numberOfGuests: params.guestCount,
    numberOfPeople: params.guestCount,
    reservationStartDate,
    ...(params.placeOfRestaurantId && params.placeOfRestaurantId > 0
      ? {placeOfRestaurantId: params.placeOfRestaurantId}
      : {}),
    // compatibility fields for different backend contracts
    reservationDate: params.reservationDate,
    reservationTime: params.reservationTime,
    ...(params.seatOption
      ? {
          seatOptionName: params.seatOption,
          placeName: params.seatOption,
        }
      : {}),
    note: [params.occasion, params.note].filter(Boolean).join(' | ') || 'No note',
  };
};

const resolvePlaceOfRestaurantId = async (
  token: string,
  restaurantId: number,
  seatOption: string,
) => {
  try {
    const res = await apiRequest.get(
      `/Restaurants/get-by-id?Id=${restaurantId}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const places: PlaceOfRestaurant[] = Array.isArray(
      res.data?.data?.placeOfRestaurants,
    )
      ? res.data.data.placeOfRestaurants
      : [];

    if (places.length === 0) {
      return null;
    }

    const selected = seatOption.toLowerCase();
    const match = places.find(place => {
      const text =
        place.name || place.title || place.placeName || '';
      return text.toLowerCase().includes(selected);
    });

    return match?.id || places[0]?.id || null;
  } catch {
    return null;
  }
};

const createReservation = async (token: string, payload: ReturnType<typeof buildReservationPayload>) => {
  const commonConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };

  const attempts = [
    () => apiRequest.post('/Reservations', payload, commonConfig),
    () => apiRequest.post('/Users/reservations', payload, commonConfig),
    () => apiRequest.post('/Reservation', payload, commonConfig),
  ];

  let lastError: any;
  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (err: any) {
      lastError = err;
      if (![400, 404, 405].includes(err.response?.status)) {
        throw err;
      }
    }
  }

  throw lastError;
};

const SeatOption: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<SeatOptionRouteProp>();
  const {
    restaurantId,
    restaurantName,
    guestCount,
    reservationDate,
    reservationTime,
  } = route.params;

  const style = styles;
  const [selected, setSelected] = useState<string>('');
  const [seatOptions, setSeatOptions] = useState<SeatOptionItem[]>(
    FALLBACK_SEAT_OPTIONS,
  );
  const [loadingSeatOptions, setLoadingSeatOptions] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [note, setNote] = useState('');
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const fetchSeatOptions = async () => {
      try {
        setLoadingSeatOptions(true);
        const res = await apiRequest.get('/SeatOptions/get-all');
        const options = getSeatOptionList(res.data);

        if (options.length > 0) {
          setSeatOptions(options);
        } else {
          setSeatOptions(FALLBACK_SEAT_OPTIONS);
        }
      } catch {
        setSeatOptions(FALLBACK_SEAT_OPTIONS);
      } finally {
        setLoadingSeatOptions(false);
      }
    };

    fetchSeatOptions();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const renderCard = (
    title: string,
    availability: string,
    imageSource: any,
  ) => {
    const isSelected = selected === title;



    return (
      <TouchableOpacity
        onPress={() => setSelected(title)}
        style={[style.card, isSelected && style.selectedCard]}>
        <Image source={imageSource} style={style.cardImage} />
        <View style={style.cardTextWrapper}>
          <Text style={style.cardText}>
            {title} • {availability}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleReserve = async () => {
    try {
      setIsReserving(true);
      const token = await AsyncStorage.getItem('accessToken');

      if (!token) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      const placeOfRestaurantId = selected
        ? await resolvePlaceOfRestaurantId(token, restaurantId, selected)
        : null;

      const payload = buildReservationPayload({
        restaurantId,
        guestCount,
        reservationDate,
        reservationTime,
        seatOption: selected || undefined,
        placeOfRestaurantId,
        occasion: selectedOccasion || undefined,
        note: note.trim() || undefined,
      });

      const res = await createReservation(token, payload);
      const created = res.data?.data || res.data;

      const createdReservationId =
        created?.id ?? created?.Id ?? created?.reservationId ?? created?.ReservationId;

      if (createdReservationId !== undefined && createdReservationId !== null) {
        const existingMapRaw = await AsyncStorage.getItem(RESERVATION_GUEST_COUNT_MAP_KEY);
        const existingMap = existingMapRaw ? JSON.parse(existingMapRaw) : {};
        const nextMap = {
          ...existingMap,
          [String(createdReservationId)]: guestCount,
        };
        await AsyncStorage.setItem(
          RESERVATION_GUEST_COUNT_MAP_KEY,
          JSON.stringify(nextMap),
        );
      }

      setModalVisible(false);
      setTimeout(() => {
        navigation.navigate('ConfirmReserve', {
          reservationId: created?.id,
          restaurantName,
          guestCount,
          reservationDate,
          reservationTime,
          seatOption: selected || 'Table',
          occasion: selectedOccasion || undefined,
          note: note.trim() || undefined,
        });
      }, 300);
    } catch (error: any) {
      Alert.alert(
        'Error',
        extractApiErrorMessage(error),
      );
    } finally {
      setIsReserving(false);
    }
  };

  

  return (
    <View style={style.seatOption}>
      {/* Header */}
      <View style={style.seatHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.seatTitle}>Seat Option</Text>
      </View>
      <View style={style.seatCard}>
        {loadingSeatOptions ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          seatOptions.map((option, index) => (
            <View key={`${getSeatOptionName(option)}-${option.id || index}`}>
              {renderCard(
                getSeatOptionName(option),
                getSeatAvailabilityLabel(option),
                require('../../assets/images/terrace.png'),
              )}
            </View>
          ))
        )}
      </View>
      {/* Cards */}

      <View style={style.bookButtonContainer}>
        <TouchableOpacity style={style.bookButton} onPress={openModal}>
          <Text style={style.bookText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Close Handle */}
              <Pressable onPress={closeModal} style={styles.modalCloseBar}>
                <View style={styles.modalBar} />
              </Pressable>

              {/* Modal Content */}
              <Text style={styles.modalTitle}>
                {restaurantName || 'Restaurant'}
              </Text>
              <View style={style.rowInfo}>
                <View style={styles.row}>
                  <Text style={styles.icon}>👤</Text>
                  <Text style={styles.text}>{guestCount}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.icon}>📅</Text>
                  <Text style={styles.text}>{formatDisplayDate(reservationDate)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.icon}>🕘</Text>
                  <Text style={styles.text}>{reservationTime}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.icon}>🪑</Text>
                  <Text style={styles.text}>{selected || '-'}</Text>
                </View>
              </View>

              <Text style={styles.description}>
                We offer a 30-minute grace period. If you're running late,
                please give us a call. We may contact you regarding your
                reservation, so make sure your contact details are up to date.
              </Text>

              <Text style={styles.preferenceTitle}>
                Do you have any preferences?
              </Text>
              <View style={styles.preferenceContainer}>
                {OCCASIONS.map(item => (
                  <TouchableOpacity
                    key={`pref-${item}`}
                    onPress={() =>
                      setSelectedOccasion(prev => (prev === item ? '' : item))
                    }
                    style={[
                      styles.preferenceButton,
                      item === selectedOccasion && styles.preferenceButtonActive,
                    ]}>
                    <Text
                      style={[
                        styles.preferenceText,
                        item === selectedOccasion && styles.preferenceTextActive,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.noteInput}
                placeholder="Type your note here..."
                placeholderTextColor="#aaa"
                multiline
                value={note}
                onChangeText={setNote}
              />

              <TouchableOpacity
                style={[styles.reserveButton, isReserving && {opacity: 0.7}]}
                onPress={handleReserve}
                disabled={isReserving}>
                {isReserving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.reserveButtonText}>Reserve</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SeatOption;
