import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import _styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import { fetchChatList, ChatListItem } from '../../api/chat';

const Chat = () => {
  const style = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [allChats, setAllChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // Load all chats on component mount
  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchChatList();
        setAllChats(Array.isArray(result) ? result : []);
      } catch (err) {
        console.warn('Failed to load chat list', err);
        setError('Unable to load chats. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  // Filter chats based on search text in real time
  const filteredChats = useMemo(() => {
    if (!searchText.trim()) {
      return allChats;
    }

    const query = searchText.toLowerCase().trim();
    return allChats.filter(chat => {
      const restaurantName = (chat.title || chat.contactName || '').toLowerCase();
      const lastMessage = (chat.lastMessage || '').toLowerCase();
      
      return restaurantName.includes(query) || lastMessage.includes(query);
    });
  }, [allChats, searchText]);

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={style.chatSection}>
      <Text style={style.chatTitle}>Chats</Text>
      <View style={style.searchBar}>
        <View style={style.searchInp}>
          <TextInput
            placeholder="Search restaurants..."
            value={searchText}
            onChangeText={setSearchText}
            style={{flex: 1, color: '#070707'}}
            placeholderTextColor="#999"
          />
          {searchText ? (
            <TouchableOpacity onPress={handleClearSearch} style={{marginRight: 8}}>
              <Text style={{fontSize: 16, color: '#999'}}>✕</Text>
            </TouchableOpacity>
          ) : null}
          <Image
            source={require('../../assets/images/icon/search.png')}
            style={style.searchIcon}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <View style={style.emptyState}>
          <Text style={style.message}>{error}</Text>
        </View>
      ) : filteredChats.length === 0 ? (
        <View style={style.emptyState}>
          <Text style={style.message}>
            {searchText ? `No restaurants match "${searchText}"` : 'No chats yet.'}
          </Text>
        </View>
      ) : (
        <View style={style.chatComp}>
          {filteredChats.map(chat => (
            <TouchableOpacity
              key={String(chat.id)}
              style={{width: '100%'}}
              onPress={() =>
                navigation.navigate('SingleChat', {
                  chatId: chat.id,
                  contactName: chat.title || chat.contactName || 'Chat',
                  restaurantImage: (chat as any).restaurantImage || (chat as any).imageUrl,
                  partnerUserId: (chat as any).partnerUserId || (chat as any).userId,
                })
              }>
              <View style={style.chatBox}>
                <View style={style.chatImg}>
                  <Image
                    source={
                      (chat as any).restaurantImage || (chat as any).imageUrl
                        ? { uri: (chat as any).restaurantImage || (chat as any).imageUrl }
                        : require('../../assets/images/icon/userChatimg.png')
                    }
                  />
                </View>
                <View style={style.messageInfo}>
                  <Text style={style.messageTitle} numberOfLines={1}>
                    {chat.title || chat.contactName || 'Chat'}
                  </Text>
                  <Text style={style.message} numberOfLines={1}>
                    {chat.lastMessage || 'Tap to open chat'}
                  </Text>
                </View>
                <View style={style.time}>
                  <Text style={style.messageTime}>
                    {chat.lastUpdated || ''}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Chat;


