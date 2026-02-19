import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import _styles from './style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';

const Gallery: React.FC = () => {
  const style = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          'https://booktables-001-site1.anytempurl.com/api/RestaurantImages/get-images-by-restaurantId?RestaurantId=1'
        );
        const data = await res.json();
        setImages(data.map((item: any) => item.imageUrl)); 
      } catch (err) {
        console.log('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={style.gallery}>
      <View style={style.galleryHeader}>
        <View style={style.items}>
          <Text style={style.galleryTitle}>Gallery</Text>
          <Text style={style.number}>({images.length} items)</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('FullGalery')}>
          <Text style={style.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={style.galleryBody}>
          {images.slice(0, 3).map((img, index) => (
            <View key={index} style={style.galleryItems}>
              <Image
                source={{uri: img}}
                style={{width: 100, height: 100, borderRadius: 8}}
              />
            </View>
          ))}

          {images.length > 3 && (
            <TouchableOpacity
              style={style.galleryItems}
              onPress={() => navigation.navigate('FullGalery')}>
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
