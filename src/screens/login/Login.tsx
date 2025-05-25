import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import _styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const styles = _styles;
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Success', `Logged in with ${email}`);
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Redirect to forgot password screen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginInfo}>
        <Text style={styles.title}>Log in</Text>

        {/* Email */}
        <Text style={styles.label}>Email adress</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Remember me & Forgot password */}
        <View style={styles.row}>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}>
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account? </Text>
          <TouchableOpacity
             onPress={() => navigation.navigate('Register')}
>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
