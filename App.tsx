import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { RootStackParamList, RouteItem, RoutesStack } from './src/navigation/stack'; 
import HomeTabs from './HomeTabs'; 
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import Onboarding from './src/screens/onboarding/Onboarding';

const Stack = createStackNavigator<RootStackParamList>();

type AuthState = 'unauthenticated' | 'registered' | 'authenticated';

function MainNavigator({ authState }: { authState: AuthState }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState === 'authenticated' ? (
        <>
          <Stack.Screen name="Home" component={HomeTabs} />
          {RoutesStack.map((route: RouteItem) => (
            <Stack.Screen
              key={route.path}
              name={route.path}
              component={route.component}
            />
          ))}
        </>
      ) : authState === 'registered' ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const App = () => {
  // Buna uyğun real auth yoxlanışı backend/token ilə edilə bilər
  const [authState, setAuthState] = useState<AuthState>('unauthenticated');

  return (
    <NavigationContainer>
      <MainNavigator authState={authState} />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
