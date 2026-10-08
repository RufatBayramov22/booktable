import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import styles from './successModalStyles';

interface DeactivationSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const DeactivationSuccessModal: React.FC<DeactivationSuccessModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Loading bar animation placeholder */}
          <View style={styles.loadingBar} />

          {/* Success checkmark */}
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmarkCircle}>
              <Image
                // source={require('../../assets/images/icon/check.png')}
                style={styles.checkmarkIcon}
              />
            </View>
          </View>

          {/* Success message */}
          <Text style={styles.successTitle}>
            Your account has been successfully{'\n'}deactivated
          </Text>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeactivationSuccessModal;
