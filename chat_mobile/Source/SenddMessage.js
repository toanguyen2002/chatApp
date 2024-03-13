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
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io("http://localhost:5678");

const SendMessage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [userData, setUserData] = useState(null);
  
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const scrollTobottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const rerenderMessage = async () => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    setUserData(userData);
    try {
      const response = await fetch(`http://192.168.1.4:5678/message/${route.params._id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        }
      });
      const responseData = await response.json();
      scrollTobottom();
      setMessages(responseData);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    rerenderMessage();
    scrollTobottom();
  }, []);

  useEffect(() => {
    socket.emit("setup", userData);
    socket.on("connect", () => {
      socket.on("disconnect", () => {
        console.log("mess", socket);
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }, []);

  useEffect(() => {
    socket.on("mess-rcv", (data) => {
      // console.log("mess", data);
      setMessages([...messages], data);
    });
  }, []);

  const sendMessImg = async () => {
    const formData = new FormData();
    formData.append("fileImage", fileRef.current.files[0]);
    // console.log(fileRef.current.files[0]);
    try {
      const respone = await axios.post(
        "http://192.168.1.4:5678/message/messImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const dataSend = await axios.post(
        "http://192.168.1.4:5678/message/",
        {
          chatId: route.params._id,
          content: respone.data.url,
          typeMess: "image",
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      socket.emit("new-mes", dataSend.data);
      socket.emit("render-box-chat", true);
      setText("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const sendMess = async () => {
    if (messages) {
      try {
        const dataSend = await axios.post(
          "http://192.168.1.4:5678/message/",
          {
            chatId: route.params._id,
            content: text,
            typeMess: "text",
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        setMessages((prevMessages) => [...prevMessages, dataSend.data]);
        scrollTobottom();
        setText("");
        flatListRef.current.scrollToEnd({ animated: true });
     
      } catch (error) {
        console.log(error);
      }
    }
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
        <TouchableOpacity onPress={sendMess}>
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
