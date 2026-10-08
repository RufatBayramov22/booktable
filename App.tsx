import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import Onboarding from './src/screens/onboarding/Onboarding';
import Otp from './src/screens/otp/Otp';
import HomeTabs from './HomeTabs';
import {navigationRef} from './src/navigation/navigationRef';
import { RootStackParamList } from './src/navigation/stack';
import { registerDeviceToken } from './src/api/pushToken';

const Stack = createStackNavigator<RootStackParamList>();

import { AuthState } from './src/types/AuthState';
import Personal from './src/screens/personal/Personal';
import Settings from './src/screens/settings/Settings';
import DeactivateAccount from './src/screens/settings/DeactivateAccount';
import PrivacyPolicy from './src/screens/settings/PrivacyPolicy';
import SingleRestaurant from './src/screens/singleRestaurant/SingleRestaurant';
import FilteredResults from './src/screens/home/FilteredResults';
import FullGalery from './src/screens/gallery/FullGalery';
import Fullmenu from './src/screens/menu/Fullmenu';
import Booktable from './src/screens/booktable/Booktable';
import Reservation from './src/screens/reservation/Reservation';
import SeatOption from './src/screens/seatoptions/SeatOption';
import ConfirmReserve from './src/screens/succesReserve/ConfirmReserve';
import CancelReserve from './src/screens/cancel/CancelReserve';
import CancelMemoji from './src/screens/cancelMemoji/CancelMemoji';
import Notification from './src/screens/notification/Notification';
import SingleChat from './src/components/SingleChat/SingleChat';

function MainNavigator({
  authState,
  setAuthState,
}: {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState === 'authenticated' ? (
        <>
          <Stack.Screen name="HomeTabs">
            {props => <HomeTabs {...props} setAuthState={setAuthState} />}
          </Stack.Screen>
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Personal" component={Personal} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="DeactivateAccount" component={DeactivateAccount} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="Reservation" component={Reservation} />
          <Stack.Screen name="SingleRestaurant" component={SingleRestaurant} />  
          <Stack.Screen name="SingleChat" component={SingleChat} />  
          <Stack.Screen name="FilteredResults" component={FilteredResults} />
          <Stack.Screen name="FullGalery" component={FullGalery} />  
          <Stack.Screen name="Fullmenu" component={Fullmenu} />  
          <Stack.Screen name="Booktable" component={Booktable} />
          <Stack.Screen name="SeatOption" component={SeatOption} />
          <Stack.Screen name="ConfirmReserve" component={ConfirmReserve} />
          <Stack.Screen name="CancelReserve" component={CancelReserve} />
          <Stack.Screen name="CancelMemoji" component={CancelMemoji} />


        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
           <Stack.Screen name="Login">
            {(props) => <Login {...props} setAuthState={setAuthState} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Otp" component={Otp} />
        </>
      )}
    </Stack.Navigator>
  );
}


const App = () => {
  const [authState, setAuthState] = useState<AuthState>('loading');

  const registerFcmToken = async () => {
    try {
      // Request permission first
      const permission = await messaging().requestPermission();
      
      // On iOS, explicitly register for remote messages
      if (Platform.OS === 'ios') {
        try {
          await messaging().registerDeviceForRemoteMessages();
          console.log('✅ Device registered for remote messages');
        } catch (error) {
          console.warn('Device registration for remote messages failed:', error);
        }
      }

      if (
        permission === messaging.AuthorizationStatus.AUTHORIZED ||
        permission === messaging.AuthorizationStatus.PROVISIONAL ||
        Platform.OS === 'android'
      ) {
        // Add a small delay to ensure messaging is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('✅ FCM Token obtained:', fcmToken.substring(0, 20) + '...');
          await registerDeviceToken(fcmToken);
        }
      }
    } catch (error) {
      console.warn('FCM token registration failed:', error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) setAuthState('authenticated');
        else setAuthState('unauthenticated');
      } catch (error) {
        setAuthState('unauthenticated');
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (authState === 'authenticated') {
      // Small delay to ensure Firebase is fully initialized
      const timer = setTimeout(() => {
        registerFcmToken();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [authState]);

  if (authState === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator authState={authState} setAuthState={setAuthState} />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
