import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import _style from './style';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

type FullGalleryRouteProp = RouteProp<RootStackParamList, 'FullGalery'>;

const FullGalery: React.FC = () => {
  const style = _style;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<FullGalleryRouteProp>();
  const {id} = route.params;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
            `/RestaurantGalleries/get-gallery-by-resturant-id?RestaurantId=${id}`
          );
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];

        setImages(
          list
            .map((item: any) => item.galleryImgUrl || item.imageUrl || item.imgUrl)
            .filter(Boolean)
        );
      } catch (err) {
        console.log('Error fetching images:', err);
      }
    };

    fetchImages();
  }, [id]);

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
