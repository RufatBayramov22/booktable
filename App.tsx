import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import tabConfig from './src/navigation/tabs'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const currentTab = tabConfig.find(tab => tab.name === route.name);

        return {
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (!currentTab) return null;
            return (
              <Image
                source={focused ? currentTab.iconActive : currentTab.icon}
                style={styles.icon}
              />
            );
          },
          tabBarLabel: currentTab?.displayName ?? '',
        };
      }}
    >
      {tabConfig.map(tab => (
        <Tab.Screen key={tab.id} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
}

function MainNavigator({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Onboarding" component={require('./src/screens/onboarding/Onboarding').default} />
      )}
    </Stack.Navigator>
  );
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <MainNavigator isAuthenticated={isAuthenticated} />
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default App;
