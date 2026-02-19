import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import Onboarding from './src/screens/onboarding/Onboarding';
import Otp from './src/screens/otp/Otp';
import HomeTabs from './HomeTabs';
import { RootStackParamList } from './src/navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

import { AuthState } from './src/types/AuthState';
import Personal from './src/screens/personal/Personal';
import SingleRestaurant from './src/screens/singleRestaurant/SingleRestaurant';
import FullGalery from './src/screens/gallery/FullGalery';
import Fullmenu from './src/screens/menu/Fullmenu';

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
          <Stack.Screen name="HomeTabs" component={HomeTabs} />  
          <Stack.Screen name="Personal" component={Personal} />  
          <Stack.Screen name="SingleRestaurant" component={SingleRestaurant} />  
          <Stack.Screen name="FullGalery" component={FullGalery} />  
          <Stack.Screen name="Fullmenu" component={Fullmenu} />  


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

  if (authState === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
  <MainNavigator authState={authState} setAuthState={setAuthState} />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
