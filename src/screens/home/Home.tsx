import {View, Text, TouchableOpacity, TextInput, Image, Animated} from 'react-native';
import React, {useRef} from 'react';
import _styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import {ScrollView as GHScrollView} from 'react-native-gesture-handler';

const Home = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    navigation.navigate('Notification');
  };

  const singleRestaurant = () => {
    navigation.navigate('SingleRestaurant');
  };

  const renderStickyHeader = () => (
    <Animated.View
      style={{
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, 20],
              outputRange: [0, -5],
              extrapolate: 'clamp',
            }),
          },
        ],
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: scrollY.interpolate({
          inputRange: [0, 20],
          outputRange: [0, 0.1],
          extrapolate: 'clamp',
        }),
        shadowRadius: 4,
        elevation: 4,
        zIndex: 10,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 15,
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}>
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
          <GHScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(6)].map((_, i) => (
              <TouchableOpacity key={i}>
                <View style={styles.categorie}>
                  <Image
                    source={require('../../assets/images/icon/food.png')}
                  />
                  <Text>Azerbaijani</Text>
                </View>
              </TouchableOpacity>
            ))}
          </GHScrollView>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderStickyHeader()}

      <Animated.ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View style={[styles.home, {paddingTop: 16}]}>
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

            <GHScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              {[1, 2, 3].map((_, index) => (
                <TouchableOpacity onPress={singleRestaurant} key={index}>
                  <View style={styles.restaurantCard}>
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
            </GHScrollView>

            <TouchableOpacity>
              <View style={styles.restaurantItem}>
                <Text style={styles.restaurantTitle}>Nearby Restaurants</Text>
                <Image
                  source={require('../../assets/images/icon/right.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity>

            <GHScrollView
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
            </GHScrollView>
                 <TouchableOpacity>
              <View style={styles.restaurantItem}>
                <Text style={styles.restaurantTitle}>Nearby Restaurants</Text>
                <Image
                  source={require('../../assets/images/icon/right.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity>

            <GHScrollView
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
            </GHScrollView>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
