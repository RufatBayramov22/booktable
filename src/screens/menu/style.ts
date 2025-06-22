import { StyleSheet } from "react-native";

export const _styles = StyleSheet.create({
  fullMenu: {
    flex: 1,
    flexDirection: 'column',
    width: "100%",
    paddingHorizontal: 16,
    gap: 20,
    backgroundColor: '#fff',
    height:"100%",
  },

  fullMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "56%",
    justifyContent: "space-between",
    marginTop: 80,

  },

  fullTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  tabButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  tabText: {
    fontSize: 16,
    color: '#444',
  },

  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },

  underline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#2176FF',
    width: '100%',
  },

  menuList: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100, 
  },

  card: {
    backgroundColor: '#FCFCFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius:2,

  },


  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginLeft: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    color: '#4E5155',
    marginBottom:12,
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },
btnContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  paddingHorizontal: 16,
  paddingVertical: 24,
  zIndex: 99,
},

btn: {
  width: '100%',
  backgroundColor: '#2176FF',
  borderRadius: 48,
  paddingHorizontal: 24,
  paddingVertical: 12,
  alignItems: 'center',
  justifyContent: 'center',
},

btnTitle: {
  fontSize: 16,
  fontWeight: '600',
  lineHeight: 24,
  color: '#fff',
},

});

export default _styles;
