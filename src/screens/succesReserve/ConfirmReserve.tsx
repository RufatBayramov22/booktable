import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {RootStackParamList} from '../../navigation/stack';
import styles from './styles';
const ConfirmReserve = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const style = styles;
  const [modalVisible, setModalVisible] = useState(false);
  const handleCancelPress = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.navigate('CancelReserve');
    }, 300);
  };

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
    <View style={styles.container}>
      {/* Center Content */}
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/images/celebrate.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.subtitle}>Your reservation is confirmed</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>View E-ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoHome}>
          <Text style={styles.link}>Back to Home</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={style.modalCard}>
                <Image
                  source={require('../../assets/images/qrcode.png')}
                  style={styles.qr}
                />
                <Text style={styles.qrText}>
                  Please scan your QR code at the restaurant to check in
                </Text>
                <View style={styles.divider} />
                <View style={styles.infoContainer}>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>John Doe</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>May 14, 2025</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Time</Text>
                    <Text style={styles.value}>09:00 PM</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>No. of Guests</Text>
                    <Text style={styles.value}>5</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Table</Text>
                    <Text style={styles.value}>Terrace</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Occasion</Text>
                    <Text style={styles.value}>Birthday</Text>
                  </View>
                </View>
              </View>
              <View style={styles.modalBtns}>
                <TouchableOpacity style={styles.modalBtn}>
                  <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelPress}>
                  <Text style={styles.cancelText}>Cancel Reservation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ConfirmReserve;
