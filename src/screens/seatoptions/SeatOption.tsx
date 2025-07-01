import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';

const SeatOption: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const style = styles;
  const [selected, setSelected] = useState<string>('Terrace');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const renderCard = (
    title: string,
    availability: string,
    imageSource: any,
  ) => {
    const isSelected = selected === title;



    return (
      <TouchableOpacity
        onPress={() => setSelected(title)}
        style={[style.card, isSelected && style.selectedCard]}>
        <Image source={imageSource} style={style.cardImage} />
        <View style={style.cardTextWrapper}>
          <Text style={style.cardText}>
            {title} • {availability}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
const handleReserve = () => {
  setModalVisible(false);
  setTimeout(() => {
    navigation.navigate('ConfirmReserve');
  }, 300);
};

  

  return (
    <View style={style.seatOption}>
      {/* Header */}
      <View style={style.seatHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={style.seatTitle}>Seat Option</Text>
      </View>
      <View style={style.seatCard}>
        {renderCard(
          'Terrace',
          'Available',
          require('../../assets/images/terrace.png'),
        )}
        {renderCard(
          'Indoor',
          'Full',
          require('../../assets/images/terrace.png'),
        )}
        {renderCard(
          'Private Rooms',
          'Full',
          require('../../assets/images/terrace.png'),
        )}
      </View>
      {/* Cards */}

      <View style={style.bookButtonContainer}>
        <TouchableOpacity style={style.bookButton} onPress={openModal}>
          <Text style={style.bookText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Close Handle */}
              <Pressable onPress={closeModal} style={styles.modalCloseBar}>
                <View style={styles.modalBar} />
              </Pressable>

              {/* Modal Content */}
              <Text style={styles.modalTitle}>
                Golden Dragon Chinese Bistro
              </Text>
              <View style={style.rowInfo}>
                <View style={styles.row}>
                  <Text style={styles.icon}>👤</Text>
                  <Text style={styles.text}>2</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.icon}>📅</Text>
                  <Text style={styles.text}>Tuesday, May 15</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.icon}>🕘</Text>
                  <Text style={styles.text}>09:00 PM</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.icon}>🪑</Text>
                  <Text style={styles.text}>Terrace</Text>
                </View>
              </View>

              <Text style={styles.description}>
                We offer a 30-minute grace period. If you're running late,
                please give us a call. We may contact you regarding your
                reservation, so make sure your contact details are up to date.
              </Text>

              <Text style={styles.preferenceTitle}>
                Do you have any preferences?
              </Text>
              <View style={styles.preferenceContainer}>
                {[
                  'Birthday',
                  'Anniversary',
                  'Table Decoration',
                  'Pet-Friendly Area',
                  'Non-smoking area',
                ].map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.preferenceButton,
                      item === 'Birthday' && styles.preferenceButtonActive,
                    ]}>
                    <Text
                      style={[
                        styles.preferenceText,
                        item === 'Birthday' && styles.preferenceTextActive,
                      ]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>

              <TextInput
                style={styles.noteInput}
                placeholder="Type your note here..."
                placeholderTextColor="#aaa"
                multiline
              />

              <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
                <Text style={styles.reserveButtonText}>Reserve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SeatOption;
