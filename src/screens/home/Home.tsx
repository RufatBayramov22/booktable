import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import _styles from './styles';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const Home = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = ()=>{
    navigation.navigate('Notification');
  }

  const singleRestaurant = ()=>{
    navigation.navigate('SingleRestaurant')
  }



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={styles.location}>
            <Image source={require('../../assets/images/icon/location.png')} />
            <Text style={styles.addressTitle}>Baku, Azerbaijan</Text>
          </View>
          <View style={styles.lang}>
            <Image source={require('../../assets/images/icon/usa.png')} />
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require('../../assets/images/icon/notification.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <View style={styles.searchInp}>
            <TextInput placeholder="Find your favourite restaurants.." />
            <Image
              source={require('../../assets/images/icon/search.png')}
              style={styles.searchIcon}
            />
          </View>
          <View style={styles.filter}>
            <Image source={require('../../assets/images/icon/filter.png')} />
          </View>
        </View>
        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={styles.categorie}>
                <Image source={require('../../assets/images/icon/food.png')} />
                <Text>Azerbaijani</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categorie}>
                <Image source={require('../../assets/images/icon/food.png')} />
                <Text>Azerbaijani</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categorie}>
                <Image source={require('../../assets/images/icon/food.png')} />
                <Text>Azerbaijani</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categorie}>
                <Image source={require('../../assets/images/icon/food.png')} />
                <Text>Azerbaijani</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categorie}>
                <Image source={require('../../assets/images/icon/food.png')} />
                <Text>Azerbaijani</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categorie}>
                <Image source={require('../../assets/images/icon/food.png')} />
                <Text>Azerbaijani</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.restaurants}>
          <TouchableOpacity>
            <View style={styles.restaurantItem}>
              <Text style={styles.restaurantTitle}>Must-Try Places</Text>
              <Image
                source={require('../../assets/images/icon/right.png')}
                style={{width: 20, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {[1, 2, 3].map((_, index) => (
              <TouchableOpacity onPress={singleRestaurant} key={index}>
              <View  style={styles.restaurantCard}>
                <Image
                  source={require('../../assets/images/restaurantcard.png')}
                  resizeMode="cover"
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>
                    Golden Dragon Chinese Bistro
                  </Text>
                  <View style={styles.restType}>
                    <Image
                      source={require('../../assets/images/icon/meal.png')}
                    />
                    <Text style={styles.restTypeText}>
                      Chinese • Japanese • $$
                    </Text>
                  </View>
                  <View style={styles.restType}>
                    <Image
                      source={require('../../assets/images/icon/restLocation.png')}
                    />
                    <Text style={styles.restTypeText}>
                      Sunset Boulevard • 3.2km away
                    </Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
        
            ))}
          </ScrollView>
          <TouchableOpacity>
            <View style={styles.restaurantItem}>
              <Text style={styles.restaurantTitle}>Nearby Restaurants</Text>
              <Image
                source={require('../../assets/images/icon/right.png')}
                style={{width: 20, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.restaurantCard}>
                <Image
                  source={require('../../assets/images/restaurantcard.png')}
                  resizeMode="cover"
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>
                    Golden Dragon Chinese Bistro
                  </Text>
                  <View style={styles.restType}>
                    <Image
                      source={require('../../assets/images/icon/meal.png')}
                    />
                    <Text style={styles.restTypeText}>
                      Chinese • Japanese • $$
                    </Text>
                  </View>
                  <View style={styles.restType}>
                    <Image
                      source={require('../../assets/images/icon/restLocation.png')}
                    />
                    <Text style={styles.restTypeText}>
                      Sunset Boulevard • 3.2km away
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.restaurantCard}>
                <Image
                  source={require('../../assets/images/restaurantcard.png')}
                  resizeMode="cover"
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>
                    Golden Dragon Chinese Bistro
                  </Text>
                  <View style={styles.restType}>
                    <Image
                      source={require('../../assets/images/icon/meal.png')}
                    />
                    <Text style={styles.restTypeText}>
                      Chinese • Japanese • $$
                    </Text>
                  </View>
                  <View style={styles.restType}>
                    <Image
                      source={require('../../assets/images/icon/restLocation.png')}
                    />
                    <Text style={styles.restTypeText}>
                      Sunset Boulevard • 3.2km away
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
