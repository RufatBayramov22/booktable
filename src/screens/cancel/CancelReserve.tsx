import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';

type Reason = {
  id: string;
  label: string;
};

const CancelReserve: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const style = styles;

  const reasons: Reason[] = [
    {id: 'mind', label: 'Change of plans'},
    {id: 'price', label: 'Unexpected personal emergency'},
    {id: 'far', label: 'Too far from current location'},
    {id: 'mistake', label: 'Booked by mistake'},
    {id: 'another', label: 'Found another restaurant'},
    {id: 'other', label: 'Other'},
  ];

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={style.cancelReservation}>
      <View style={style.cancelContainer}>
        <View style={style.cancelHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icon/left.png')} />
          </TouchableOpacity>
          <Text style={style.headerTitle}>Cancel Reservation</Text>
        </View>

        <View style={style.cancelContent}>
          <Text style={style.cancelTitle}>
            Please select the reason for cancellation:
          </Text>

          <View style={style.cancelList}>
            {reasons.map(reason => (
              <TouchableOpacity
                key={reason.id}
                onPress={() => setSelected(reason.id)}>
                <View style={style.radioContainer}>
                  <View style={style.radioOuter}>
                    {selected === reason.id && (
                      <View style={style.radioInner} />
                    )}
                  </View>
                  <Text style={style.cancelText}>{reason.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.noteInput}
            placeholder="Type your note here..."
            placeholderTextColor="#aaa"
            multiline
          />
        </View>
      </View>
      <View style={style.cancelBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CancelMemoji')}>
          <Text style={style.cancelBtnText}>Cancel Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CancelReserve;
