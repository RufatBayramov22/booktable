import {StyleSheet} from 'react-native';

export const _styles = StyleSheet.create({
  aboutRestaurant: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 16,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.28,
    color: '#4E5155',
  },
  dialog: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  call: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: 164,
    borderRadius: 48,
    borderWidth: 0.5,
    borderColor: '#070707',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openingHours: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 10,
  },
  openTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#070707',
  },
  hours: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 8,
  },
  day: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  weekDay: {
    fontSize: 14,
    fontWeight: '400',
    color: '#3D3F42',
    letterSpacing: -0.28,
  },
  hour: {
    fontSize: 14,
    fontWeight: '400',
    color: '#3D3F42',
    letterSpacing: -0.28,
  },
});

export default _styles;
