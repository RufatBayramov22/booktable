import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // status bar üçün
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    transform: [{ rotate: '180deg' }],
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  contactInfo: {
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: '#000',
  },
  callButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F4F4FB',
  },
  callIcon: {
    width: 20,
    height: 20,
  },
    messagesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginVertical: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
  },
  incoming: {
    backgroundColor: '#f2f2f2',
    alignSelf: 'flex-start',
  },
  outgoing: {
    backgroundColor: '#eef5ff',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom:50,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007aff',
    borderRadius: 25,
    padding: 10,
  },
  sendIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
  },
  callBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 12,
  },



  messageRow: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginBottom: 12,
},

messageAvatar: {
  width: 32,
  height: 32,
  borderRadius: 16,
  marginHorizontal: 6,
},

inputWrapper: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  borderRadius: 25,
  paddingHorizontal: 12,
  paddingVertical: Platform.OS === 'ios' ? 12 : 8,
},

inlineSendButton: {
  marginLeft: 8,
  backgroundColor: '#007aff',
  borderRadius: 20,
},
callMessageWrapper: {
  alignSelf: 'flex-start',
  backgroundColor: '#F4F4FB',
  paddingVertical: 12,
  paddingHorizontal:8,
  borderRadius: 8,
},

callIconBox: {
  width: 28,
  height: 28,
  marginRight: 12,
  tintColor: '#000',
},

callTextWrapper: {
  display:'flex',

},

callImg:{
display:'flex',
alignItems:'center',
justifyContent:'center',
backgroundColor:'#fff',
paddingHorizontal:10,
paddingVertical:8,
borderRadius:48,
},

callText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#000',
},

callDuration: {
  fontSize: 12,
  color: '#666',
  marginTop: 2,
},

callTimeText: {
  fontSize: 11,
  color: '#999',
  marginTop: 4,
  textAlign: 'right',
},

});
