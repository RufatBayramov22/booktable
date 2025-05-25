import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { _styles } from './styles';
import { Image } from 'react-native';

type Props = {
  onContinue: () => void;
  currentStep: number;
  totalSteps: number;
};

const Step2:React.FC<Props>= ({ onContinue, currentStep, totalSteps }) => {
  const styles = _styles;

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
          />
        );
      }
      return <View style={styles.dotsContainer}>{dots}</View>;
    };

  return (
    <View style={styles.step}>
      <View style={styles.skipContainer}>
        <Text style={styles.skip}>Skip</Text>
      </View>
      <View>
        <View style={styles.stepInfo}>
  <Image source={require('../../assets/images/step2.png')}/>
      <Text style={styles.title}>Reserve Effortlessly</Text>
      <Text style={styles.description}>Select your date, time, and party size easily</Text>
      </View>
      {renderDots()}
        </View>
   

 
      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step2;
