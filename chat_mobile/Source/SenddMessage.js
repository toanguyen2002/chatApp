import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SendMessage = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Lấy dữ liệu tin nhắn từ server
    // Cập nhật state messages với dữ liệu lấy được
  }, []);

  const handleSend = async () => {
    try {
      // Gửi tin nhắn đến server
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: text,
          // Các thông tin khác nếu cần thiết
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      // Cập nhật state messages với tin nhắn mới
      setMessages([...messages, { id: messages.length.toString(), content: text }]);
      setText(''); // Xóa nội dung tin nhắn trong TextInput sau khi gửi
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.message}>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 50, backgroundColor: 'blue' }}>
        <Pressable
          onPress={() => { navigation.navigate('MessageTC') }}
          style={{ justifyContent: 'center', top: 10, left: 10 }}

        >
          <AntDesign name="arrowleft" size={26} color="white" />
        </Pressable>
        

      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  content: {
    fontSize: 16,
  },
  footer: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});

export default SendMessage;
