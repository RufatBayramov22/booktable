import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';

interface Props {
  visible: boolean;
  selected: string;
  onSelect: (lang: string) => void;
  onClose: () => void;
}

const Language: React.FC<Props> = ({ visible, selected, onSelect, onClose }) => {
  const languages = [
    { label: 'Azərbaycan dili', value: 'az' },
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.handle} />
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>Language</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.value}
              style={styles.radioItem}
              onPress={() => onSelect(lang.value)}
            >
              <Text style={styles.radioLabel}>{lang.label}</Text>
              <View style={styles.radioCircle}>
                {selected === lang.value && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  radioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});

export default Language;
