import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { _styles } from './styles';
import DotIndicator from './Dot';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

type Props = {
  onContinue: () => void;
  currentStep: number;
  totalSteps: number;
  onSkip?: () => void;
};



const Step1: React.FC<Props> = ({ onContinue, currentStep, totalSteps, onSkip }) => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.step}>
      <TouchableOpacity style={styles.skipContainer} onPress={()=>navigation.navigate('Otp')}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.stepInfo}>
        <Image source={require('../../assets/images/step1.png')} />
        <Text style={styles.title}>Find Your Favorite Place</Text>
        <Text style={styles.description}>Find hidden gems and popular spots nearby</Text>
      </View>

   
      <DotIndicator currentStep={currentStep} stepsCount={totalSteps} />

      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step1;
