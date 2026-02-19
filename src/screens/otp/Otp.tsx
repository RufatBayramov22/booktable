import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import _styles from './styles';
import axios from 'axios';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/stack';
import {StackNavigationProp} from '@react-navigation/stack';

type OtpRouteProp = RouteProp<RootStackParamList, 'Otp'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(104);
  const inputs = useRef<Array<TextInput | null>>([]);
  const styles = _styles;

  const route = useRoute<OtpRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const {email} = route.params;

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // OTP input change
  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

// OTP təsdiq funksiyası
const verifyOtp = async () => {
  if (otp.some(d => d.trim() === '')) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  try {
    const res = await axios.post(
      'https://booktables-001-site1.anytempurl.com/api/Users/verifyOtp',
      { email, otpCode: otp.join('') } 
    );
console.log(JSON.stringify(res.data, null, 2));

    console.log('OTP verified:', res.data);
    Alert.alert('Success', 'OTP Verified!');
    navigation.navigate('Login'); 
  } catch (error: any) {
    if (error.response) {
      console.error('OTP verify error (server):', error.response.data);

      if (error.response.data?.code === 'OTP_EXPIRED' || error.response.data?.code === 'INVALID_OTP') {
        try {
          await axios.post(
            'https://booktables-001-site1.anytempurl.com/api/Users/sendOtp',
            { email }
          );
          
          setOtp(['', '', '', '']);
          setTimer(104);
          Alert.alert('Info', 'A new OTP has been sent to your email.');
        } catch (resendError) {
          console.error('Resend OTP failed:', resendError);
        }
      }

      Alert.alert('Error', error.response.data?.message || 'Invalid OTP');
    } else if (error.request) {
      console.error('OTP verify error (no response):', error.request);
      Alert.alert('Error', 'No response from server. Please try again.');
    } else {
      console.error('OTP verify error (setup):', error.message);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  }
};



  const formattedTimer = `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/images/icon/goback.png')} />
      </TouchableOpacity>

      <Text style={styles.title}>Enter the 4-digit code</Text>
      <Text style={styles.subTitle}>A code was sent to {email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => { inputs.current[index] = ref; }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
          />
        ))}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.resendText}>Didn’t receive OTP?</Text>
        <TouchableOpacity onPress={verifyOtp}>
          <Text style={styles.resendLink}> Resend code</Text>
        </TouchableOpacity>
        <Text style={styles.timer}>{formattedTimer}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.verifyButton,
          otp.every(digit => digit !== '') && { backgroundColor: '#2176FF' },
        ]}
        onPress={verifyOtp}
        disabled={otp.some(digit => digit === '')}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;
