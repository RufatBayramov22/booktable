import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Onboarding from '../screens/onboarding/Onboarding';
import Reservation from '../screens/reservation/Reservation';
import Chat from '../screens/chat/Chat';
import Wishlist from '../screens/wishlist/Wishlist';
import Profile from '../screens/profile/Profile';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Notification from '../screens/notification/Notification';
import SingleRestaurant from '../screens/singleRestaurant/SingleRestaurant';
import FullGalery from '../screens/gallery/FullGalery';
import Fullmenu from '../screens/menu/Fullmenu';

export type RootStackParamList = {
  Home: undefined;
  Reservation: undefined;
  Wishlist: undefined;
  Profile: undefined;
  Chat: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  HomeTabs: undefined;
  Notification: undefined;
  SingleRestaurant: undefined;
  FullGalery: undefined;
  Fullmenu: undefined;
};

export type RouteItem = {
  path: keyof RootStackParamList;
  component: any;
  private: boolean;
};
export type RouteProps = RouteProp<RootStackParamList>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export const RoutesStack: RouteItem[] = [
  {
    path: 'Onboarding',
    component: Onboarding,
    private: false,
  },
  {
    path: 'Login',
    component: Login,
    private: false,
  },
  {
    path: 'Register',
    component: Register,
    private: false,
  },
  {
    path: 'Home',
    component: Home,
    private: false,
  },
  {
    path: 'Chat',
    component: Chat,
    private: false,
  },
  {
    path: 'Notification',
    component: Notification,
    private: false,
  },
  {
    path: 'SingleRestaurant',
    component: SingleRestaurant,
    private: false,
  },
  {
    path: 'FullGalery',
    component: FullGalery,
    private: false,
  },
  {
    path: 'Fullmenu',
    component: Fullmenu,
    private: false,
  },
];
