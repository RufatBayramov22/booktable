import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Language from '../../components/LanguageModal/Language';

const topItems = [
  { label: 'Profile', icon: require('../../assets/images/icon/personIcon.png') },
  {
    label: 'Reservation History',
    icon: require('../../assets/images/icon/history.png'),
  },
  { label: 'Settings', icon: require('../../assets/images/icon/settings.png') },
];

const bottomItems = [
  { label: 'Language', icon: require('../../assets/images/icon/globe.png') },
  { label: 'Rate Our App', icon: require('../../assets/images/icon/star.png') },
  {
    label: 'Privacy Policy',
    icon: require('../../assets/images/icon/privacy.png'),
  },
  { label: 'Log Out', icon: require('../../assets/images/icon/log-out.png') },
];

const ProfileScreen: React.FC = () => {
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Azerbaijani');

  const handleBottomItemPress = (label: string) => {
    switch (label) {
      case 'Language':
        setLanguageModalVisible(true);
        break;
      case 'Rate Our App':
        // TODO: Rate functionality
        break;
      case 'Privacy Policy':
        // TODO: Navigate or open policy link
        break;
      case 'Log Out':
        // TODO: Log out functionality
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/profileSec.png')}
            style={styles.avatarImage}
          />
          <View style={styles.plusIconContainer}>
            <Image
              source={require('../../assets/images/plus.png')}
              style={styles.plusIcon}
            />
          </View>
        </View>
        <Text style={styles.name}>Ethan Caldwell</Text>
      </View>

      {/* Top Menu */}
      <View style={styles.menuContainer}>
        {topItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.itemLeft}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Image
              source={require('../../assets/images/icon/arrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Menu */}
      <View style={[styles.menuContainer, { marginTop: 50 }]}>
        {bottomItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleBottomItemPress(item.label)}
          >
            <View style={styles.itemLeft}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Image
              source={require('../../assets/images/icon/arrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Modal */}
      <Language
        visible={isLanguageModalVisible}
        selected={selectedLanguage}
        onSelect={(lang) => {
          setSelectedLanguage(lang);
          
        }}
        onClose={() => setLanguageModalVisible(false)}
      />
    </View>
  );
};

export default ProfileScreen;
