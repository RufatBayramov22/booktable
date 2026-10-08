import {View, Text, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import _style from './style';
import {Image} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import apiRequest from '../../api/apirequest';

type FullmenuRouteProp = RouteProp<RootStackParamList, 'Fullmenu'>;

type MenuItem = {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  imgUrl?: string;
  imageUrl?: string;
  menuCategoryId?: number;
  menuCategory?: {
    id: number;
    name: string;
  } | null;
};

type MenuCategory = {
  id: number;
  name: string;
};

const getMenuList = (payload: any): MenuItem[] => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const formatPrice = (price?: number): string => {
  if (price === null || price === undefined) return '';
  return `${price} AZN`;
};

const Fullmenu = () => {
  const style = _style;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<FullmenuRouteProp>();
  const {id} = route.params;

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchCategoriesAndInitialMenus = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get(
          `/RestaurantMenus/restaurant/${id}/menus`
        );

        const allMenus = getMenuList(res.data);
        const categoryMap = new Map<number, MenuCategory>();

        allMenus.forEach(item => {
          const catId = item.menuCategoryId || item.menuCategory?.id;
          const catName = item.menuCategory?.name;

          if (catId && !categoryMap.has(catId)) {
            categoryMap.set(catId, {
              id: catId,
              name: catName || `Category ${catId}`,
            });
          }
        });

        const categoryList = Array.from(categoryMap.values());
        setCategories(categoryList);

        if (categoryList.length > 0) {
          setActiveCategoryId(categoryList[0].id);
        } else {
          setMenuItems(allMenus);
          setActiveCategoryId(null);
        }
      } catch (error) {
        setCategories([]);
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndInitialMenus();
  }, [id]);

  useEffect(() => {
    if (!activeCategoryId) {
      return;
    }

    const fetchMenusByCategory = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get(
          `/RestaurantMenus/restaurant/${id}/menus?menuCategoryId=${activeCategoryId}`
        );
        setMenuItems(getMenuList(res.data));
      } catch (error) {
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenusByCategory();
  }, [id, activeCategoryId]);

  return (
    <View style={style.fullMenu}>
      <View style={style.fullMenuHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.fullTitle}>Menu</Text>
      </View>
      <View style={style.container}>
        {categories.length > 0 && (
          <View style={style.tabs}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategoryId(cat.id)}
                style={style.tabButton}>
                <Text
                  style={[
                    style.tabText,
                    activeCategoryId === cat.id && style.activeTabText,
                  ]}>
                  {cat.name}
                </Text>
                {activeCategoryId === cat.id && <View style={style.underline} />}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <ScrollView contentContainerStyle={style.menuList}>
          {loading ? (
            <View style={{paddingVertical: 24, width: '100%', alignItems: 'center'}}>
              <ActivityIndicator size="small" color="#000" />
              <Text style={{marginTop: 8}}>Loading menu...</Text>
            </View>
          ) : menuItems.length > 0 ? (
            menuItems.map(item => (
              <TouchableOpacity key={item.id} style={[style.card]}>
                <View style={style.cardContent}>
                  <View style={{flex: 1}}>
                    <Text style={style.title}>{item.title || 'Food'}</Text>
                    <Text style={style.description} numberOfLines={2} ellipsizeMode="tail">
                      {item.description || 'No description'}
                    </Text>
                    <Text style={style.price}>{formatPrice(item.price)}</Text>
                  </View>
                  <Image
                    source={
                      item.imgUrl || item.imageUrl
                        ? {uri: item.imgUrl || item.imageUrl}
                        : require('../../assets/images/menuImg.png')
                    }
                    style={style.image}
                  />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{textAlign: 'center', marginTop: 20}}>No menu found</Text>
          )}
        </ScrollView>
        <View style={{backgroundColor: '#fff', padding: 16, position: 'absolute', bottom: 0, width: '100%', height: screenHeight * 0.1}}>
      <TouchableOpacity style={style.fixedBtn}>
      <Text style={style.btnTitle}>Book a Table</Text>
    </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Fullmenu;
