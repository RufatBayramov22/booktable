import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import _styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';
import {ScrollView as GHScrollView} from 'react-native-gesture-handler';
import Language from '../../components/LanguageModal/Language';
import FilterModal from '../../components/FilterModal/FilterModal';
import CategoryKitchen from '../../components/CategoryKitchen/CategoryKitchen';
import MustTry from '../../components/MustTryRestaurant/MustTry';

const Home = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const handlePress = () => {
    navigation.navigate('Notification');
  };

  const singleRestaurant = () => {
    navigation.navigate('SingleRestaurant');
  };

  const handleLanguage = () => {
    setLanguageModalVisible(true);
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
            <TouchableOpacity onPress={handleLanguage}>
              <Image source={require('../../assets/images/icon/usa.png')} />
            </TouchableOpacity>
            <Language
              visible={isLanguageModalVisible}
              selected={selectedLanguage}
              onSelect={lang => {
                setSelectedLanguage(lang);
                setLanguageModalVisible(false);
              }}
              onClose={() => setLanguageModalVisible(false)}
            />
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
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setFilterModalVisible(true)}>
            <Image source={require('../../assets/images/icon/filter.png')} />
          </TouchableOpacity>
          <FilterModal
            visible={isFilterModalVisible}
            onClose={() => setFilterModalVisible(false)}
          />
        </View>
      <CategoryKitchen   />
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
            <MustTry/>      
            <TouchableOpacity >
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
