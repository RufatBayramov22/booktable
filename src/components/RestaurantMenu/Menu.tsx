import {View, Text, TouchableOpacity,} from 'react-native';
import React from 'react';
import _styles from './style';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const Menu: React.FC = () => {
  const style = _styles;
const meals = [
  { id: 1, name: 'Ramen Noodles' },
  { id: 2, name: 'Ramen Noodles' },
  { id: 3, name: 'Ramen Noodles' },
  { isMore: true }, 
];

    const navigation = useNavigation();

  return (
    <View style={style.menu}>
      <View style={style.menuHeader}>
        <View style={style.items}>
          <Text style={style.menuTitle}>Menu</Text>
          <Text style={style.number}>(80 items)</Text>
        </View>
        <TouchableOpacity>
          <Text style={style.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
<ScrollView>
  <View style={style.menuBody}>
    {meals.map((meal, index) => {
      if (meal.isMore) {
        return (
          <TouchableOpacity
            key={index}
            style={style.menuItems}
            // onPress={() => navigation.navigate('FullMenu')}
          >
            <Image
              source={require('../../assets/images/menumeal.png')}
              style={{ position: 'relative', opacity: 0.4 }}
            />
            <View style={style.overlay}>
              <Text style={style.plusText}>80+</Text>
            </View>
          </TouchableOpacity>
        );
      }

      return (
        <View key={index} style={style.menuItems}>
          <Image
            source={require('../../assets/images/menumeal.png')}
            style={{ position: 'relative' }}
          />
          <Text style={style.name}>{meal.name}</Text>
        </View>
      );
    })}
  </View>
</ScrollView>
<TouchableOpacity style={style.btn}>
  <Text style={style.btnTitle}>Book a Table</Text>
</TouchableOpacity>
    </View>
  );
};

export default Menu;
