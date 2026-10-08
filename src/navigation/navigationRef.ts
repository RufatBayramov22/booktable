import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from './stack';

// Suppress deprecation warning about navigate API
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }
}
