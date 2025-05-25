import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FB',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  step: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  stepInfo:{
    marginTop: 100,
  },

  skipContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  skip: {
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 30,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
    lineHeight: 24,
    letterSpacing: -0.32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#2176FF',
    width: 16,
    height: 6,
    borderRadius: 20,
  },
  inactiveDot: {
    backgroundColor: '#99C0FF',
  },
  continueButton: {
    backgroundColor: '#2176FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 48,
    width: 343,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  authButtons: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#2176FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 48,
    width: 343,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 48,
    width: 343,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2176FF',
    color:"#1E6BE8"

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
    loginText: {
        color: '#1E6BE8',
        fontSize: 16,
        fontWeight:'600',

    },
});

export default _styles;
