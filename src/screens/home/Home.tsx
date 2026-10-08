import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import _styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import {ScrollView as GHScrollView} from 'react-native-gesture-handler';
import Language from '../../components/LanguageModal/Language';
import FilterModal, {
  FilterValues,
} from '../../components/FilterModal/FilterModal';
import CategoryKitchen from '../../components/CategoryKitchen/CategoryKitchen';
import MustTry from '../../components/MustTryRestaurant/MustTry';
import apiRequest from '../../api/apirequest';

const defaultFilters: FilterValues = {
  cuisine: null,
  price: null,
  seating: null,
  features: [],
  nearMe: false,
};

const Home = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterValues>(
    defaultFilters,
  );
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyError, setNearbyError] = useState<string | null>(null);

  const handlePress = () => {
    navigation.navigate('Notification');
  };

  const singleRestaurant = (id: number) => {
    navigation.navigate('SingleRestaurant', {id});
  };

  const handleLanguage = () => {
    setLanguageModalVisible(true);
  };

  const handleApplyFilters = (filters: FilterValues) => {
    const filtersWithLocation = filters.nearMe && currentLocation
      ? {
          ...filters,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          radiusInKm: 10,
        }
      : filters;

    setActiveFilters(filtersWithLocation);
    navigation.navigate('FilteredResults', {
      filters: filtersWithLocation,
      searchText,
    });
  };

  const handleSearch = () => {
    navigation.navigate('FilteredResults', {
      filters: activeFilters,
      searchText: searchText.trim(),
    });
  };

  const getGeolocation = () => {
    const geolocation = (navigator as any)?.geolocation || (global as any).navigator?.geolocation;
    return geolocation;
  };

  const fetchNearbyRestaurants = async (latitude: number, longitude: number) => {
    try {
      setNearbyLoading(true);
      setNearbyError(null);

      const res = await apiRequest.get('/Restaurants/get-all-filtered', {
        params: {
          Latitude: latitude,
          Longitude: longitude,
          RadiusInKm: 10,
          NearMe: true,
          PageNumber: 1,
          PageSize: 20,
        },
      });

      const data = res.data?.data ?? res.data;
      setNearbyRestaurants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Nearby restaurants fetch failed:', error);
      setNearbyError('Not found restaurant');
      setNearbyRestaurants([]);
    } finally {
      setNearbyLoading(false);
    }
  };

  const requestLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'Allow location access to find nearby restaurants',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setLocationStatus('denied');
          setNearbyError('Not found restaurant');
          return;
        }
      } else if (Platform.OS === 'ios') {
        const geolocation = getGeolocation();
        if (geolocation?.requestAuthorization) {
          geolocation.requestAuthorization();
        }
      }

      const geolocation = getGeolocation();
      if (!geolocation || !geolocation.getCurrentPosition) {
        throw new Error('Geolocation is not available');
      }

      geolocation.getCurrentPosition(
        async (position: any) => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
          setLocationStatus('granted');
          await fetchNearbyRestaurants(latitude, longitude);
        },
        (error: any) => {
          console.warn('Location error:', error);
          setLocationStatus('denied');
          setNearbyError('Not found restaurant');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.warn('Location permission error:', error);
      setLocationStatus('denied');
      setNearbyError('Not found restaurant');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText.trim().length > 0) {
        navigation.navigate('FilteredResults', {
          filters: activeFilters,
          searchText: searchText.trim(),
        });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText, activeFilters, navigation]);

  useEffect(() => {
    requestLocation();
  }, []);

  const renderStickyHeader = () => (
    <Animated.View
      style={{
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, 20],
              outputRange: [0, -5],
              extrapolate: 'clamp',
            }),
          },
        ],
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: scrollY.interpolate({
          inputRange: [0, 20],
          outputRange: [0, 0.1],
          extrapolate: 'clamp',
        }),
        shadowRadius: 4,
        elevation: 4,
        zIndex: 10,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 15,
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}>
        <View style={styles.header}>
          <View style={styles.location}>
            <Image source={require('../../assets/images/icon/location.png')} />
            <Text style={styles.addressTitle}>Baku, Azerbaijan</Text>
          </View>
          <View style={styles.lang}>
            <TouchableOpacity onPress={handleLanguage}>
              <Image source={require('../../assets/images/icon/usa.png')} />
            </TouchableOpacity>
            <Language
              visible={isLanguageModalVisible}
              selected={selectedLanguage}
              onSelect={lang => {
                setSelectedLanguage(lang);
                setLanguageModalVisible(false);
              }}
              onClose={() => setLanguageModalVisible(false)}
            />
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require('../../assets/images/icon/notification.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.searchInp}>
            <TextInput
              placeholder="Find your favourite restaurants.."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              style={{flex: 1, color: '#070707'}}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Image
                source={require('../../assets/images/icon/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setFilterModalVisible(true)}>
            <Image source={require('../../assets/images/icon/filter.png')} />
          </TouchableOpacity>
          <FilterModal
            visible={isFilterModalVisible}
            onClose={() => setFilterModalVisible(false)}
            value={activeFilters}
            onApply={handleApplyFilters}
            onReset={() => setActiveFilters(defaultFilters)}
          />
        </View>
      <CategoryKitchen />
      </View>
    </Animated.View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderStickyHeader()}

      <Animated.ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View style={[styles.home, {paddingTop: 16}]}>
          <View style={styles.restaurants}>
            <MustTry />
            <Text style={styles.restaurantTitle}>Nearby Restaurants</Text>
            {locationStatus === 'denied' ? (
              <View style={{paddingVertical: 16, alignItems: 'center'}}>
                <Text style={{color: '#8A9197', fontSize: 14}}>Not found restaurant</Text>
              </View>
            ) : nearbyLoading ? (
              <View style={{paddingVertical: 16, alignItems: 'center'}}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : nearbyRestaurants.length === 0 ? (
              <View style={{paddingVertical: 16, alignItems: 'center'}}>
                <Text style={{color: '#8A9197', fontSize: 14}}>No nearby restaurants found</Text>
              </View>
            ) : (
              <GHScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                {nearbyRestaurants.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => singleRestaurant(item.id)}>
                    <View style={styles.restaurantCard}>
                      <Image
                        source={
                          item.restaurantImages?.[0]?.restaurantImgUrl
                            ? {uri: item.restaurantImages[0].restaurantImgUrl}
                            : require('../../assets/images/restaurantcard.png')
                        }
                        resizeMode="cover"
                      />
                      <View style={styles.restaurantInfo}>
                        <Text style={styles.restaurantName}>{item.name}</Text>
                        <View style={styles.restType}>
                          <Image
                            source={require('../../assets/images/icon/meal.png')}
                          />
                          <Text style={styles.restTypeText} numberOfLines={1}>
                            {item.cuisineType?.name || 'Cuisine'} • {item.isPriceRangeVisible ? '$$' : '$'}
                          </Text>
                        </View>
                        <View style={styles.restType}>
                          <Image
                            source={require('../../assets/images/icon/restLocation.png')}
                          />
                          <Text style={styles.restTypeText} numberOfLines={1}>
                            {item.locationAddress}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </GHScrollView>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
