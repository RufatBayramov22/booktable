import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import _style from './style';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';

const Fullmenu = () => {
  const style = _style;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const menuData = {
    Meals: [
      {
        id: 1,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 2,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 3,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 4,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 5,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 6,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 7,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 8,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
    ],
    Beverages: [
      {
        id: 1,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 2,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 3,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 4,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 5,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 6,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 7,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 8,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
    ],
    Desserts: [
      {
        id: 1,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 2,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 3,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 4,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 5,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 6,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 7,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
      {
        id: 8,
        title: 'Teriyaki Chicken',
        description:
          'Grilled chicken, teriyaki sauce, sesame seeds, steamed rice',
        price: '$8.00',
        image: require('../../assets/images/menuImg.png'),
      },
    ],
  };

  const screenHeight = Dimensions.get('window').height;


  const categories = ['Meals', 'Beverages', 'Desserts'] as const;
  type Category = (typeof categories)[number];

  const [activeCategory, setActiveCategory] = useState<Category>('Meals');
  return (
    <View style={style.fullMenu}>
      <View style={style.fullMenuHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.fullTitle}>Menu</Text>
      </View>
      <View style={style.container}>
        <View style={style.tabs}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={style.tabButton}>
              <Text
                style={[
                  style.tabText,
                  activeCategory === cat && style.activeTabText,
                ]}>
                {cat}
              </Text>
              {activeCategory === cat && <View style={style.underline} />}
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView contentContainerStyle={style.menuList}>
          {menuData[activeCategory].map(item => (
            <TouchableOpacity key={item.id} style={[style.card]}>
              <View style={style.cardContent}>
                <View style={{flex: 1}}>
                  <Text style={style.title}>{item.title}</Text>
                  <Text style={style.description}>{item.description}</Text>
                  <Text style={style.price}>{item.price}</Text>
                </View>
                <Image source={item.image} style={style.image} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{backgroundColor: '#fff', padding: 16, position: 'absolute', bottom: 0, width: '100%', height: screenHeight * 0.1}}>
      <TouchableOpacity style={style.fixedBtn}>
      <Text style={style.btnTitle}>Book a Table</Text>
    </TouchableOpacity>
        </View
      </View>
    </View>
  );
};

export default Fullmenu;
