import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import styles from './styles';

const Settings = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleChangePassword = () => {
    // Navigate to change password screen or show modal
    Alert.alert('Change Password', 'This feature will be available soon.');
  };

  const handleDeactivateAccount = () => {
    navigation.navigate('DeactivateAccount');
  };

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    // Call API to update notification preferences
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkModeEnabled(value);
    // Call API to update dark mode preference
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/icon/left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleChangePassword}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemLabel}>Change password</Text>
          </View>
          <Image
            source={require('../../assets/images/icon/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleDeactivateAccount}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemLabel}>Deactivate account</Text>
          </View>
          <Image
            source={require('../../assets/images/icon/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.toggleItem}>
          <Text style={styles.itemLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: '#E0E0E0', true: '#5B9EFF' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#F0F0F0'}
            style={styles.toggle}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.itemLabel}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#E0E0E0', true: '#5B9EFF' }}
            thumbColor={darkModeEnabled ? '#FFFFFF' : '#F0F0F0'}
            style={styles.toggle}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;
