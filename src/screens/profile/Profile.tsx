import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Language from '../../components/LanguageModal/Language';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetToLogin} from '../../navigation/navigationRef';
import {AuthState} from '../../types/AuthState';
import apiRequest from '../../api/apirequest';

interface LogoutProps {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

interface UserProfile {
  id: number;
  fullName?: string;
  FullName?: string;
  Name?: string;
  name?: string;
  username?: string;
  email?: string;
  Email?: string;
  phone?: string;
  Phone?: string;
  phoneNumber?: string;
  PhoneNumber?: string;
  mobileNumber?: string;
  MobileNumber?: string;
}

type ApiUserResponse =
  | UserProfile
  | {
      data?: UserProfile;
      Data?: UserProfile;
    };

const extractUserFromResponse = (payload: ApiUserResponse): UserProfile | null => {
  if (payload && typeof payload === 'object' && 'data' in payload && payload.data) {
    return payload.data;
  }

  if (payload && typeof payload === 'object' && 'Data' in payload && payload.Data) {
    return payload.Data;
  }

  return payload as UserProfile;
};

const looksLikeEmail = (value?: string) => !!value && value.includes('@');

const getDisplayName = (user?: UserProfile | null, fallbackName?: string | null) => {
  const apiName =
    user?.fullName ||
    user?.FullName ||
    user?.Name ||
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();

  if (apiName) {
    return apiName;
  }

  if (fallbackName) {
    return fallbackName;
  }

  if (user?.username && !looksLikeEmail(user.username)) {
    return user.username;
  }

  return 'User';
};

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
  const [userName, setUserName] = useState('User');
  const [loadingUser, setLoadingUser] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchUser = async () => {
      const storedFullName = await AsyncStorage.getItem('userFullName');
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const localNameFromEmail = storedEmail?.split('@')?.[0] || null;
      const fallbackName = storedFullName || localNameFromEmail;

      setUserName(fallbackName || 'User');

      try {
        const token = await AsyncStorage.getItem('accessToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!token) {
          return;
        }

        const requestConfig = {
          headers: {Authorization: `Bearer ${token}`},
        };

        let user: UserProfile | null = null;

        if (storedUserId) {
          const res = await apiRequest.get<ApiUserResponse>(
            `/Users/${storedUserId}`,
            requestConfig,
          );

          user = extractUserFromResponse(res.data);
        }

        if (user) {
          const nextName = getDisplayName(user, fallbackName);
          setUserName(nextName);
          await AsyncStorage.setItem('userFullName', nextName);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId', 'userFullName', 'userEmail', 'userPhone']);
          setAuthState('unauthenticated');
          resetToLogin();
        }
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [setAuthState]);

  const handleBottomItemPress = (label: string) => {
    switch (label) {
      case 'Language':
        setLanguageModalVisible(true);
        break;
      case 'Rate Our App':
        break;
      case 'Privacy Policy':
        navigation.navigate('PrivacyPolicy');
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
        await apiRequest.post(
          '/Users/logout',
          {refreshToken},
        );
      }

      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId', 'userFullName', 'userEmail', 'userPhone']);
      setAuthState('unauthenticated');
      resetToLogin();
    } catch (error) {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId', 'userFullName', 'userEmail', 'userPhone']);
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
        {loadingUser ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.name}>{userName}</Text>
        )}
      </View>

      {/* Top Menu */}
      <View style={styles.menuContainer}>
        {topItems.map((item, index) => (
          <TouchableOpacity
            key={`top-${item.label}`}
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
                  navigation.navigate('Settings');
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
            key={`bottom-${item.label}`}
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
  