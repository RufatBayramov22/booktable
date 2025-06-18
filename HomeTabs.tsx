import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabConfig from './src/navigation/tabs'; 
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator 
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        paddingBottom: 10,
        paddingTop: 10,
        height: 60
      }
    }}
  >
    {tabConfig.map(tab => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? tab.iconActive : tab.icon} style={{ width: 24, height: 24 }} />
          ),
          tabBarLabel: tab.displayName,
        }}
      />
    ))}
  </Tab.Navigator>
);

export default HomeTabs;