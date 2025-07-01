import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bookTable: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 16,
    gap: 26,
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    paddingTop:20,
  },
  booktableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '66%',
    justifyContent: 'space-between',
    marginTop: 80,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  bookTitle: {
    color: '#070707',
    fontSize: 18,
    fontWeight: '600',
  },
  guestTitle: {
    color: '#070707',
    fontSize: 18,
    fontWeight: '600',
  },
  bookGuests: {
    display: 'flex',
    flexDirection: 'column',
    gap:16,
    marginTop: 26,
  },
  guestCount: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  minus: {
    display: 'flex',
    padding: 8,
    backgroundColor: '#F4F4FB',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4FB',
    paddingHorizontal:12,
    paddingVertical:8,
    width:114,
    textAlign:'center',
    borderRadius: 50,
    fontSize:18,
    fontWeight:'500',
    color:'#000'
    
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

});

export default styles;
