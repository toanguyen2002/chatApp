import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

const SendMessage = () => {
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
          <Image source={require('../assets/zalo.png')} style={styles.sendIcon} />
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
