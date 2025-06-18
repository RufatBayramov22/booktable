import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import _styles from './styles';


const PersonalInfo = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.personalInfoHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/goback.png')} style={styles.goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.personalInfoHeaderTitle}>Personal info</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 28, marginBottom: 38 }}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../assets/images/icon/avatar.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.addIcon}>
            <Image source={require('../../assets/images/icon/add.png')} style={styles.addIconImg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Image source={require('../../assets/images/icon/person_blue.png')} style={styles.infoIcon} />
          <Text style={styles.infoText}>Ethan Caldwell</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Image source={require('../../assets/images/icon/phone_blue.png')} style={styles.infoIcon} />
          <Text style={styles.infoText}>+9941234567</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Image source={require('../../assets/images/icon/email_blue.png')} style={styles.infoIcon} />
          <Text style={styles.infoText}>example@gmail.com</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalInfo; 