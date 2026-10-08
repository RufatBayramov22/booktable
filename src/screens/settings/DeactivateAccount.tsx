import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/stack';
import apiRequest from '../../api/apirequest';
import DeactivationSuccessModal from './DeactivationSuccessModal';
import styles from './deactivateStyles';

const DeactivateAccount = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedReason, setSelectedReason] = useState<string | null>(
    'I no longer use this app',
  );
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const reasons = [
    'I no longer use this app',
    "I couldn't find restaurants I like",
    'The app is difficult to use',
    "I'm taking a break",
    'Other',
  ];

  const handleDeactivate = async () => {
    if (!selectedReason) {
      Alert.alert('Error', 'Please select a reason for deactivation.');
      return;
    }

    Alert.alert(
      'Confirm Deactivation',
      'Are you sure you want to deactivate your account? This action cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Deactivate',
          onPress: async () => {
            await submitDeactivation();
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    // Navigate to login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const submitDeactivation = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('accessToken');

      const payload = {
        reason: selectedReason,
        feedback: feedback.trim() || undefined,
      };

      await apiRequest.post(
        '/Users/deactivate',
        payload,
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : undefined,
      );

      // Clear auth data and redirect to login
      await AsyncStorage.multiRemove([
        'accessToken',
        'refreshToken',
        'userId',
        'userFullName',
        'userEmail',
        'userPhone',
      ]);

      // Show success modal
      setSuccessModalVisible(true);
    } catch (error: any) {
      console.warn('Deactivation error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.Message ||
        error?.message ||
        'Failed to deactivate account. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/icon/left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deactivate Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/profileSec.png')}
            style={styles.avatar}
          />
        </View>

        {/* Reason Section */}
        <Text style={styles.questionText}>
          Please select the reason for cancellation:
        </Text>

        <View style={styles.reasonsContainer}>
          {reasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.radioItem}
              onPress={() => setSelectedReason(reason)}>
              <View
                style={[
                  styles.radioButton,
                  selectedReason === reason && styles.radioButtonSelected,
                ]}>
                {selectedReason === reason && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Section */}
        <TextInput
          style={styles.feedbackInput}
          placeholder="Let us know why you're deactivating..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />

        {/* Deactivate Button */}
        <TouchableOpacity
          style={[styles.deactivateButton, loading && styles.deactivateButtonDisabled]}
          onPress={handleDeactivate}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.deactivateButtonText}>Deactivate</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <DeactivationSuccessModal
        visible={successModalVisible}
        onClose={handleSuccessModalClose}
      />
    </View>
  );
};

export default DeactivateAccount;
