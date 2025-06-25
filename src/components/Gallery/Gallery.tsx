import {View, Text, TouchableOpacity,} from 'react-native';
import React from 'react';
import _styles from './style';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
const Gallery: React.FC = () => {
  const style = _styles;
const meals = [
  { id: 1, },
  { id: 2,  },
  { id: 3,  },
  { isMore: true }, 
];
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={style.gallery}>
      <View style={style.galleryHeader}>
        <View style={style.items}>
          <Text style={style.galleryTitle}>Gallery</Text>
          <Text style={style.number}>(80 items)</Text>
        </View>
        <TouchableOpacity 
            onPress={() => navigation.navigate('FullGalery')}
        
        >
          <Text style={style.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
<ScrollView>
  <View style={style.galleryBody}>
    {meals.map((meal, index) => {
      if (meal.isMore) {
        return (
          <TouchableOpacity
            key={index}
            style={style.galleryItems}
            onPress={() => navigation.navigate('FullGalery')}
          >
            <Image
              source={require('../../assets/images/gallery.png')}
              style={{ position: 'relative', opacity: 0.4 }}
            />
            <View style={style.overlay}>
              <Text style={style.plusText}>80+</Text>
            </View>
          </TouchableOpacity>
        );
      }

      return (
        <View key={index} style={style.galleryItems}>
          <Image
            source={require('../../assets/images/gallery.png')}
            style={{ position: 'relative' }}
          />
        </View>
      );
    })}
  </View>
</ScrollView>
<TouchableOpacity style={style.btn}>
  <Text style={style.btnTitle}></Text>
</TouchableOpacity>
    </View>
  );
};

export default Gallery;
