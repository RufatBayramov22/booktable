import { StyleSheet } from "react-native";

export const _styles = StyleSheet.create({
singleRestaurant:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    gap:16,
    flex:1,
},
slider:{
    width:'100%',
    marginTop:70,
},
sliderImg:{
    width:'100%',
    objectFit:'cover',
    position:'relative'
},
icon:{
    position:'absolute',
    zIndex:9,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    padding:16,
    alignItems:'center'
},
iconFavorite:{
    backgroundColor:"#F7F8F8",
    borderRadius:48,
    width:30,
    height:30,
    padding:6,
},
details:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    paddingHorizontal:16,
    gap:8,

},
restaurantTitle:{
    display:'flex',
    flexDirection:'column',
    gap:6,

},
kitchen:{
    display:'flex',
    flexDirection:"row",
    gap:8,
    alignItems:'center',
    width:'100%'
},
restaurantName:{
    fontSize:18,
    fontWeight:'500',
    lineHeight:26,
    color:'#070707',
},
mealIcon:{
    width:24,
    height:24,
    aspectRatio:1/1,
},
kitchenName:{
    fontSize:14,
    fontWeight:'400',
    color:'#686D71',

},
restaurantInfo:{
    display:'flex',
    flexDirection:"row",
    width:'100%',
    alignItems:"center",
    justifyContent:'space-around',

},
infoTitle:{
    fontSize:16,
    fontWeight:'600',
    lineHeight:24,
    color:'#070707'
},
tabButton: {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderBottomWidth: 4,
  borderBottomColor: 'transparent',
},

activeTabButton: {
  borderBottomColor: '#007bff',
},
activeTabText: {
  fontWeight: 'bold',
},
btnContainer: {
  position: 'relative',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  paddingHorizontal: 16,
  paddingVertical: 5,
  zIndex: 99,
},

btn: {
  width: '100%',
  backgroundColor: '#2176FF',
  borderRadius: 48,
  paddingHorizontal: 24,
  marginBottom:20,
  paddingVertical: 12,
  alignItems: 'center',
  justifyContent: 'center',
},

btnTitle: {
  fontSize: 16,
  fontWeight: '600',
  lineHeight: 24,
  color: '#fff',
},

}) 

export default _styles