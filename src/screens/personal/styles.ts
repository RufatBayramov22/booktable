import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
header:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    // justifyContent:'space-between',
    width:'100%',
    marginTop:60,

},
headline:{
    textAlign:'center',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'86%',
    fontSize:18,
    lineHeight:26,
    color:'rgba(7, 7, 7, 1)'
},
container:{
    flex:1,
    display:'flex',
    marginLeft:10,
    marginRight:10,

    flexDirection:'column',
    gap:'30',
},
body:{
    display:'flex',
    flexDirection:'column',
    gap:'20'
},
personalInfo:{
    display:'flex',
    flexDirection:'column',
    gap:20,
},
infoBox:{
    display:'flex',
    flexDirection:"row",
    paddingHorizontal:8,
    paddingVertical:12,
    gap:6,
    borderBottomColor:'gray',
    borderBottomWidth:0.3,
    alignItems:'center',
},
name:{
    fontSize:14,
    lineHeight:20,
    color:'rgba(7, 7, 7, 1)',
}
})

export default styles;