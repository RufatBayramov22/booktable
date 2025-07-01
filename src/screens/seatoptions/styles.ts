import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  seatOption: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 16,
    gap: 26,
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  },
  seatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '64%',
    justifyContent: 'space-between',
    marginTop: 80,
    backgroundColor: '#fff',
  },
  seatTitle: {
    color: '#070707',
    fontSize: 18,
    fontWeight: '600',
  },
card: {
  borderRadius: 12,
  backgroundColor: '#fff',
  overflow: 'hidden',

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,

  // Android shadow
  elevation: 5,
},

selectedCard: {
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 8,
  backgroundColor: '#f0f8ff', 
},

  cardImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardTextWrapper: {
    padding: 8,
    borderTopWidth: 0.5,
    borderColor: '#E5E5E5',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bookButtonContainer: {
  position: 'absolute',
  bottom: 30,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: '#fff',
},

bookButton: {
  backgroundColor: '#2176FF',
  paddingVertical: 16,
  borderRadius: 48,
  alignItems: 'center',
  justifyContent: 'center',
},

bookText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
seatCard:{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,

},
 modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '90%',
  },
  modalCloseBar: {
    alignItems: 'center',
    marginBottom: 12,
    gap:10,

  },
  modalBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  icon: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#777',
    marginVertical: 16,
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  preferenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  preferenceButton: {
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  preferenceButtonActive: {
    backgroundColor: '#2979ff',
  },
  preferenceText: {
    color: '#000',
    fontSize: 14,
    fontWeight:'400',
  },
  preferenceTextActive: {
    color: '#fff',
  },
  noteInput: {
    backgroundColor: '#F4F4FB',
    borderRadius: 12,
    padding: 12,
    minHeight: 144,
    textAlignVertical: 'top',
    marginBottom: 16,
    borderWidth:0.3,
    borderColor:'#4D91FF'
  },
  reserveButton: {
    backgroundColor: '#2979ff',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    bottom:5,
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  rowInfo:{
    display:'flex',
    flexDirection:'column',
    gap:10,
  }
});

export default styles;
