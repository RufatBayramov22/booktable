import { StyleSheet } from 'react-native';

export const _styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    color: '#070707',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 26,
    marginTop: 4,
    marginBottom: 0,
  },
  section: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 48,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8F8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
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
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 20,
    color: '#070707',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  personalInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  personalInfoHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  infoIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    tintColor: '#82888E',
  },
  infoText: {
    fontSize: 16,
    color: '#070707',
    flex: 1,
  },
  editButton: {
    color: '#2176FF',
    fontSize: 15,
  },
});
export default _styles;