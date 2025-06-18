import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import _styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabParamList = {
  profileTab: undefined;
  homeTab: undefined;
  wishlistTab: undefined;
  reservationTab: undefined;
  chatTab: undefined;
};

const Profile = () => {
  const styles = _styles;
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const stackNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const languageSlideAnim = useRef(new Animated.Value(400)).current;
  const languageFadeAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(0, gestureState.dy);
        languageSlideAnim.setValue(newPosition);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // If dragged down more than 100 units, close the modal
          setShowLanguageModal(false);
          navigation.setOptions({
            tabBarStyle: undefined
          });
          
          Animated.parallel([
            Animated.timing(languageFadeAnim, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(languageSlideAnim, {
              toValue: 400,
              tension: 85,
              friction: 9,
              useNativeDriver: true,
            }),
          ]).start();
        } else {
          // Snap back to open position
          Animated.spring(languageSlideAnim, {
            toValue: 0,
            tension: 65,
            friction: 11,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (showLanguageModal) {
      // Hide navigation bar when modal opens
      navigation.setOptions({
        tabBarStyle: {
          display: 'none'
        }
      });
    }
  }, [showLanguageModal, navigation]);

  const openLanguageModal = () => {
    setShowLanguageModal(true);
    navigation.setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
    
    Animated.parallel([
      Animated.timing(languageFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(languageSlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeLanguageModal = () => {
    setShowLanguageModal(false);
    navigation.setOptions({
      tabBarStyle: undefined
    });
    
    Animated.parallel([
      Animated.timing(languageFadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(languageSlideAnim, {
        toValue: 400,
        tension: 85,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    console.log('Modal state changed:', showLogoutModal);
    
    if (showLogoutModal) {
      navigation.setOptions({
        tabBarStyle: {
          position: 'absolute',
          bottom: -100,
          height: 0,
          opacity: 0
        }
      });
      
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Reverse animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 100,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        })
      ]).start(() => {
        navigation.setOptions({
          tabBarStyle: undefined
        });
      });
    }

    return () => {
      navigation.setOptions({
        tabBarStyle: undefined
      });
    };
  }, [showLogoutModal, navigation, fadeAnim, slideAnim]);

  useEffect(() => {
    return () => {
      navigation.setOptions({
        tabBarStyle: undefined
      });
    };
  }, [navigation]);

  const handleProfilePress = () => {
    stackNavigation.navigate('PersonalInfo');
  };

  const handleLogoutPress = () => {
    console.log('Logout button pressed');
    setShowLogoutModal(true);
  };

  return (
    <View style={modalStyles.container}>
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
          <TouchableOpacity style={styles.menuItem} onPress={handleProfilePress}>
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
          <TouchableOpacity style={styles.menuItem} onPress={openLanguageModal}>
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
          <TouchableOpacity style={styles.menuItem} onPress={handleLogoutPress}>
            <View style={styles.menuIconText}>
              <Image source={require('../../assets/images/icon/logout.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Log Out</Text>
            </View>
            <Image source={require('../../assets/images/icon/right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showLogoutModal && (
        <View style={modalStyles.modalWrapper}>
          <Animated.View 
            style={[
              modalStyles.overlay,
              { opacity: fadeAnim }
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setShowLogoutModal(false)}
            />
          </Animated.View>
          <Animated.View 
            style={[
              modalStyles.modalContainer,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={modalStyles.button}
              onPress={() => {
                console.log('Log out confirmed');
                setShowLogoutModal(false);
              }}
              activeOpacity={0.6}
            >
              <Text style={modalStyles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton]}
              onPress={() => setShowLogoutModal(false)}
              activeOpacity={0.6}
            >
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {showLanguageModal && (
        <View style={modalStyles.modalWrapper}>
          <Animated.View 
            style={[
              modalStyles.overlay,
              { opacity: languageFadeAnim }
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={closeLanguageModal}
            />
          </Animated.View>
          <Animated.View 
            {...panResponder.panHandlers}
            style={[
              modalStyles.languageModalContainer,
              {
                transform: [{ translateY: languageSlideAnim }]
              }
            ]}
          >
            <View style={modalStyles.dragIndicator} />
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.languageTitle}>Language</Text>
              <TouchableOpacity 
                onPress={closeLanguageModal}
                style={modalStyles.cancelButton}
              >
                <Text style={modalStyles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={modalStyles.divider} />
            <TouchableOpacity style={modalStyles.languageOption}>
              <Text style={modalStyles.languageText}>Azərbaycan dili</Text>
              <View style={modalStyles.radioButton} />
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.languageOption}>
              <Text style={modalStyles.languageText}>English</Text>
              <View style={[modalStyles.radioButton, modalStyles.radioButtonSelected]}>
                <View style={modalStyles.radioButtonInner} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.languageOption}>
              <Text style={modalStyles.languageText}>Русский</Text>
              <View style={modalStyles.radioButton} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    padding: 16,
    paddingBottom: 34,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cancelButton: {
    marginBottom: 0,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SF Pro',
  },
  cancelText: {
    color: '#2176FF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SF Pro',
  },
  languageModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    zIndex: 1,
    paddingTop: 8,
  },
  dragIndicator: {
    width: 36,
    height: 5,
    backgroundColor: '#E3E3E3',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  languageTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 32, // To center the title accounting for Cancel button
    fontFamily: 'SF Pro',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#C6C6C8',
    width: '100%',
    marginBottom: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  languageText: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'SF Pro',
    fontWeight: '400',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#2176FF',
  },
  radioButtonInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2176FF',
  },
});

export default Profile;