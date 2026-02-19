import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import _style from './style';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const FullGalery: React.FC = () => {
  const style = _style;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          'https://booktables-001-site1.anytempurl.com/api/RestaurantImages/get-images-by-restaurantId?RestaurantId=1'
        );
        const data = await res.json();
        // API-nin cavab formatına uyğun map et
        setImages(data.map((item: any) => item.imageUrl));
      } catch (err) {
        console.log('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={style.fullGalery}>
        <View style={style.fullGaleryHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icon/left.png')} />
          </TouchableOpacity>
          <Text style={style.fullTitle}>Gallery</Text>
        </View>

        <ScrollView>
          <View style={style.galeryBody}>
            {images.length > 0 ? (
              images.map((img, i) => (
                <Image
                  key={i}
                  source={{ uri: img }}
                  style={{ width: 120, height: 120, margin: 5, borderRadius: 8 }}
                />
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                No images available
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Fixed tabbar-style button */}
      <View style={style.fixedBtnWrapper}>
        <TouchableOpacity style={style.fixedBtn}>
          <Text style={style.btnTitle}>Book a Table</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FullGalery;
