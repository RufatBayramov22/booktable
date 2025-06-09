import { StyleSheet } from "react-native";


const _styles = StyleSheet.create({
    notification:{
        display:'flex',
        flexDirection:"column",
        width:'100%',
        paddingHorizontal:16,
        gap:16,
        backgroundColor:"#fff",
        height:"100%"
    },
    notificationHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
        marginTop:  70,
    },
    notificationTitle:{
        fontSize:18,
        fontWeight:600,
        lineHeight:26,
        color:"#070707"
    },
    editTitle:{
        fontSize:16,
        fontWeight:'400',
        lineHeight:24,
        letterSpacing:-0.32,
        color:'#070707'
    },
    notificationBody:{
        display:'flex',
        flexDirection:'column',
        gap:12,
        width:'100%'
    },
    notificationBox:{
        backgroundColor:'#F4F4FB',
        borderRadius:8,
        paddingHorizontal:8,
        display:'flex',
        flexDirection:'row',
        gap:8,
        width:'100%',
        paddingVertical:12,
    },
    mealIcon:{
        padding:8,
    },
    icon:{
        width:24,
        height:24,
    },
    boxInfo:{
        display:'flex',
        flexDirection:'column',
        gap:6,
    },
    message:{
        fontSize:12,
        fontWeight:400,
        lineHeight:16,
        color:'#070707',
    },
    date:{
        fontSize:10,
        fontWeight:'400',
        lineHeight:14,
        color:'#2176FF',
        marginLeft:10,
    },
  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
   
  },
  bottomModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },

})

export default _styles;