import {StyleSheet} from 'react-native';

const _styles = StyleSheet.create({
  wishlist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#fff',
  },
  wishlistTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#070707',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 80,
  },
  wishlistCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    alignSelf: 'stretch',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#070707',
    lineHeight: 24,
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  cousins: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  cousinTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8A9197',
    lineHeight: 20,
    letterSpacing: -0.28,
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8A9197',
    lineHeight: 20,
    letterSpacing: -0.28,
  },
});

export default _styles;
