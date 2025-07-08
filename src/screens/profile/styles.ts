import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 80,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  menuContainer: {
    borderRadius: 12,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal:8,
    borderRadius:12,
    backgroundColor: '#F7F8F8',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight:'500',
    lineHeight:20,
    color:'#070707'
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
});

export default styles;
