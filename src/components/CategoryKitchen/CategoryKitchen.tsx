import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView as GHScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import _styles from '../../screens/home/styles';

interface Category {
  id: number;
  name: string;
}

const CategoryKitchen = () => {
  const styles = _styles;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://booktables-001-site1.anytempurl.com/api/MenuCategories'
        );
        setCategories(res.data.data); 
      } catch (error) {
        console.error('Kategoriya yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.categories}>
        <Text>Yüklənir...</Text>
      </View>
    );
  }

  return (
    <View style={styles.categories}>
      <GHScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id}>
            <View style={styles.categorie}>
              <Image
                source={require('../../assets/images/icon/food.png')}
              />
              <Text>{cat.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </GHScrollView>
    </View>
  );
};

export default CategoryKitchen;
