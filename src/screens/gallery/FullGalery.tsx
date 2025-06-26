import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import _style from './style';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stack';

const FullGalery: React.FC = () => {
  const style = _style;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={{flex: 1}}>
      <View style={style.fullGalery}>
        <View style={style.fullGaleryHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icon/left.png')} />
          </TouchableOpacity>
          <Text style={style.fullTitle}>Gallery</Text>
        </View>

        <ScrollView>
          <View style={style.galeryBody}>
            {[...Array(8)].map((_, i) => (
              <Image
                key={i}
                source={require('../../assets/images/galeryR.png')}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Fixed tabbar-style button */}
      <View style={style.fixedBtnWrapper}>
        <TouchableOpacity style={style.fixedBtn}>
          <Text style={style.btnTitle}>Book a Table</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FullGalery;
