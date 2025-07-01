import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const CancelMemoji = () => {
  const style = styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

const handleGoHome = () => {
  console.log('Going home with navigation:', navigation);
navigation.dispatch(
  CommonActions.reset({
    index: 0,
    routes: [
      {
        name: 'HomeTabs',
        state: {
          index: 0, 
          routes: [{ name: 'homeTab' }],
        },
      },
    ],
  })
);

};

  return (
    <View style={style.centerContent}>
      {/* cancelInfo tam ortada */}
      <View style={style.cancelInfoWrapper}>
        <View style={style.cancelInfo}>
          <Image source={require('../../assets/images/cancelMemoji.png')} />
          <Text style={style.bookTitle}>Booking Cancelled!</Text>
          <Text style={style.cancelCaption}>
            Sorry to see you cancel, but we hope to have you with us next time
          </Text>
        </View>
      </View>

      {/* Ən aşağıda düymə */}
      <TouchableOpacity style={style.bottomButton} onPress={handleGoHome}>
        <Text style={style.link}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelMemoji;
