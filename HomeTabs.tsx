import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabConfig from './src/navigation/tabs'; 
import { Image } from 'react-native';
import {AuthState} from './src/types/AuthState';

const Tab = createBottomTabNavigator();

type HomeTabsProps = {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

const HomeTabs = ({setAuthState}: HomeTabsProps) => (
  <Tab.Navigator
    initialRouteName="homeTab"
    screenOptions={{
      headerShown: false,
      sceneStyle: {backgroundColor: '#fff'},
      tabBarStyle: {backgroundColor: '#fff'},
    }}
  >
    {tabConfig.map(tab => (
      tab.name === 'profileTab' ? (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          children={props => <tab.component {...props} setAuthState={setAuthState} />}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? tab.iconActive : tab.icon}
                style={{ width: 24, height: 24 }}
              />
            ),
            tabBarLabel: tab.displayName,
          }}
        />
      ) : (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component as React.ComponentType<any>}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? tab.iconActive : tab.icon}
                style={{ width: 24, height: 24 }}
              />
            ),
            tabBarLabel: tab.displayName,
          }}
        />
      )
    ))}
  </Tab.Navigator>
);


export default HomeTabs;