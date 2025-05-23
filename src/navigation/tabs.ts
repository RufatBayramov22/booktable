// tabConfig.js
import Home from '../screens/home/Home';
import Reservation from '../screens/reservation/Reservation';
import Wishlist from '../screens/wishlist/Wishlist';
import Profile from '../screens/profile/Profile';
import Chat from '../screens/chat/Chat';

export default [
  {
    id: '1',
    displayName: 'Home',
    name: 'homeTab',
    icon: require('../assets/images/icon/home.png'),
    iconActive: require('../assets/images/icon/activeHome.png'),
    component: Home,
  },
  {
    id: '2',
    displayName: 'Favorites',
    name: 'wishlistTab',
    icon: require('../assets/images/icon/heartIcon.png'),
    iconActive: require('../assets/images/icon/activeHeart.png'),
    component: Wishlist,
  },
  {
    id: '3',
    displayName: 'Reservation',
    name: 'reservationTab',
    icon: require('../assets/images/icon/reservationIcon.png'),
    iconActive: require('../assets/images/icon/activeReserve.png'),
    component: Reservation,
  },
  {
    id: '4',
    displayName: 'Chat',
    name: 'chatTab',
    icon: require('../assets/images/icon/chatIcon.png'),
    iconActive: require('../assets/images/icon/activeChat.png'),
    component: Chat,
  },
  {
    id: '5',
    displayName: 'Profile',
    name: 'profileTab',
    icon: require('../assets/images/icon/profileIcon.png'),
    iconActive: require('../assets/images/icon/activeProfile.png'),
    component: Profile,
  },
];
