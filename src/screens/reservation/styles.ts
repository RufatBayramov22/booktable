import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  reservations: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 64,
    gap: 24,
    padding: 16,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
    color: '#000',
  },
  reservationCards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 14,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#fcfcff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
    padding: 16,
    width: '100%',
  },
cardInfo:{
    display:'flex',
    flexDirection:'column',
    gap: 6,

},
cardImg:{
objectFit:'cover',

},
cardTitle:{
    fontSize:14,
    fontWeight:'600',
    lineHeight: 20,
    color:'#070707',
},
date:{
    display:'flex',
    flexDirection:'row',
    gap:6,
    alignItems:'center',
},
dateTitle:{
    fontSize:10,
    fontWeight:'400',
    lineHeight: 14,
    color:"#82888E",
},
persons:{
display:'flex',
flexDirection:'row',
gap:6,
alignItems:'center',
},
status:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
place: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
},
statusComp:{
       display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
}
});
export default _styles;
