import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {_styles} from './styles';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  currentStep: number;
  totalSteps: number;
  navigation: any; 
};



const Step3: React.FC<Props> = ({currentStep, totalSteps}) => {
  const styles = _styles;
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const renderDots = () => {
    let dots = [];
    for (let i = 1; i <= totalSteps; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            currentStep === i ? styles.activeDot : styles.inactiveDot,
          ]}
        />,
      );
    }
    return <View style={styles.dotsContainer}>{dots}</View>;
  };

  

  return (
    <View style={styles.step}>
      <View style={styles.stepInfo}>
        <Image source={require('../../assets/images/step3.png')} />
        <Text style={styles.title}>Delicious Moments Await</Text>
        <Text style={styles.description}>
          Get ready for a memorable dining experience
        </Text>
        {renderDots()}
        <View style={styles.authButtons}>
      <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate('Login')}
>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.registerButton}
  onPress={() => navigation.navigate('Register')}
>
  <Text style={styles.loginText}>Register</Text>
</TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default Step3;
