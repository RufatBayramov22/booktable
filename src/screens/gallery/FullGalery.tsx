import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import _style from './style';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const FullGalery: React.FC = () => {
  const style = _style;

const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={style.fullGalery}>
      <View style={style.fullGaleryHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.fullTitle}>Gallery</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={style.galeryBody}>
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
          <Image source={require('../../assets/images/galeryR.png')} />
        </View>
      </ScrollView>
      <View style={{backgroundColor:"#fff",width:"100%",
      }}>
      <TouchableOpacity style={style.btn}>
        <Text style={style.btnTitle}>Book a Table</Text>
      </TouchableOpacity>˝
      </View>

    </View>
  );
};

export default FullGalery;
