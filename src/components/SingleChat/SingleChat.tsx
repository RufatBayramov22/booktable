import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {RootStackParamList} from '../../navigation/stack';
import {fetchChatMessages, sendChatMessage, saveChatToList, ChatMessageItem} from '../../api/chat';

const SingleChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | number | null>(null);
  const style = styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SingleChat'>>();
  const chatId = route.params?.chatId;
  const contactName = route.params?.contactName || 'Contact';
  const restaurantImage = route.params?.restaurantImage;
  const partnerUserId = route.params?.partnerUserId;

  const normalizeMessage = (message: ChatMessageItem): any => {
    const content = message.message || message.content || '';
    const time =
      message.sentAt || message.createdAt || message.time || 'Now';

    const isOutgoing =
      message.senderId !== undefined &&
      currentUserId !== null &&
      String(message.senderId) === String(currentUserId);

    return {
      ...message,
      content,
      time,
      type: message.type || (isOutgoing ? 'outgoing' : 'incoming'),
    };
  };

  useEffect(() => {
    const loadUserIdAndMessages = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setCurrentUserId(storedUserId || null);
      if (!chatId) {
        return;
      }

      setLoading(true);

      try {
        const result = await fetchChatMessages(chatId, partnerUserId);
        const normalized = Array.isArray(result)
          ? result.map(normalizeMessage)
          : [];
        setMessages(normalized);
      } catch (err) {
        console.warn('Failed to load chat messages', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserIdAndMessages();
  }, [chatId, partnerUserId]);

  const handleSend = async () => {
    if (!input.trim() || !chatId) {
      return;
    }

    setSending(true);
    const text = input.trim();

    try {
      const sentMessage = await sendChatMessage(chatId, text);
      setMessages(prev => [...prev, normalizeMessage(sentMessage)]);
      setInput('');

      // Save chat to local list
      await saveChatToList({
        id: chatId,
        title: contactName,
        contactName: contactName,
        lastMessage: text,
        lastUpdated: new Date().toISOString(),
        unreadCount: 0,
      });
    } catch (err) {
      console.warn('Failed to send chat message', err);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = (msg: any) => {
    const isOutgoing = msg.type === 'outgoing';
    const isCall = msg.type === 'call';

    if (isCall) {
      return (
        <View style={style.callMessageWrapper}>
          <View style={style.callBox}>
            <View style={style.callImg} >
              <Image
                source={require('../../assets/images/icon/callOption.png')}
                style={style.callIconBox}
                width={24} height={24}
              />
            </View>

            <View style={style.callTextWrapper}>
              <Text style={style.callText}>Voice call</Text>
              <Text style={style.callDuration}>{msg.duration}</Text>
            </View>
          </View>
          <Text style={style.callTimeText}>{msg.time}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          style.messageRow,
          isOutgoing
            ? {justifyContent: 'flex-end'}
            : {justifyContent: 'flex-start'},
        ]}>
        {!isOutgoing && (
          <Image
            source={require('../../assets/images/icon/chatAccount.png')}
            style={style.messageAvatar}
          />
        )}

        <View
          style={[
            style.messageContainer,
            isOutgoing ? style.outgoing : style.incoming,
          ]}>
          <Text style={style.messageText}>{msg.content}</Text>
          <Text style={style.timeText}>{msg.time}</Text>
        </View>

        {isOutgoing && (
          <Image
            source={require('../../assets/images/icon/chatAccount.png')}
            style={style.messageAvatar}
          />
        )}
      </View>
    );
  };

  return (
    <View style={style.container}>
      {/* Header (əvvəlki kodun) */}
      <View style={style.header}>
        <View style={style.headerLeft}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require('../../assets/images/icon/arrow.png')}
              style={style.backIcon}
            />
          </TouchableOpacity>
          <Image
            source={
              restaurantImage
                ? { uri: restaurantImage }
                : require('../../assets/images/icon/chatAccount.png')
            }
            style={style.profileImage}
          />
          <View style={style.contactInfo}>
            <Text style={style.contactName}>{contactName}</Text>
            <View style={style.statusRow}>
              <View style={style.statusDot} />
              <Text style={style.statusText}>Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={style.callButton}>
          <Image
            source={require('../../assets/images/icon/call.png')}
            style={style.callIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      {loading ? (
        <View style={[style.messagesContainer, {justifyContent: 'center', alignItems: 'center'}]}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{marginTop: 10, color: '#666'}}>Loading messages...</Text>
        </View>
      ) : (
        <ScrollView
          style={style.messagesContainer}
          contentContainerStyle={{padding: 16}}>
          {messages.length === 0 ? (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={{color: '#999', marginTop: 20}}>No messages yet. Start the conversation!</Text>
            </View>
          ) : (
            <>
              <Text style={style.dateText}>Today</Text>
              {messages.map(msg => (
                <View key={msg.id} style={{marginVertical: 8}}>
                  {renderMessage(msg)}
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}

      {/* Input */}
      <View style={style.inputContainer}>
        <View style={style.inputWrapper}>
          <TextInput
            placeholder="Message"
            value={input}
            onChangeText={setInput}
            style={style.textInput}
            editable={!sending}
          />
          <TouchableOpacity 
            style={style.inlineSendButton}
            onPress={handleSend}
            disabled={sending || !input.trim()}>
            <Image
              source={require('../../assets/images/icon/send.png')}
              style={style.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleChat;
