import { StyleSheet } from "react-native";

export const _style = StyleSheet.create({
fullGalery:{
    marginTop:80,
    display:'flex',
    flexDirection:'column',
    width:"100%",
    paddingHorizontal:16,
    gap:20,
},
fullGaleryHeader:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    width:"56%",
    justifyContent:"space-between"
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
btn:{
    width:'100%',
    backgroundColor:'#2176FF',
    borderRadius:48,
    paddingHorizontal:24,
    paddingVertical:12,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    zIndex:99,
    bottom:100,

},
btnTitle:{
    fontSize:16,
    fontWeight:600,
    lineHeight:24,
    color:"#Fff"
}
})


export default _style;