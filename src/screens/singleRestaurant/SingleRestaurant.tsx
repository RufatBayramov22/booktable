import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import style, {_styles} from './style';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import AboutRestaurant from '../../components/AboutRestaurant/AboutRestaurant';
import Menu from '../../components/RestaurantMenu/Menu';
import Gallery from '../../components/Gallery/Gallery';
import {ScrollView} from 'react-native-gesture-handler';
const SingleRestaurant: React.FC = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<string>('About');

  return (
    <View style={styles.singleRestaurant}>
      <View style={styles.slider}>
        <View style={styles.sliderImg}>
          <Image
            style={{width: '100%'}}
            source={require('../../assets/images/singleRestaurant.png')}
          />
          <View style={style.icon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={style.iconFavorite}
                source={require('../../assets/images/icon/left.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={style.iconFavorite}
                source={require('../../assets/images/icon/favorite.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{flex:1}}>
        <View style={style.details}>
          <View style={style.restaurantTitle}>
            <Text style={style.restaurantName}>
              Golden Dragon Chinese Bistro
            </Text>
            <View style={style.kitchen}>
              <Image
                style={style.mealIcon}
                source={require('../../assets/images/icon/meal.png')}
              />
              <Text style={style.kitchenName}>Chinese • Japanese • $$</Text>
            </View>
          </View>
          <View style={style.restaurantInfo}>
            <TouchableOpacity
              onPress={() => setActiveTab('About')}
              style={[
                style.tabButton,
                activeTab === 'About' && style.activeTabButton,
              ]}>
              <Text
                style={[
                  style.infoTitle,
                  activeTab === 'About' && style.activeTabText,
                ]}>
                About
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('Menu')}
              style={[
                style.tabButton,
                activeTab === 'Menu' && style.activeTabButton,
              ]}>
              <Text
                style={[
                  style.infoTitle,
                  activeTab === 'Menu' && style.activeTabText,
                ]}>
                Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('Gallery')}
              style={[
                style.tabButton,
                activeTab === 'Gallery' && style.activeTabButton,
              ]}>
              <Text
                style={[
                  style.infoTitle,
                  activeTab === 'Gallery' && style.activeTabText,
                ]}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 16, }}>
            {activeTab === 'About' && <AboutRestaurant />}

            {activeTab === 'Menu' && <Menu />}

            {activeTab === 'Gallery' && <Gallery />}
          </View>
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Booktable')}>
          <Text style={styles.btnTitle}>Book a Table</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleRestaurant;
