import { StyleSheet } from "react-native";

export const _style = StyleSheet.create({
fullGalery:{
    display:'flex',
    flexDirection:'column',
    width:"100%",
    paddingHorizontal:16,
    gap:20,
    backgroundColor:'#fff',
    height:'100%',
},
fullGaleryHeader:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    width:"56%",
    justifyContent:"space-between",
    marginTop:80,
},
fullTitle:{
    color:'#000',
    fontSize:18,
    fontWeight:"600",
    lineHeight:26,
},
galeryBody:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:10,
    alignItems:'center',
    justifyContent:'center',
},
fixedBtnWrapper: {
  position: 'absolute',
  bottom: 1,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  paddingVertical: 16,
  paddingHorizontal: 16,
  borderTopWidth: 0.5,
  borderTopColor: '#E0E0E0',
  zIndex: 999,
  elevation: 10, 
},

fixedBtn: {
  backgroundColor: '#2176FF',
  borderRadius: 48,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  bottom: 10,
},

btnTitle:{
    fontSize:16,
    fontWeight:600,
    lineHeight:24,
    color:"#Fff"
}
})


export default _style;