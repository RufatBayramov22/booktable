import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from './apirequest';

export async function registerDeviceToken(deviceToken: string) {
  if (!deviceToken) {
    return;
  }

  const accessToken = await AsyncStorage.getItem('accessToken');
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  await apiRequest.post(
    '/Notifications/user/device-token',
    { deviceToken },
    headers ? { headers } : undefined,
  );
}
