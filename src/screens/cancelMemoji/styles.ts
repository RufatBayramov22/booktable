import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    position: 'relative',
  },
  cancelInfoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelInfo: {
    alignItems: 'center',
    gap: 12,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 12,
  },
  cancelCaption: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
  link: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    lineHeight: 24,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#2476FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width:'100%',
    borderRadius:48,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
