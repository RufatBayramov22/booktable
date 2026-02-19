import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import _styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistItem {
  id: number;
  name: string;
  about: string;
  locationAddress: string;
  imageUrl?: string;
}

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

      const res = await axios.get(
        'https://booktables-001-site1.anytempurl.com/api/UserWishlist',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWishlist(res.data.data);
    } catch (err: any) {
      console.error('Wishlist yüklənmədi:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Wishlist yüklənərkən xəta baş verdi');
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
      <View style={[styles.wishlist, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>{error}</Text>
        <Text style={{ color: 'blue' }} onPress={fetchWishlist}>Yenidən cəhd et</Text>
      </View>
    );
  }

  if (wishlist.length === 0) {
    return (
      <View style={styles.wishlist}>
        <Text style={styles.wishlistTitle}>Favorites</Text>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Heç bir restoran əlavə olunmayıb
        </Text>
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
          {wishlist.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardImage}>
                <Image
                  source={
                    item.imageUrl
                      ? { uri: item.imageUrl }
                      : require('../../assets/images/wishlistCard.png')
                  }
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.contentTitle}>{item.name}</Text>
                <View style={styles.cardDetails}>
                  <View style={styles.cousins}>
                    <Image source={require('../../assets/images/icon/meal.png')} />
                    <Text style={styles.cousinTitle}>{item.about}</Text>
                  </View>
                  <View style={styles.location}>
                    <Image source={require('../../assets/images/icon/restLocation.png')} />
                    <Text style={styles.locationTitle}>{item.locationAddress}</Text>
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
