import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';
import Language from '../../components/LanguageModal/Language';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetToLogin} from '../../navigation/navigationRef';
import {AuthState} from '../../types/AuthState';

interface LogoutProps {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const topItems = [
  {label: 'Profile', icon: require('../../assets/images/icon/personIcon.png')},
  {
    label: 'Reservation History',
    icon: require('../../assets/images/icon/history.png'),
  },
  {label: 'Settings', icon: require('../../assets/images/icon/settings.png')},
];

const bottomItems = [
  {label: 'Language', icon: require('../../assets/images/icon/globe.png')},
  {label: 'Rate Our App', icon: require('../../assets/images/icon/star.png')},
  {
    label: 'Privacy Policy',
    icon: require('../../assets/images/icon/privacy.png'),
  },
  {label: 'Log Out', icon: require('../../assets/images/icon/log-out.png')},
];

const ProfileScreen: React.FC<LogoutProps> = ({setAuthState}) => {
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>('Azerbaijani');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleBottomItemPress = (label: string) => {
    switch (label) {
      case 'Language':
        setLanguageModalVisible(true);
        break;
      case 'Rate Our App':
        break;
      case 'Privacy Policy':
        break;
      case 'Log Out':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (refreshToken) {
        await fetch(
          'https://booktables-001-site1.anytempurl.com/api/Users/logout',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refreshToken}),
          },
        );
      }

      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      setAuthState('unauthenticated');
      // Root navigator səviyyəsində reset
      resetToLogin();
    } catch (error) {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      resetToLogin();
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/profileSec.png')}
            style={styles.avatarImage}
          />
          <View style={styles.plusIconContainer}>
            <Image
              source={require('../../assets/images/plus.png')}
              style={styles.plusIcon}
            />
          </View>
        </View>
        <Text style={styles.name}>Ethan Caldwell</Text>
      </View>

      {/* Top Menu */}
      <View style={styles.menuContainer}>
        {topItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              switch (item.label) {
                case 'Profile':
                  navigation.navigate('Personal');
                  break;
                case 'Reservation History':
                  navigation.navigate('Reservation');
                  break;
                case 'Settings':
                  // navigation.navigate('Settings');
                  break;
                default:
                  break;
              }
            }}>
            <View style={styles.itemLeft}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Image
              source={require('../../assets/images/icon/arrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Menu */}
      <View style={[styles.menuContainer, {marginTop: 50}]}>
        {bottomItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleBottomItemPress(item.label)}>
            <View style={styles.itemLeft}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Image
              source={require('../../assets/images/icon/arrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Modal */}
      <Language
        visible={isLanguageModalVisible}
        selected={selectedLanguage}
        onSelect={lang => {
          setSelectedLanguage(lang);
        }}
        onClose={() => setLanguageModalVisible(false)}
      />
    </View>
  );
};

export default ProfileScreen;
