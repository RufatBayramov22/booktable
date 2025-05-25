import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabConfig from './src/navigation/tabs'; // Tab konfiqurasiyasını import edin
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
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