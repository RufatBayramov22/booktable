import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../api/apirequest';
import {resetToLogin} from '../../navigation/navigationRef';

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

const Personal = () => {
  const style = styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedFullName = await AsyncStorage.getItem('userFullName');
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPhone = await AsyncStorage.getItem('userPhone');

      setUser({
        id: 0,
        fullName: storedFullName || undefined,
        email: storedEmail || undefined,
        phone: storedPhone || undefined,
      });

      try {
        const token = await AsyncStorage.getItem('accessToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!token || !storedUserId) {
          return;
        }

        const res = await apiRequest.get<ApiUserResponse>(
          `/Users/${storedUserId}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        const userData = extractUserFromResponse(res.data) || {id: 0};

        const resolvedName = getDisplayName(userData, storedFullName);
        const resolvedEmail =
          userData.email ||
          userData.Email ||
          storedEmail ||
          undefined;
        const resolvedPhone =
          userData.phone ||
          userData.Phone ||
          userData.phoneNumber ||
          userData.PhoneNumber ||
          userData.mobileNumber ||
          userData.MobileNumber ||
          storedPhone ||
          undefined;

        setUser({
          ...userData,
          fullName: resolvedName,
          email: resolvedEmail,
          phone: resolvedPhone,
        });

        if (resolvedName) {
          await AsyncStorage.setItem('userFullName', resolvedName);
        }
        if (resolvedEmail) {
          await AsyncStorage.setItem('userEmail', resolvedEmail);
        }
        if (resolvedPhone) {
          await AsyncStorage.setItem('userPhone', resolvedPhone);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId', 'userFullName', 'userEmail', 'userPhone']);
          resetToLogin();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const displayName = getDisplayName(user);
  const displayPhone =
    user?.phone ||
    user?.Phone ||
    user?.phoneNumber ||
    user?.PhoneNumber ||
    user?.mobileNumber ||
    user?.MobileNumber ||
    'No phone';
  const displayEmail =
    user?.email ||
    user?.Email ||
    'No email';

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.headline}>Personal Info</Text>
      </View>
      <View style={style.body}>
        <View
          style={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../assets/images/profileSec.png')} />
        </View>

        <View style={style.personalInfo}>
          <View style={style.infoBox}>
            <Image
              width={24}
              height={24}
              source={require('../../assets/images/icon/person.png')}
            />
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={style.name}>{displayName}</Text>
            )}
          </View>
          <View style={style.infoBox}>
            <Image
              width={24}
              height={24}
              source={require('../../assets/images/icon/person.png')}
            />
            <Text style={style.name}>{displayPhone}</Text>
            <Text style={{marginLeft: 'auto', color: 'rgba(33, 118, 255, 1)'}}>
              Edit
            </Text>
          </View>
          <View style={style.infoBox}>
            <Image
              width={24}
              height={24}
              source={require('../../assets/images/icon/person.png')}
            />
            <Text style={style.name}>{displayEmail}</Text>
            <Text style={{marginLeft: 'auto', color: 'rgba(33, 118, 255, 1)'}}>
              Edit
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Personal;
