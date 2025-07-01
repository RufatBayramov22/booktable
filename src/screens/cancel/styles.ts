import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cancelReservation:{
        width:'100%',
        display:'flex',
        paddingHorizontal:16,
        backgroundColor:"#fff",
        height:'100%',
        justifyContent:'space-between'
    },
    cancelHeader:{
        marginTop:80,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'72%',
        marginBottom:20,
    },
    headerTitle:{
        fontSize:18,
        fontWeight:'600',
        color:'#070707',
        lineHeight:26,
    },
      cancelContent: {
 
  },
  cancelTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 24,
    color:'#070707',
  },
  cancelList: {
    gap: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  cancelText: {
    fontSize: 15,
    color: '#333',
  },
  cancelContainer:{
    display:'flex',
    flexDirection: 'column',
    gap:14,
  },
    noteInput: {
    backgroundColor: '#F4F4FB',
    borderRadius: 12,
    padding: 12,
    minHeight: 144,
    textAlignVertical: 'top',
    marginBottom: 16,
    borderWidth:0.3,
    borderColor:'#4D91FF',
    marginTop:20,
  },
  cancelBtnContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    width:'100%',
    marginBottom:60,
    backgroundColor:"#2176FF",
    paddingVertical:12,
    paddingHorizontal:24,
    borderRadius:48,
    minHeight:48,
    alignItems:'center',
},
  cancelBtnText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'600',
  }
})

export default styles;