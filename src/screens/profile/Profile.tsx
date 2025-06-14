import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

import _styles from './styles';

const Profile = () => {
  const styles = _styles;
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../assets/images/icon/avatar.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.addIcon}>
            <Image source={require('../../assets/images/icon/add.png')} style={styles.addIconImg} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Ethan Caldwell</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/person.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Profile</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/history.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Reservation History</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/settings.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/language.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Language</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/star.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Rate Our App</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/privacy.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconText}>
            <Image source={require('../../assets/images/icon/logout.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Log Out</Text>
          </View>
          <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;