import apiRequest from './apirequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Notification {
  id: number | string;
  title?: string;
  Title?: string;
  message?: string;
  Message?: string;
  content?: string;
  Content?: string;
  createdAt?: string;
  CreatedAt?: string;
  date?: string;
  Date?: string;
  time?: string;
  Time?: string;
  isRead?: boolean;
  IsRead?: boolean;
  read?: boolean;
  Read?: boolean;
  icon?: string;
  Icon?: string;
}

interface NotificationResponse {
  data?: Notification[];
  Data?: Notification[];
  items?: Notification[];
  Items?: Notification[];
}

const getAuthConfig = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

const normalizeResponse = (response: any): Notification[] => {
  const payload = response?.data || response?.Data || response;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.Data)) {
    return payload.Data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.Items)) {
    return payload.Items;
  }

  return [];
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  const config = await getAuthConfig();
  const response = await apiRequest.get<NotificationResponse>('/Notifications/user', config);
  return normalizeResponse(response.data);
};

export const markNotificationAsRead = async (notificationId: string | number): Promise<void> => {
  const config = await getAuthConfig();
  await apiRequest.put(`/Notifications/${notificationId}/read`, {}, config);
};

export const deleteNotification = async (notificationId: string | number): Promise<void> => {
  const config = await getAuthConfig();
  await apiRequest.delete(`/Notifications/${notificationId}`, config);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  const config = await getAuthConfig();
  await apiRequest.put('/Notifications/mark-all-read', {}, config);
};

export const deleteAllNotifications = async (): Promise<void> => {
  const config = await getAuthConfig();
  await apiRequest.delete('/Notifications/all', config);
};
