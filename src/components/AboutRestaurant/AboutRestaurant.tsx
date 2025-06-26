import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import _styles from './style';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const AboutRestaurant: React.FC = () => {
  const style = _styles;

  const workingHours = [
  { day: 'Monday', hours: '09:00 AM - 10:00 PM' },
  { day: 'Tuesday', hours: '09:00 AM - 10:00 PM' },
  { day: 'Wednesday', hours: '09:00 AM - 10:00 PM' },
  { day: 'Thursday', hours: '09:00 AM - 10:00 PM' },
  { day: 'Friday', hours: '09:00 AM - 10:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 08:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

  return (
    <View style={style.aboutRestaurant}>
      <Text style={style.description}>
        Diners are greeted at the door by the knockout collection in the glazed
        wine cellar. The lavish interior, appointed in a modern Chinese style,
        is equally impressive. The à la carte menu covers all the bases of
        Cantonese fare, including dim sum like blue prawn dumplings and
        Cantonese BBQ like honey-glazed char siu. Soups, seafood and fusion
        dishes are also popular.{' '}
      </Text>
      <View style={style.dialog}>
        <TouchableOpacity style={style.call}>
          <Image source={require('../../assets/images/icon/calling.png')} />
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.call}>
          <Image source={require('../../assets/images/icon/chat.png')} />
          <Text>Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={style.openingHours}>
        <Text style={style.openTitle}>Opening Hours</Text>
        <ScrollView>
      <View style={style.hours}>
        {workingHours.map((item, index) => (
          <View key={index} style={style.day}>
            <Text style={style.weekDay}>{item.day}</Text>
            <Text style={style.hour}>{item.hours}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    
      </View>
    </View>
  );
};

export default AboutRestaurant;
