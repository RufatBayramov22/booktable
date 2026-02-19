import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';

const messages = [
  {
    id: '1',
    type: 'incoming',
    content:
      'Hello! Yes, we’ll have a jazz band performing this Friday from 7 PM to 9 PM.',
    time: '18:00 PM',
  },
  {
    id: '2',
    type: 'call',
    content: 'Voice call',
    duration: '18 sec',
    time: '18:00',
  },
  {
    id: '3',
    type: 'outgoing',
    content: 'Perfect! Can I make a reservation for 2 people at 7 PM?',
    time: '18:00',
  },
];

const SingleChat: React.FC = () => {
  const [input, setInput] = useState('');
  const style = styles;

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
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/icon/arrow.png')}
              style={style.backIcon}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/icon/chatAccount.png')}
            style={style.profileImage}
          />
          <View style={style.contactInfo}>
            <Text style={style.contactName}>Contact name</Text>
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
      <ScrollView
        style={style.messagesContainer}
        contentContainerStyle={{padding: 16}}>
        <Text style={style.dateText}>Today</Text>
        {messages.map(msg => (
          <View key={msg.id} style={{marginVertical: 8}}>
            {renderMessage(msg)}
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={style.inputContainer}>
        <View style={style.inputWrapper}>
          <TextInput
            placeholder="Message"
            value={input}
            onChangeText={setInput}
            style={style.textInput}
          />
          <TouchableOpacity style={style.inlineSendButton}>
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
