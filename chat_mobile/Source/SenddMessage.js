import React, { useState, useEffect } from "react";
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

  const handleSend = async () => {
    // try {
    //   const response = await axios.post(
    //     `http://localhost:5678/message/${route.params._id}`,
    //     {
    //       content: text,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${userData.token}`,
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     setMessages([...messages, { id: Date.now().toString(), content: text }]);
    //     setText("");
    //   } else {
    //     throw new Error("Failed to send message");
    //   }
    // } catch (error) {
    //   Alert.alert("Error", error.message);
    // }
  };

  const renderItem = ({ item }) => (
    <View style={styles.message}>
      <Text>{item.content}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>Trở về</Text>
      </TouchableOpacity>
      <View>
        <Text>{route.params.chatName}</Text>
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
});

export default SendMessage;
