import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import styles from './privacyStyles';

const PrivacyPolicy = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Terms and Conditions Section */}
        <Text style={styles.sectionTitle}>Terms and Conditions</Text>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>1. General Information</Text>
          <Text style={styles.itemText}>
            This app allows users to browse restaurants and reserve tables in advance. By using the app, you
            agree to abide by these terms and conditions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>2. Account Registration</Text>
          <Text style={styles.itemText}>
            Users are required to register with accurate and up-to-date information. You are responsible for keeping
            your login credentials secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>3. Reservations</Text>
          <Text style={styles.itemText}>
            You can make reservations at available times. Please ensure you arrive on time. If you're unable to attend,
            we recommend cancelling the reservation to free up space for others.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>4. Proper Use</Text>
          <Text style={styles.itemText}>
            The app is intended for personal, non-commercial use only. Any misuse, spamming, or unauthorized
            activities may result in account suspension.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>5. Availability and Changes</Text>
          <Text style={styles.itemText}>
            Restaurant availability is managed by the restaurant itself. The app reserves the right to update or modify
            these terms at any time. Changes will be posted within the app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>6. Governing Law</Text>
          <Text style={styles.itemText}>
            These terms are governed by the applicable laws of the Republic of Azerbaijan (or your applicable
            country).
          </Text>
        </View>

        {/* Privacy Policy Section */}
        <Text style={[styles.sectionTitle, styles.privacySectionTitle]}>
          Privacy Policy
        </Text>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>1. Information We Collect</Text>
          <Text style={styles.itemText}>
            We collect limited user data such as name, email, and phone number necessary for account creation and reservation management. We also collect device identifiers for push notifications and analytics.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>2. How We Use Your Information</Text>
          <Text style={styles.itemText}>
            Your information is used to provide services, send reservation confirmations, notifications, and improve the app experience. We do not share your personal information with third parties without your consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>3. Data Security</Text>
          <Text style={styles.itemText}>
            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>4. Cookies and Tracking</Text>
          <Text style={styles.itemText}>
            The app uses cookies and local storage to enhance user experience. You can manage these preferences in your device settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>5. Your Rights</Text>
          <Text style={styles.itemText}>
            You have the right to access, update, or delete your personal information. Contact us at support@app.com for any data-related requests.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemNumber}>6. Changes to Privacy Policy</Text>
          <Text style={styles.itemText}>
            We may update this privacy policy periodically. Changes will be effective immediately upon posting to the app.
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
