import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import _styles from './style';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import axios from 'axios';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Fullmenu'>;
type MenuRouteProp = RouteProp<RootStackParamList, 'SingleRestaurant'>;

type MealItem = {
  id: number;
  name: string;
  imageUrl: string;
};

const Menu: React.FC = () => {
  const style = _styles;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MenuRouteProp>();
  const {id} = route.params;

  const [meals, setMeals] = useState<MealItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(
          `https://booktables-001-site1.anytempurl.com/api/RestaurantMenus/restaurant/${id}/menus`,
        );
        setMeals(res.data.data || []);
      } catch (error) {
        console.error('Menu yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [id]);

  // göstəriləcək 4 menyu
  const displayMeals =
    meals.length > 4
      ? [...meals.slice(0, 3), {id: -1, name: '', imageUrl: '', isMore: true, total: meals.length} as any]
      : meals.slice(0, 4);

  return (
    <View style={style.menu}>
      {/* Header */}
      <View style={style.menuHeader}>
        <View style={style.items}>
          <Text style={style.menuTitle}>Menu</Text>
          <Text style={style.number}>({meals.length} items)</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Fullmenu', {id})}>
          <Text style={style.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={style.menuBody}>
          {displayMeals.map((meal, index) => {
            if ((meal as any).isMore) {
              return (
                <TouchableOpacity
                  key={`meal-${index}`}
                  style={style.menuItems}
                  onPress={() => navigation.navigate('Fullmenu', {id})}>
                  <Image
                    source={{uri: meals[0]?.imageUrl || ''}}
                    style={{position: 'relative', opacity: 0.4, width: 80, height: 80, borderRadius: 10}}
                  />
                  <View style={style.overlay}>
                    <Text style={style.plusText}>{(meal as any).total}+</Text>
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <View key={`meal-${index}`} style={style.menuItems}>
                <Image
                  source={{uri: meal.imageUrl}}
                  style={{position: 'relative', width: 80, height: 80, borderRadius: 10}}
                />
                <Text style={style.name}>{meal.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={style.btn}>
        <Text style={style.btnTitle}></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
