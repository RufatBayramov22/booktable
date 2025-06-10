import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    fontSize: 22,
    color: '#000',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    lineHeight:24,
    
  },
  optionsBox: {
    backgroundColor: '#F4F4FD',
    borderRadius: 16,
    paddingVertical: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
    fontWeight:'400'
  },
});

export default styles;