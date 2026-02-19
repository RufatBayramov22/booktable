import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import _styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import { AuthState } from '../../types/AuthState';
 

interface LoginProps {
  navigation: any;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const Login: React.FC<LoginProps> = ({ setAuthState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'https://booktables-001-site1.anytempurl.com/api/Users/login',
        { email, password }
      );

      console.log('✅ Login response:', res.data);

      // token və refreshToken gəlir, saxla
      await AsyncStorage.setItem('accessToken', res.data.data.token);
      await AsyncStorage.setItem('refreshToken', res.data.data.refreshToken);

      console.log('🔑 Token saved:', res.data.data.token);

      // parent componentdə authState-i dəyiş
      setAuthState('authenticated');

    } catch (error: any) {
      if (error.response) {
        console.error('❌ Login error (server):', error.response.data);
        Alert.alert('Error', error.response.data?.message || 'Login failed');
      } else if (error.request) {
        console.error('❌ Login error (no response):', error.request);
        Alert.alert('Error', 'No response from server. Please try again.');
      } else {
        console.error('❌ Login error (setup):', error.message);
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
