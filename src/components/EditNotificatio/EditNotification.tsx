import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
 import styles from './styles';
type Props = {
  visible: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
  onDeleteAll: () => void;
};
const EditNotificationsModal: React.FC<Props> = ({
  visible,
  onClose,
  onMarkAllRead,
  onDeleteAll,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Close button */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Edit notifications</Text>
                <View style={{ width: 24 }} /> 
              </View>

              {/* Options */}
              <View style={styles.optionsBox}>
                <TouchableOpacity style={styles.optionRow} onPress={onMarkAllRead}>
                  <Image
                    source={require('../../assets/images/icon/notificationEmail.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.optionText}>Mark all as read</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionRow} onPress={onDeleteAll}>
                  <Image
                    source={require('../../assets/images/icon/delete.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.optionText}>Delete all</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditNotificationsModal;
