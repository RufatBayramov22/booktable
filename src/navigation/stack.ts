import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Onboarding from '../screens/onboarding/Onboarding';
import Chat from '../screens/chat/Chat';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Notification from '../screens/notification/Notification';
import SingleRestaurant from '../screens/singleRestaurant/SingleRestaurant';
import FullGalery from '../screens/gallery/FullGalery';
import Fullmenu from '../screens/menu/Fullmenu';
import Booktable from '../screens/booktable/Booktable';
import SeatOption from '../screens/seatoptions/SeatOption';
import ConfirmReserve from '../screens/succesReserve/ConfirmReserve';
import CancelReserve from '../screens/cancel/CancelReserve';
import CancelMemoji from '../screens/cancelMemoji/CancelMemoji';
import SingleChat from '../components/SingleChat/SingleChat';
import Otp from '../screens/otp/Otp';
import Personal from '../screens/personal/Personal';
import HomeTabs from '../../HomeTabs';

export type RootStackParamList = {
  HomeTabs: undefined; 
  Reservation: undefined;
  Wishlist: undefined;
  Profile: undefined;
  Chat: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Otp: {email: string};
  Notification: undefined;
  SingleRestaurant: {id: number};
  FullGalery: undefined;
  Fullmenu: { id: number };
  Booktable: undefined;
  SeatOption: undefined;
  ConfirmReserve: undefined;
  CancelReserve: undefined;
  CancelMemoji: undefined;
  SingleChat: undefined;
  Personal: undefined;
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
    path: 'Otp',
    component: Otp,
    private: false,
  },
  {
    path: 'HomeTabs',
    component: HomeTabs,
    private: true,
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
  {
    path: 'Booktable',
    component: Booktable,
    private: false,
  },
  {
    path: 'SeatOption',
    component: SeatOption,
    private: false,
  },
  {
    path: 'ConfirmReserve',
    component: ConfirmReserve,
    private: false,
  },

  {
    path: 'CancelReserve',
    component: CancelReserve,
    private: false,
  },
  {
    path: 'CancelMemoji',
    component: CancelMemoji,
    private: false,
  },
  {
    path: 'SingleChat',
    component: SingleChat,
    private: false,
  },
  {
    path: 'Personal',
    component: Personal,
    private: false,
  },
];
