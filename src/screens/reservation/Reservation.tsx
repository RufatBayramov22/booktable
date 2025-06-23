import { View, Text, Image } from 'react-native';
import React from 'react';
import _styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const Reservation = () => {
  const styles = _styles;

  const reservations = [
    {
      id: 1,
      title: 'Golden Dragon Chinese Bistro',
      date: 'March 20, 2024 - 18:00 PM',
      persons: '2 Persons',
      place: 'Terrace',
      status: 'Pending',
    },
    { id: 2, title: 'Golden Dragon Chinese Bistro', date: 'March 20, 2024 - 18:00 PM', persons: '2 Persons', place: 'Terrace', status: 'Pending' },
    { id: 3, title: 'Golden Dragon Chinese Bistro', date: 'March 20, 2024 - 18:00 PM', persons: '2 Persons', place: 'Terrace', status: 'Pending' },
    { id: 4, title: 'Golden Dragon Chinese Bistro', date: 'March 20, 2024 - 18:00 PM', persons: '2 Persons', place: 'Terrace', status: 'Pending' },
    { id: 5, title: 'Golden Dragon Chinese Bistro', date: 'March 20, 2024 - 18:00 PM', persons: '2 Persons', place: 'Terrace', status: 'Pending' },
    { id: 6, title: 'Golden Dragon Chinese Bistro', date: 'March 20, 2024 - 18:00 PM', persons: '2 Persons', place: 'Terrace', status: 'Pending' },
    { id: 7, title: 'Golden Dragon Chinese Bistro', date: 'March 20, 2024 - 18:00 PM', persons: '2 Persons', place: 'Terrace', status: 'Pending' },
  ];

  return (
    <View style={styles.reservations}>
      <Text style={styles.reservationTitle}>Reservations</Text>
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 14 }}>
        <View style={styles.reservationCards}>
          {reservations.map(res => (
            <View key={res.id} style={styles.card}>
              <View>
                <Image source={require('../../assets/images/reservationImg.png')} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{res.title}</Text>
                <View style={styles.date}>
                  <Image source={require('../../assets/images/icon/calendar.png')} />
                  <Text style={styles.dateTitle}>{res.date}</Text>
                </View>
                <View style={styles.persons}>
                  <Image source={require('../../assets/images/icon/person.png')} />
                  <Text style={styles.dateTitle}>{res.persons}</Text>
                </View>
                <View style={styles.status}>
                  <View style={styles.place}>
                    <Image source={require('../../assets/images/icon/table.png')} />
                    <Text style={styles.dateTitle}>{res.place}</Text>
                  </View>
                  <View style={styles.statusComp}>
                    <Image source={require('../../assets/images/icon/pending.png')} />
                    <Text style={styles.dateTitle}>{res.status}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Reservation;
