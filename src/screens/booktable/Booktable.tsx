import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Image} from 'react-native';
import DateSelector from '../../components/DateSelector/DateSelector';
import TimeSelector from '../../components/TimeSelector/TimeSelector';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
const Booktable: React.FC = () => {
  const style = styles;
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  return (
    <View style={{flex: 1, display: 'flex', gap: 26,backgroundColor: '#fff'}}>
      {/* Header */}
      <View style={style.booktableHeader}>
        <TouchableOpacity>
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
          <DateSelector />
        </View>

        {/* Time */}
        <View style={{marginTop: 16}}>
          <Text style={style.guestTitle}>Time</Text>
          <TimeSelector />
        </View>
      </ScrollView>

      {/* Sticky Button */}
      <View style={style.bookButtonContainer}>
        <TouchableOpacity style={style.bookButton} onPress={() => navigation.navigate('SeatOption')}>
          <Text style={style.bookText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booktable;
