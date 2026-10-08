import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from './apirequest';

const getAuthConfig = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const normalizeResponse = <T>(payload: any): T => {
  if (!payload) {
    return payload;
  }

  if (payload.data !== undefined) {
    return payload.data as T;
  }

  if (payload.Data !== undefined) {
    return payload.Data as T;
  }

  return payload as T;
};

export type ChatListItem = {
  id: string | number;
  title?: string;
  contactName?: string;
  lastMessage?: string;
  lastUpdated?: string;
  unreadCount?: number;
  partnerUserId?: string | number;
  userId?: string | number;
};

export type ChatMessageItem = {
  type: string;
  id: string | number;
  senderId?: string | number;
  message?: string;
  content?: string;
  createdAt?: string;
  sentAt?: string;
  time?: string;
};

export const fetchChatList = async (
  search?: string,
): Promise<ChatListItem[]> => {
  const config = await getAuthConfig();
  try {
    // Fetch from /Chats endpoint
    const response = await apiRequest.get('/Chats', {
      ...config,
    });
    
    let chats = normalizeResponse<ChatListItem[]>(response.data);
    chats = Array.isArray(chats) ? chats : [];
    
    // Filter by search if provided
    if (search && search.trim()) {
      const query = search.toLowerCase().trim();
      chats = chats.filter(chat => 
        (chat.title || '').toLowerCase().includes(query) ||
        (chat.contactName || '').toLowerCase().includes(query) ||
        (chat.lastMessage || '').toLowerCase().includes(query)
      );
    }

    return chats;
  } catch (error: any) {
    console.error('Failed to load chat list from API:', error?.response?.status, error?.message);
    // Fallback to local storage if API fails
    try {
      const chatsJson = await AsyncStorage.getItem('chatList');
      let chats: ChatListItem[] = chatsJson ? JSON.parse(chatsJson) : [];
      
      if (search && search.trim()) {
        const query = search.toLowerCase().trim();
        chats = chats.filter(chat => 
          (chat.title || '').toLowerCase().includes(query) ||
          (chat.contactName || '').toLowerCase().includes(query) ||
          (chat.lastMessage || '').toLowerCase().includes(query)
        );
      }
      
      return chats;
    } catch {
      return [];
    }
  }
};

// Add a helper to save chats locally
export const saveChatToList = async (chat: ChatListItem): Promise<void> => {
  try {
    const chatsJson = await AsyncStorage.getItem('chatList');
    const chats: ChatListItem[] = chatsJson ? JSON.parse(chatsJson) : [];
    
    // Check if chat already exists
    const existingIndex = chats.findIndex(c => c.id === chat.id);
    
    if (existingIndex > -1) {
      // Update existing chat
      chats[existingIndex] = { ...chats[existingIndex], ...chat };
    } else {
      // Add new chat
      chats.unshift(chat);
    }
    
    await AsyncStorage.setItem('chatList', JSON.stringify(chats));
  } catch (error: any) {
    console.error('Failed to save chat:', error?.message);
  }
};

export const fetchChatMessages = async (
  restaurantId: string | number,
  partnerUserId?: string | number,
  pageNumber: number = 1,
  pageSize: number = 50,
): Promise<ChatMessageItem[]> => {
  const config = await getAuthConfig();
  try {
    // If partnerUserId is not provided, we need to fetch it from the chat list
    let userId = partnerUserId;
    
    if (!userId) {
      try {
        const chatsJson = await AsyncStorage.getItem('chatList');
        const chats = chatsJson ? JSON.parse(chatsJson) : [];
        const chat = chats.find((c: ChatListItem) => c.id === restaurantId);
        userId = (chat as any)?.partnerUserId || (chat as any)?.userId;
      } catch (err) {
        console.warn('Could not get partnerUserId from local storage');
      }
    }

    const response = await apiRequest.get('/Messages/conversation', {
      ...config,
      params: {
        PartnerUserId: userId,
        PartnerRestaurantId: restaurantId,
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    });
    
    const messages = normalizeResponse<ChatMessageItem[]>(response.data);
    return Array.isArray(messages) ? messages : [];
  } catch (error: any) {
    console.error('Failed to fetch chat messages:', error?.response?.status, error?.message);
    return [];
  }
};

export const sendChatMessage = async (
  chatId: string | number,
  message: string,
): Promise<ChatMessageItem> => {
  const config = await getAuthConfig();
  try {
    const response = await apiRequest.post(
      '/Messages',
      { 
        chatId,
        message,
        content: message,
      },
      config,
    );
    return normalizeResponse<ChatMessageItem>(response.data);
  } catch (error) {
    console.error('Failed to send chat message:', error);
    throw error;
  }
};
