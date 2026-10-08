import {StyleSheet} from 'react-native';

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'left',
    color: '#070707',
    lineHeight: 30,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    color: '#070707',
  },
  input: {
    height: 48,
    borderColor: '#ADB5BD',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#070707',
  },
  button: {
    backgroundColor: '#2176FF',
    paddingVertical: 12,
    borderRadius: 48,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  registerInfo: {
    marginTop: 65,

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
    gap: 8,
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
});

export default _styles;
