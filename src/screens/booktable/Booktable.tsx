import {View, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import {Image} from 'react-native';
import DateSelector from '../../components/DateSelector/DateSelector';
const Booktable: React.FC = () => {
  const style = styles;
  const [count, setCount] = useState<number>(0);

  const handleIncrement = ()=>{
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = ()=>{
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  }

  return (
    <View style={style.bookTable}>
      <View style={style.booktableHeader}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.bookTitle}>Book a Table</Text>
      </View>
      <View style={style.bookGuests}>
        <Text style={style.guestTitle}>Guests</Text>
        <View style={style.guestCount}>
            <TouchableOpacity style={style.minus} onPress={handleDecrement}>
              <Image source={require('../../assets/images/icon/minus.png')}/>
            </TouchableOpacity>
            <Text style={style.count}>{count}</Text>
            <TouchableOpacity style={style.minus} onPress={handleIncrement}>
                   <Image source={require('../../assets/images/icon/plus.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={style.guestTitle}>Date</Text>
          <View>
          <DateSelector/>
          </View>
        </View>
      </View>
  );
};

export default Booktable;
