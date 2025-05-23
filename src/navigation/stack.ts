import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Onboarding from '../screens/onboarding/Onboarding';
import Reservation from '../screens/reservation/Reservation';
import Chat from '../screens/chat/Chat';
import Wishlist from '../screens/wishlist/Wishlist';
import Profile from '../screens/profile/Profile';

export type RootStackParamList = {
  Home: undefined;
  Reservation: undefined;
  Wishlist: undefined;
  Profile: undefined;
  Chat: undefined;
  Onboarding: undefined;
};

export type RouteItem = {
  path: keyof RootStackParamList;
  component: any;
  private: boolean;
};
export type RouteProps = RouteProp<RootStackParamList>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

const RoutesStack: RouteItem[] = [
  {
    path: 'Onboarding',
    component: Onboarding,
    private: false,
  },
  {
    path: 'Home',
    component: Home,
    private:false,
  },
    {
    path: 'Chat',
    component: Chat,
    private:false,
  }
];
