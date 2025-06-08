import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import _styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import {Image} from 'react-native';
const Chat = () => {
  const style = _styles;

  return (
    <View style={style.chatSection}>
      <Text style={style.chatTitle}>Chats</Text>
      <View style={style.searchBar}>
        <View style={style.searchInp}>
          <TextInput placeholder="Search.." />
          <Image
            source={require('../../assets/images/icon/search.png')}
            style={style.searchIcon}
          />
        </View>
      </View>
      <View style={style.chatComp}>
        <TouchableOpacity style={{width:"100%"}}>
          <View style={style.chatBox}>
            <View style={style.chatImg}>
              <Image
                source={require('../../assets/images/icon/userChatimg.png')}
              />
            </View>
            <View style={style.messageInfo}>
              <Text style={style.messageTitle}>
                Golden Dragon Chinese Bistro
              </Text>
              <Text style={style.message}>Thank you so much</Text>
            </View>
            <View style={style.time}>
              <Text style={style.messageTime}>Yesterday</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
