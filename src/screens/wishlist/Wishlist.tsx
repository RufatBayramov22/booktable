import { View, Text } from 'react-native'
import React from 'react'
import _styles from './styles';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const Wishlist = () => {
  const styles = _styles;
  return (
    <View style={styles.wishlist}>
      <Text style={styles.wishlistTitle}>Favorites</Text>
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.wishlistCards}>
        <View style={styles.card}>
          <View style={styles.cardImage}>
          <Image source={require('../../assets/images/wishlistCard.png')}/>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>Okamura Bali Japanese Restaurant</Text>
            <View style={styles.cardDetails}>
              <View style={styles.cousins}>
                <Image source={require('../../assets/images/icon/meal.png')} />
                <Text style={styles.cousinTitle}>Japanese • Asian • $$</Text>
              </View>
              <View style={styles.location}>
                <Image source={require('../../assets/images/icon/restLocation.png')} />
                <Text style={styles.locationTitle}>Sunset Boulevard • 5,5km away</Text>
              </View>
            </View>
          </View>
        </View>
             <View style={styles.card}>
          <View style={styles.cardImage}>
          <Image source={require('../../assets/images/wishlistCard.png')}/>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>Okamura Bali Japanese Restaurant</Text>
            <View style={styles.cardDetails}>
              <View style={styles.cousins}>
                <Image source={require('../../assets/images/icon/meal.png')} />
                <Text style={styles.cousinTitle}>Japanese • Asian • $$</Text>
              </View>
              <View style={styles.location}>
                <Image source={require('../../assets/images/icon/restLocation.png')} />
                <Text style={styles.locationTitle}>Sunset Boulevard • 5,5km away</Text>
              </View>
            </View>
          </View>
        </View>
             <View style={styles.card}>
          <View style={styles.cardImage}>
          <Image source={require('../../assets/images/wishlistCard.png')}/>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>Okamura Bali Japanese Restaurant</Text>
            <View style={styles.cardDetails}>
              <View style={styles.cousins}>
                <Image source={require('../../assets/images/icon/meal.png')} />
                <Text style={styles.cousinTitle}>Japanese • Asian • $$</Text>
              </View>
              <View style={styles.location}>
                <Image source={require('../../assets/images/icon/restLocation.png')} />
                <Text style={styles.locationTitle}>Sunset Boulevard • 5,5km away</Text>
              </View>
            </View>
          </View>
        </View>
             <View style={styles.card}>
          <View style={styles.cardImage}>
          <Image source={require('../../assets/images/wishlistCard.png')}/>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>Okamura Bali Japanese Restaurant</Text>
            <View style={styles.cardDetails}>
              <View style={styles.cousins}>
                <Image source={require('../../assets/images/icon/meal.png')} />
                <Text style={styles.cousinTitle}>Japanese • Asian • $$</Text>
              </View>
              <View style={styles.location}>
                <Image source={require('../../assets/images/icon/restLocation.png')} />
                <Text style={styles.locationTitle}>Sunset Boulevard • 5,5km away</Text>
              </View>
            </View>
          </View>
        </View>
             <View style={styles.card}>
          <View style={styles.cardImage}>
          <Image source={require('../../assets/images/wishlistCard.png')}/>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>Okamura Bali Japanese Restaurant</Text>
            <View style={styles.cardDetails}>
              <View style={styles.cousins}>
                <Image source={require('../../assets/images/icon/meal.png')} />
                <Text style={styles.cousinTitle}>Japanese • Asian • $$</Text>
              </View>
              <View style={styles.location}>
                <Image source={require('../../assets/images/icon/restLocation.png')} />
                <Text style={styles.locationTitle}>Sunset Boulevard • 5,5km away</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

export default Wishlist