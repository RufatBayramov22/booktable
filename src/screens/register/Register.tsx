import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import apiRequest from '../../api/apirequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _styles from './styles';
import {RootStackParamList} from '../../navigation/stack';

const AZE_PHONE_PREFIX = '+994';
const AZE_PHONE_REGEX = /^\+994\d{9}$/;

const normalizeAzePhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let localPart = digits;

  if (localPart.startsWith('994')) {
    localPart = localPart.slice(3);
  }

  if (localPart.startsWith('0')) {
    localPart = localPart.slice(1);
  }

  localPart = localPart.slice(0, 9);
  return `${AZE_PHONE_PREFIX}${localPart}`;
};

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [phone, setPhone] = useState<string>(AZE_PHONE_PREFIX);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const getApiErrorMessage = (error: any): string => {
    const data = error?.response?.data;
    const payload = typeof data === 'object' && data !== null ? data : {};
    const inner = typeof payload?.d === 'object' && payload.d !== null ? payload.d : {};

    if (!data) {
      return 'Registration failed';
    }

    const rawMessage =
      typeof data === 'string'
        ? data
        : typeof payload?.Message === 'string' && payload.Message.trim()
        ? payload.Message
        : typeof payload?.message === 'string' && payload.message.trim()
        ? payload.message
        : typeof inner?.Message === 'string' && inner.Message.trim()
        ? inner.Message
        : typeof inner?.message === 'string' && inner.message.trim()
        ? inner.message
        : Array.isArray(payload?.Errors) && payload.Errors.length > 0
        ? String(payload.Errors[0])
        : Array.isArray(payload?.errors) && payload.errors.length > 0
        ? String(payload.errors[0])
        : Array.isArray(inner?.Errors) && inner.Errors.length > 0
        ? String(inner.Errors[0])
        : Array.isArray(inner?.errors) && inner.errors.length > 0
        ? String(inner.errors[0])
        : '';

    if (typeof rawMessage === 'string' && rawMessage.trim()) {
      if (/already taken|already registered/i.test(rawMessage)) {
        return 'This email or username is already registered. Please log in or use different details.';
      }
      return rawMessage;
    }

    return 'Registration failed';
  };

const handleRegister = async () => {
  const fullNameValue = fullName.trim();
  const emailValue = email.trim().toLowerCase();
  const passwordValue = password.trim();
  const passwordConfirmValue = passwordConfirm.trim();
  const phoneValue = normalizeAzePhone(phone);

  if (!fullNameValue || !emailValue || !passwordValue || !passwordConfirmValue || !phoneValue) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  if (passwordValue !== passwordConfirmValue) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  if (!rememberMe) {
    Alert.alert('Error', 'Please agree with Terms and Policy');
    return;
  }

  if (!AZE_PHONE_REGEX.test(phoneValue)) {
    Alert.alert('Error', 'Please enter a valid Azerbaijan phone number (example: +994501234567)');
    return;
  }

  try {
    const payload = {
      fullName: fullNameValue,
      email: emailValue,
      phoneNumber: phoneValue,
      password: passwordValue,
      passwordConfirm: passwordConfirmValue,
    };

    console.log('Register request payload:', payload);

    const res = await apiRequest.post('/Users/createUser', payload);

    console.log('Registered', res.data);

    if (res.status >= 200 && res.status < 300) {
      await AsyncStorage.setItem('userFullName', fullNameValue);
      await AsyncStorage.setItem('userEmail', emailValue);
      await AsyncStorage.setItem('userPhone', phoneValue);

      let otpSent = false;
      try {
        console.log('Sending OTP to:', emailValue);
        await apiRequest.post('/Users/sendOtp', {
          email: emailValue,
        });
        otpSent = true;
        console.log('✅ OTP sent successfully');
        Alert.alert('Success', 'Register Success. Check your email for OTP.');
      } catch (otpError: any) {
        console.error('❌ OTP send failed:', {
          status: otpError?.response?.status,
          data: otpError?.response?.data,
          message: otpError?.message,
        });

        const otpMessage =
          otpError?.response?.data?.Message ||
          otpError?.response?.data?.message ||
          otpError?.response?.data?.d?.message ||
          otpError?.response?.data?.d?.Message ||
          otpError?.message ||
          'Failed to send OTP';

        if (otpMessage.toLowerCase().includes('wait before requesting another otp')) {
          Alert.alert('OTP Already Sent', 'Please wait before requesting another OTP.');
          otpSent = true; // still navigate even if already sent
        } else {
          // Show error but still navigate to OTP screen so user can resend
          Alert.alert('Warning', 'OTP send failed. You can resend on the next screen.');
        }
      }

      // Always navigate to OTP screen after registration attempt
      navigation.navigate('Otp', { email: emailValue });
    }
  } catch (error: any) {
    const responseData = error?.response?.data;
    const statusCode = Number(
      error?.response?.status ??
        responseData?.StatusCode ??
        responseData?.statusCode ??
        responseData?.d?.statusCode,
    );
    const apiMessage = getApiErrorMessage(error);
    const rawErrorText = String(
      responseData?.message ??
        responseData?.Message ??
        responseData?.d?.message ??
        responseData?.d?.Message ??
        apiMessage,
    );
    const isDuplicate = /already taken|already registered/i.test(rawErrorText);
    const errorMsg =
      statusCode === 409 || isDuplicate
        ? 'This email or username is already registered. Please log in or use different details.'
        : apiMessage;

    // API rejects like 400/409 are expected runtime outcomes, not app crashes.
    console.warn('Register rejected:', {statusCode, message: apiMessage});
    Alert.alert('Error', errorMsg);
  }
};
  return (
    <View style={styles.container}>
      <View style={styles.registerInfo}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 32,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icon/goback.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up to Get Started</Text>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+994501234567"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => setPhone(normalizeAzePhone(text))}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          secureTextEntry
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />

        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}>
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <Text>agree with</Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#2176FF',
                  textDecorationLine: 'underline',
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                Terms
              </Text>
            </TouchableOpacity>
            <Text>and</Text>
            <Text
              style={{
                color: '#2176FF',
                textDecorationLine: 'underline',
                fontWeight: '600',
                fontSize: 12,
              }}>
              Policy
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
