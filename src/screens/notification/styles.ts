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
   overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
    bottom:0,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 8,
    borderColor: '#A259FF',
    borderWidth: 1,
    borderRadius: 4,
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionBox: {
    width: '100%',
    backgroundColor: '#f4f4fd',
    borderRadius: 16,
    paddingVertical: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  optionText: {
    fontSize: 16,
    color: 'black',
  },

})

export default _styles;