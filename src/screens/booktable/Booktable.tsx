import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Image} from 'react-native';
import DateSelector from '../../components/DateSelector/DateSelector';
import TimeSelector from '../../components/TimeSelector/TimeSelector';
import {ScrollView} from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

type BooktableRouteProp = RouteProp<RootStackParamList, 'Booktable'>;

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const Booktable: React.FC = () => {
  const style = styles;
  const [count, setCount] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<BooktableRouteProp>();
  const {restaurantId, restaurantName} = route.params;

  const handleContinue = () => {
    if (!selectedTime) {
      return;
    }

    navigation.navigate('SeatOption', {
      restaurantId,
      restaurantName,
      guestCount: count,
      reservationDate: formatDate(selectedDate),
      reservationTime: selectedTime,
    });
  };


  return (
    <View style={{flex: 1, display: 'flex', gap: 26,backgroundColor: '#fff'}}>
      {/* Header */}
      <View style={style.booktableHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.bookTitle}>Book a Table</Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: 120}}
        style={style.bookTable}
        showsVerticalScrollIndicator={false}>
        {/* Guests */}
        <View style={style.bookGuests}>
          <Text style={style.guestTitle}>Guests</Text>
          <View style={style.guestCount}>
            <TouchableOpacity style={style.minus} onPress={handleDecrement}>
              <Image source={require('../../assets/images/icon/minus.png')} />
            </TouchableOpacity>
            <Text style={style.count}>{count}</Text>
            <TouchableOpacity style={style.minus} onPress={handleIncrement}>
              <Image source={require('../../assets/images/icon/plus.png')} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date */}
        <View style={{marginTop: 16}}>
          <Text style={style.guestTitle}>Date</Text>
          <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </View>

        {/* Time */}
        <View style={{marginTop: 16}}>
          <Text style={style.guestTitle}>Time</Text>
          <TimeSelector selectedTime={selectedTime} onSelectTime={setSelectedTime} />
        </View>
      </ScrollView>

      {/* Sticky Button */}
      <View style={style.bookButtonContainer}>
        <TouchableOpacity
          style={[style.bookButton, !selectedTime && {opacity: 0.6}]}
          onPress={handleContinue}
          disabled={!selectedTime}>
          <Text style={style.bookText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booktable;
