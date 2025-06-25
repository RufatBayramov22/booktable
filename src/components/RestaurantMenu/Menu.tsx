import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import _styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Fullmenu'>;

type MealItem = {
  id?: number;
  name?: string;
  isMore?: boolean;
  total?: number;
};

const Menu: React.FC = () => {
  const style = _styles;
  const navigation = useNavigation<NavigationProp>();


  const allMeals: MealItem[] = [
    {id: 1, name: 'Ramen Noodles'},
    {id: 2, name: 'Ramen Noodles'},
    {id: 3, name: 'Ramen Noodles'},

  ];

  


  const meals: MealItem[] = [...allMeals.slice(0, 3), {isMore: true, total: allMeals.length}];

  return (
    <View style={style.menu}>
      {/* Header */}
      <View style={style.menuHeader}>
        <View style={style.items}>
          <Text style={style.menuTitle}>Menu</Text>
          <Text style={style.number}>({allMeals.length} items)</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Fullmenu')}>
          <Text style={style.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView>
        <View style={style.menuBody}>
          {meals.map((meal, index) => {
            if (meal.isMore) {
              return (
                <TouchableOpacity
                  key={`meal-${index}`}
                  style={style.menuItems}
                  onPress={() => navigation.navigate('Fullmenu')}>
                  <Image
                    source={require('../../assets/images/menumeal.png')}
                    style={{position: 'relative', opacity: 0.4}}
                  />
                  <View style={style.overlay}>
                    <Text style={style.plusText}>{meal.total}+</Text>
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <View key={`meal-${index}`} style={style.menuItems}>
                <Image
                  source={require('../../assets/images/icon/Meals.png')}
                  style={{position: 'relative'}}
                />
                <Text style={style.name}>{meal.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Button */}
      <TouchableOpacity style={style.btn}>
        <Text style={style.btnTitle}></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
