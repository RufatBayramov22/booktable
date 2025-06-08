import { StyleSheet } from "react-native";

const _styles = StyleSheet.create({
chatSection:{
    display:'flex',
    alignItems:"center",
    backgroundColor:'#fff',
    height:'100%',
    paddingHorizontal:16,
    flexDirection:'column',
    gap:12,
},
chatTitle:{
    marginTop:80,
    textAlign:'center',
    color:"#000",
    fontSize:18,
    fontWeight:'600',
    lineHeight:26,

},
searchBar:{
   display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:8,
    width:'100%'
},
  searchInp: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#F4F4FB',
    borderRadius: 8,
    height: 48,
    padding:12,
    gap: 10,
    width:'100%',


  },
  searchIcon: {
    width: 16,
    height: 16,
  },
    chatComp: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        width:"100%"
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width:'100%',
  },
  chatImg: {
    width: 54,
    height: 54,
    borderRadius: 54,
    marginRight: 12,
  },
  messageInfo: {
   display:'flex',
   flexDirection:'column',
   gap:4,
   marginRight:30,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#070707',
    lineHeight:20,
  },
  message: {
    fontSize: 12,
    color: '#686d71',
    lineHeight:16,
    fontWeight:"400",
  },
  time:{
    marginBottom:40,
  },
  messageTime: {
    fontSize: 10,
    color: '#686d71',
  },
})

export default _styles;