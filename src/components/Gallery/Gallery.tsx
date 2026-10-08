import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import _styles from './style';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FullGalery'>;
type GalleryRouteProp = RouteProp<RootStackParamList, 'SingleRestaurant'>;

const Gallery: React.FC = () => {
  const style = _styles;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GalleryRouteProp>();
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
    <View style={style.gallery}>
      <View style={style.galleryHeader}>
        <View style={style.items}>
          <Text style={style.galleryTitle}>Gallery</Text>
          <Text style={style.number}>({images.length} items)</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('FullGalery', {id})}>
          <Text style={style.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={style.galleryBody}>
          {images.slice(0, 3).map((img, index) => (
            <View key={`gallery-${index}-${img}`} style={style.galleryItems}>
              <Image
                source={{uri: img}}
                style={{width: 100, height: 100, borderRadius: 8}}
              />
            </View>
          ))}

          {images.length > 3 && (
            <TouchableOpacity
              style={style.galleryItems}
              onPress={() => navigation.navigate('FullGalery', {id})}>
              <Image
                source={{uri: images[3]}}
                style={{width: 100, height: 100, borderRadius: 8, opacity: 0.5}}
              />
              <View style={style.overlay}>
                <Text style={style.plusText}>{images.length}+</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Gallery;
