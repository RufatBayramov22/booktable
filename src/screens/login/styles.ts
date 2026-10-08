import { StyleSheet } from "react-native";

export const _styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    color: '#070707',
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 16,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ADB5BD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '400',
    color: '#070707',
    letterSpacing: -0.28,
    lineHeight: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    display: 'flex',
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: '#686D71',
    fontWeight: '600',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#2176FF',
    paddingVertical: 12,
    borderRadius: 48,
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  loginInfo:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:"center",
    width: '100%',
    justifyContent: 'center',
    marginTop: 150,
  },
  checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
checkbox: {
  width: 20,
  height: 20,
  borderWidth: 1,
  borderColor: '#2176FF',
  marginRight: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
checkboxChecked: {
  backgroundColor: '#007AFF',
  borderColor: '#007AFF',
},
checkmark: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},
signUpContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},
signUpText: {
  fontSize: 14,
  color: '#070707',
  fontWeight: '400',
  lineHeight: 20,
  letterSpacing: -0.28,
},
signUpLink: {
  fontSize: 14,
  color: '#2176FF',
  fontWeight: '600',
},
buttonContainer:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginBottom: 30,
}

});

export default _styles;
