import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import _styles from './style';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import apiRequest from '../../api/apirequest';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Fullmenu'>;
type MenuRouteProp = RouteProp<RootStackParamList, 'SingleRestaurant'>;

type MealItem = {
  id: number;
  name?: string;
  title?: string;
  imageUrl?: string;
  imgUrl?: string;
};

type MoreItem = {
  id: -1;
  isMore: true;
  total: number;
};

const isMoreItem = (item: MealItem | MoreItem): item is MoreItem => {
  return (item as MoreItem).isMore === true;
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
      console.log('Restaurant ID:', id);

      const res = await apiRequest.get(
        `/RestaurantMenus/restaurant/${id}/menus`,
      );

      console.log('Response:', res.data);

      setMeals(res.data.data || []);
    } catch (error: any) {
      console.log('====================');
      console.log('STATUS:', error?.response?.status);
      console.log('DATA:', error?.response?.data);
      console.log('URL:', error?.config?.url);
      console.log('FULL ERROR:', error);
      console.log('====================');
    } finally {
      setLoading(false);
    }
  };

  fetchMeals();
}, [id]);

  // show max 4 tiles, last tile is "+count" when there are more items
  const remainingCount = meals.length > 3 ? meals.length - 3 : 0;
  const displayMeals: Array<MealItem | MoreItem> =
    meals.length > 4
      ? [...meals.slice(0, 3), {id: -1, isMore: true, total: remainingCount}]
      : meals.slice(0, 4);

  const getMealName = (meal: MealItem) => meal.name || meal.title || 'Food';
  const getMealImage = (meal: MealItem) => meal.imageUrl || meal.imgUrl || '';

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
            if (isMoreItem(meal)) {
              return (
                <TouchableOpacity
                  key={`meal-${index}`}
                  style={style.menuItems}
                  onPress={() => navigation.navigate('Fullmenu', {id})}>
                  <Image
                    source={
                      getMealImage(meals[meals.length - 1])
                        ? {uri: getMealImage(meals[meals.length - 1])}
                        : require('../../assets/images/menuImg.png')
                    }
                    style={{position: 'relative', opacity: 0.4, width: 167, height: 164, borderRadius: 10}}
                    resizeMode="cover"
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
                  source={
                    getMealImage(meal)
                      ? {uri: getMealImage(meal)}
                      : require('../../assets/images/menuImg.png')
                  }
                  style={{position: 'relative', width: 167, height: 164, borderRadius: 10}}
                  resizeMode="cover"
                />
                <Text style={style.name} numberOfLines={1} ellipsizeMode="tail">
                  {getMealName(meal)}
                </Text>
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
