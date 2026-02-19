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
import axios from 'axios';
import _styles from './styles';
import {RootStackParamList} from '../../navigation/stack';
const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

const handleRegister = async () => {
  if (!fullName || !email || !password || !passwordConfirm || !phone) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  if (password !== passwordConfirm) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  if (!rememberMe) {
    Alert.alert('Error', 'Please agree with Terms and Policy');
    return;
  }

  try {
    const res = await axios.post(
      'https://booktables-001-site1.anytempurl.com/api/Users/createUser',
      {
        fullName,
        username: phone,
        email,
        password,
        passwordConfirm,
      },
    );

    console.log('Registered', res.data);

    if (res.status === 200) {
      await axios.post('https://booktables-001-site1.anytempurl.com/api/Users/sendOtp', {
        email,
      });

      Alert.alert('Success', 'Register Success. Check your email for OTP.');
      navigation.navigate('Otp', { email }); 
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || 'Registration failed';
    console.error('Register error:', error.response?.data || error.message);
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
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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
