import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  menu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  menuHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    color: '#070707',
  },
  number: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#8A9197',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#8A9197',
  },

  menuBody: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  name: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 14,
    fontWeight: 500,
    color: '#fff',
  },
  menuItems:{
    display:'flex'
  },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',
  borderRadius: 8,
},

plusText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '400',
},

btn:{
    width:'100%',
    // backgroundColor:'#2176FF',
    borderRadius:48,
    paddingHorizontal:24,
    paddingVertical:12,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
},
btnTitle:{
    fontSize:16,
    fontWeight:600,
    lineHeight:24,
    color:"#Fff"
}

});

export default _styles;
