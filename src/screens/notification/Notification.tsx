import {View, Text, TouchableOpacity, Modal,} from 'react-native';
import React, {useState} from 'react';
import _style from './styles';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import EditNotificationsModal from '../../components/EditNotificatio/EditNotification';

const Notification = () => {
  const style = _style;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMarkAllAsRead = () => {
    setModalVisible(false);
  };

  const handleDeleteAll = () => {
    setModalVisible(false);
  };

  return (
    <View style={style.notification}>
      <View style={style.notificationHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.notificationTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={style.editTitle}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={style.notificationBody}>
        {[...Array(4)].map((_, index) => (
          <View style={style.notificationBox} key={index}>
            <View style={style.mealIcon}>
              <Image
                style={style.icon}
                source={require('../../assets/images/icon/notmeal.png')}
              />
            </View>
            <View style={style.boxInfo}>
              <Text style={style.message}>
                Your table Golden Dragon Chinese Bistro has been successfully
                booked for April 20 at 14:00.
              </Text>
              <Text style={style.date}>08.04.2025 10:00</Text>
            </View>
          </View>
        ))}
      </View>

<EditNotificationsModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onMarkAllRead={() => {
    handleMarkAllAsRead();
    setModalVisible(false);
  }}
  onDeleteAll={() => {
    handleDeleteAll();
    setModalVisible(false);
  }}
/>

    </View>
  );
};

export default Notification;
