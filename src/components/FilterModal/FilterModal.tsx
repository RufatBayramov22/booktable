import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import styles from './styles';
import apiRequest from '../../api/apirequest';
import { Image } from 'react-native';

export interface FilterValues {
  cuisine: string | null;
  cuisineTypeId?: number;
  latitude?: number;
  longitude?: number;
  radiusInKm?: number;
  price: string | null;
  seating: string | null;
  features: string[];
  nearMe: boolean;
}

interface CuisineType {
  id: number;
  name: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  value: FilterValues;
  onApply: (value: FilterValues) => void;
  onReset: () => void;
}

const FilterModal: React.FC<Props> = ({ visible, onClose, value, onApply, onReset }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(
    value.cuisine,
  );
  const [selectedCuisineId, setSelectedCuisineId] = useState<number | null>(
    value.cuisineTypeId ?? null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(value.price);
  const [selectedSeating, setSelectedSeating] = useState<string | null>(
    value.seating,
  );
  const [features, setFeatures] = useState<string[]>(value.features);
  const [nearMe, setNearMe] = useState<boolean>(value.nearMe);
  const [cuisineTypes, setCuisineTypes] = useState<CuisineType[]>([]);

  useEffect(() => {
    const fetchCuisineTypes = async () => {
      try {
        const res = await apiRequest.get('/CuisineTypes/get-all');
        const raw = res.data?.data ?? res.data;
        const dataArray = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [] as unknown[];

        const items = dataArray
          .map((item: unknown) => {
            if (typeof item === 'object' && item !== null && 'id' in item && 'name' in item) {
              return {
                id: Number((item as any).id),
                name: String((item as any).name),
              };
            }
            return null;
          })
          .filter((item: CuisineType | null): item is CuisineType => item !== null);

        if (items.length) {
          setCuisineTypes(items);
        }
      } catch (error) {
        console.error('CuisineTypes yüklənmədi:', error);
      }
    };

    if (visible) {
      fetchCuisineTypes();
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setSelectedCuisine(value.cuisine);
      setSelectedCuisineId(value.cuisineTypeId ?? null);
      setSelectedPrice(value.price);
      setSelectedSeating(value.seating);
      setFeatures(value.features);
      setNearMe(value.nearMe);
    }
  }, [visible, value]);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleApply = () => {
    onApply({
      cuisine: selectedCuisine,
      cuisineTypeId: selectedCuisineId ?? undefined,
      price: selectedPrice,
      seating: selectedSeating,
      features,
      nearMe,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedCuisine(null);
    setSelectedCuisineId(null);
    setSelectedPrice(null);
    setSelectedSeating(null);
    setFeatures([]);
    setNearMe(false);
    onReset();
    onClose();
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
              {cuisineTypes.map((item) => (
                <Pressable
                  key={item.id}
                  style={[
                    styles.option,
                    selectedCuisineId === item.id && styles.selectedOption,
                  ]}
                  onPress={() => {
                    const isSelected = selectedCuisineId === item.id;
                    setSelectedCuisineId(isSelected ? null : item.id);
                    setSelectedCuisine(isSelected ? null : item.name);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCuisineId === item.id && styles.selectedOptionText,
                    ]}
                  >
                    {item.name}
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
                  onPress={() =>
                    setSelectedPrice(prev => (prev === price ? null : price))
                  }
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
                  onPress={() =>
                    setSelectedSeating(prev => (prev === seat ? null : seat))
                  }
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
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
