import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const Personal = () => {
  const style = styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.headline}>Personal Info</Text>
      </View>
      <View style={style.body}>
        <View
          style={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../assets/images/profileSec.png')} />
        </View>

        <View style={style.personalInfo}>
          <View style={style.infoBox}>
            <Image
              width={24}
              height={24}
              source={require('../../assets/images/icon/person.png')}
            />
            <Text style={style.name}>Rufat Bayramov</Text>
          </View>
          <View style={style.infoBox}>
            <Image
              width={24}
              height={24}
              source={require('../../assets/images/icon/person.png')}
            />
            <Text style={style.name}>+994514273244</Text>
            <Text style={{marginLeft: 'auto', color: 'rgba(33, 118, 255, 1)'}}>
              Edit
            </Text>
          </View>
          <View style={style.infoBox}>
            <Image
              width={24}
              height={24}
              source={require('../../assets/images/icon/person.png')}
            />
            <Text style={style.name}>rufetbayramov.1905@gmail.com</Text>
            <Text style={{marginLeft: 'auto', color: 'rgba(33, 118, 255, 1)'}}>
              Edit
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Personal;
