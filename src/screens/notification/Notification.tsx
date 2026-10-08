import {View, Text, TouchableOpacity, Modal, ActivityIndicator, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import _style from './styles';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import EditNotificationsModal from '../../components/EditNotificatio/EditNotification';
import {fetchNotifications, markAllNotificationsAsRead, deleteAllNotifications, Notification} from '../../api/notifications';

const NotificationScreen = () => {
  const style = _style;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err: any) {
      console.warn('Failed to fetch notifications:', err);
      setError(err?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setModalVisible(false);
      await loadNotifications();
    } catch (err) {
      console.warn('Failed to mark all as read:', err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllNotifications();
      setModalVisible(false);
      setNotifications([]);
    } catch (err) {
      console.warn('Failed to delete all notifications:', err);
    }
  };

  const getNotificationMessage = (notification: Notification) => {
    return (
      notification.message ||
      notification.Message ||
      notification.content ||
      notification.Content ||
      'New notification'
    );
  };

  const getNotificationDate = (notification: Notification) => {
    return (
      notification.date ||
      notification.Date ||
      notification.createdAt ||
      notification.CreatedAt ||
      notification.time ||
      notification.Time ||
      ''
    );
  };

  const renderNotificationItem = ({item}: {item: Notification}) => (
    <View style={style.notificationBox}>
      <View style={style.mealIcon}>
        <Image
          style={style.icon}
          source={require('../../assets/images/icon/notmeal.png')}
        />
      </View>
      <View style={style.boxInfo}>
        <Text style={style.message} numberOfLines={3}>
          {getNotificationMessage(item)}
        </Text>
        <Text style={style.date}>{getNotificationDate(item)}</Text>
      </View>
    </View>
  );

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

      {loading ? (
        <View style={style.centerContainer}>
          <ActivityIndicator size="large" color="#2166FF" />
        </View>
      ) : notifications.length === 0 ? (
        <View style={style.emptyContainer}>
          <Text style={style.emptyMessage}>No notifications yet</Text>
        </View>
      ) : (
        <View style={style.notificationBody}>
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => String(item.id)}
            scrollEnabled={false}
          />
        </View>
      )}

      <EditNotificationsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onMarkAllRead={handleMarkAllAsRead}
        onDeleteAll={handleDeleteAll}
      />
    </View>
  );
};

export default NotificationScreen;
