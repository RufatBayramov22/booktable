import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import _styles from './styles';
import apiRequest from '../../api/apirequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetToLogin } from '../../navigation/navigationRef';

interface WishlistItem {
  id: number;
  name: string;
  about: string;
  locationAddress: string;
  coverImageUrl?: string;
  restaurantImages?: {
    id: number;
    restaurantId: number;
    coverImageUrl: string;
  }[];
}
const getWishlistImage = (item: WishlistItem): string | null => {
  return item.coverImageUrl || null;
};

const safeText = (value: any) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};


const Wishlist: React.FC = () => {

  const styles = _styles;
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        setError('Sistemdə token tapılmadı, yenidən daxil olun.');
        setLoading(false);
        return;
      }

      const res = await apiRequest.get(
        '/UserWishlist',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWishlist(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        setWishlist([]);
        setError('Session expired. Please login again.');
        resetToLogin();
      } else {
        console.error('Wishlist yüklənmədi:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Wishlist yüklənərkən xəta baş verdi');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <View style={[styles.wishlist, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Yüklənir...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.wishlist, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>{error}</Text>
        <Text style={{ color: 'blue' }} onPress={fetchWishlist}>Yenidən cəhd et</Text>
      </View>
    );
  }

  if (wishlist.length === 0) {
    return (
      <View style={[styles.wishlist, styles.emptyWishlist]}>
        <Text style={styles.wishlistTitle}>Favorites</Text>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyMessage}>No favorites yet</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wishlist}>
      <Text style={styles.wishlistTitle}>Favorites</Text>
      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.wishlistCards}>
          {wishlist.map((item, index) => (
            
            <View key={`${item.id}-${index}`} style={styles.card}>              <View style={styles.cardImage}>
              <Image
                source={
                  getWishlistImage(item)
                    ? { uri: getWishlistImage(item)! }
                    : require('../../assets/images/singleRestaurant.png')
                }
                style={{ width: '100%', height: 160 }}
                resizeMode="cover"
              />
            </View>
              <View style={styles.cardContent}>
                <Text style={styles.contentTitle} numberOfLines={2}
                  ellipsizeMode="tail">{safeText(item.name) || 'No name available'}</Text>
                <View style={styles.cardDetails}>
                  <View style={styles.cousins}>
                    <Image source={require('../../assets/images/icon/meal.png')} />
                    <Text style={styles.cousinTitle} numberOfLines={3}
                      ellipsizeMode="tail">  {safeText(item.about)}</Text>
                  </View>
                  <View style={styles.location}>
                    <Image source={require('../../assets/images/icon/restLocation.png')} />
                    <Text style={styles.locationTitle}>{safeText(item.locationAddress) || 'No location available'}</Text>
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

export default Wishlist;
