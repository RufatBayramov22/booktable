import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import styles from './styles';
import { Image } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<Props> = ({ visible, onClose }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('Japanese');
  const [selectedPrice, setSelectedPrice] = useState<string>('$');
  const [selectedSeating, setSelectedSeating] = useState<string>('Indoor');
  const [features, setFeatures] = useState<string[]>(['Live Music']);
  const [nearMe, setNearMe] = useState<boolean>(false);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <Modal style={styles.modal} visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/images/icon/cancel.png')} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {/* Cuisine Type */}
            <Text style={styles.sectionTitle}>Cuisine type</Text>
            <View style={styles.grid}>
              {[
                'Japanese',
                'Mediterranean',
                'Azerbaijani',
                'Chinese',
                'Middle Eastern',
                'Seafood',
                'World Cuisine',
                'Korean',
                'Asian',
              ].map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.option,
                    selectedCuisine === item && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedCuisine(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCuisine === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Location */}
            <Text style={styles.sectionTitle}>Location</Text>
            <Pressable
              style={styles.checkboxRow}
              onPress={() => setNearMe(!nearMe)}
            >
              <View style={[styles.checkbox, nearMe && styles.checkedBox]} />
              <Text style={styles.checkboxLabel}>Near me</Text>
            </Pressable>

            {/* Price Range */}
            <Text style={styles.sectionTitle}>Price range</Text>
            <View style={styles.grid}>
              {['$', '$$', '$$$', '$$$$'].map((price) => (
                <Pressable
                  key={price}
                  style={[
                    styles.option,
                    selectedPrice === price && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedPrice(price)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedPrice === price && styles.selectedOptionText,
                    ]}
                  >
                    {price}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Seating Type */}
            <Text style={styles.sectionTitle}>Seating type</Text>
            <View style={styles.grid}>
              {[
                'Indoor',
                'Terrace',
                'Private rooms',
                'Bar Area',
                'Pet-Friendly Area',
                'Rooftop',
                'Smoking Area',
                'Non-Smoking Area',
              ].map((seat) => (
                <Pressable
                  key={seat}
                  style={[
                    styles.option,
                    selectedSeating === seat && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedSeating(seat)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedSeating === seat && styles.selectedOptionText,
                    ]}
                  >
                    {seat}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Special Features</Text>
            <View style={styles.grid}>
              {[
                'Live Music',
                'Parking Spot',
                'Pet Friendly',
                'Wheelchair Accessible',
              ].map((feature) => (
                <Pressable
                  key={feature}
                  style={styles.checkboxRow}
                  onPress={() => toggleFeature(feature)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      features.includes(feature) && styles.checkedBox,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>{feature}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
