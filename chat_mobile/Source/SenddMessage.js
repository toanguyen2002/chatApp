import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const SendMessage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const flatListRef = useRef(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const rerenderMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5678/message/${route.params._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rerenderMessage();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    // Your send message logic here
  };

  const renderItem = ({ item }) => (
    <View style={styles.viewMess}>
      {item.typeMess === "text" ? (
        <Text>{item.content}</Text>
      ) : (
        <Image style={styles.image} source={{ uri: item.content }} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        {/* //Icon */}
        <Text>Trở về</Text>
      </TouchableOpacity>
      <View>
        <Text>{route.params.chatName}</Text>
      </View>
      <FlatList
        ref={flatListRef}
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
          <Image
            source={require("../assets/zalo.png")}
            style={styles.sendIcon}
          />
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
    borderColor: "#ddd",
  },
  content: {
    fontSize: 16,
  },
  footer: {
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  viewMess: {
    flex: 1,
    alignItems: "flex-end",
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 20,
  },
});

export default SendMessage;
