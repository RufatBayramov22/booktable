import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabList = ['About', 'Menu', 'Gallery'];

  return (
    <View style={styles.tabContainer}>
      {tabList.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={[
            styles.tabButton,
            activeTab === tab && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#444',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});
