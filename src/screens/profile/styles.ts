import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 58,
    paddingHorizontal: 0,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 18,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 40,
    backgroundColor: '#F2F2F2',
  },
  addIcon: {
    position: 'absolute',
    right: -2,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconImg: {
    width: 18,
    height: 18,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
    marginBottom: 0,
  },
  section: {
    width: '90%',
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 48,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 6,
  },
  menuIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginRight: 14,
  },
  menuText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  arrowIcon: {
    width: 18,
    height: 18,
    tintColor: '#B0B0B0',
  },
});
export default _styles;