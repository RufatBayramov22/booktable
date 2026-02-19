import {StyleSheet} from 'react-native';

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#F5F5F5',
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    flexDirection: 'column',
  },
  resendLink: {
    color: '#007AFF',
  },
  timer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  verifyButton: {
    backgroundColor: '#77A8FF',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  goBackButton: {
    position: 'absolute',
    top: 80,
    left: 24,
    zIndex: 10,
  },
});

export default _styles;
