import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiRequest from '../../api/apirequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

import _styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import { AuthState } from '../../types/AuthState';
 

interface LoginProps {
  navigation: any;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

type AuthUserPayload = {
  id?: number | string;
  token?: string;
  refreshToken?: string;
  fullName?: string;
  FullName?: string;
  Name?: string;
  name?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  Email?: string;
  phone?: string;
  Phone?: string;
  phoneNumber?: string;
  PhoneNumber?: string;
  mobileNumber?: string;
  MobileNumber?: string;
};

const Login: React.FC<LoginProps> = ({ setAuthState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const getApiErrorMessage = (error: any): string => {
    const data = error?.response?.data;

    if (!data) {
      return 'Login failed';
    }

    if (typeof data === 'string') {
      return data;
    }

    if (typeof data?.Message === 'string' && data.Message.trim()) {
      return data.Message;
    }

    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message;
    }

    if (Array.isArray(data?.Errors) && data.Errors.length > 0) {
      return String(data.Errors[0]);
    }

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return String(data.errors[0]);
    }

    return 'Login failed';
  };

  const getUserFromAuthResponse = (payload: any): AuthUserPayload => {
    if (payload?.data) {
      return payload.data as AuthUserPayload;
    }
    if (payload?.Data) {
      return payload.Data as AuthUserPayload;
    }
    return (payload || {}) as AuthUserPayload;
  };

  const resolveFullName = (user: AuthUserPayload): string | undefined => {
    const fullName =
      user.fullName ||
      user.FullName ||
      user.Name ||
      user.name ||
      [user.firstName, user.lastName].filter(Boolean).join(' ').trim();

    return fullName || undefined;
  };

  const handleLogin = async () => {
    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (!emailValue || !passwordValue) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest.post(
        '/Users/login',
        {email: emailValue, password: passwordValue}
      );

      const userData = getUserFromAuthResponse(res.data);
      const tokenValue = userData.token;
      const refreshTokenValue = userData.refreshToken;

      console.log('✅ Login response:', res.data);

      if (!tokenValue || !refreshTokenValue) {
        Alert.alert('Error', 'Login response is missing token data.');
        return;
      }

      // token və refreshToken gəlir, saxla
      await AsyncStorage.setItem('accessToken', tokenValue);
      await AsyncStorage.setItem('refreshToken', refreshTokenValue);
      await AsyncStorage.setItem('userEmail', emailValue);
      if (userData.id !== undefined && userData.id !== null) {
        await AsyncStorage.setItem('userId', String(userData.id));
      }

      const fullName = resolveFullName(userData);
      if (fullName) {
        await AsyncStorage.setItem('userFullName', fullName);
      }

      const resolvedPhone =
        userData.phone ||
        userData.Phone ||
        userData.phoneNumber ||
        userData.PhoneNumber ||
        userData.mobileNumber ||
        userData.MobileNumber;

      if (resolvedPhone) {
        await AsyncStorage.setItem('userPhone', String(resolvedPhone));
      }

      console.log('🔑 Token saved:', tokenValue);

      // parent componentdə authState-i dəyiş
      setAuthState('authenticated');

    } catch (error: any) {
      if (error.response) {
        const message = getApiErrorMessage(error);
        // Invalid credentials are expected runtime outcomes, not app crashes.
        console.warn('Login rejected:', message);
        Alert.alert('Error', message);
      } else if (error.request) {
        console.warn('Login request failed: no response from server');
        Alert.alert('Error', 'No response from server. Please try again.');
      } else {
        console.warn('Login setup error:', error.message);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginInfo}>
        <Text style={styles.title}>Log in</Text>

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Log in'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
