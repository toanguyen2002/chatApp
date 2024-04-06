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
  Platform,
  Button,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

const socket = io("http://localhost:5678");

const SendMessage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [userData, setUserData] = useState(null);

  //chọn ảnh
  const [selectedImage, setSelectedImage] = useState(null);
  const fileRef = useRef(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const scrollTobottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  ////12321312123213213213213213213
  const rerenderMessage = async () => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    setUserData(userData);
    try {
      const response = await fetch(`http://192.168.0.241:5678/message/${route.params._id}`,{
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
      setMessages([...messages, data]);
    });
  }, []);

  const sendMessImg = async () => {
    const formData = new FormData();
    formData.append("fileImage", {
      uri: selectedImage,
      name: "photo.jpg",
      type: "image/jpeg",
    });
  
    try {
      const respone = await axios.post(
        "http://192.168.0.241:5678/message/messImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      const dataSend = await axios.post(
        "http://192.168.0.241:5678/message/",
        {
          chatId: route.params._id,
          content: responseData.url, 
          typeMess: "image",
        })
      if (!messageResponse.ok) {
        throw new Error(
          `Error sending message: HTTP status ${messageResponse.status}`
        );
      }
  
      // Thêm tin nhắn mới vào danh sách tin nhắn và cập nhật trạng thái
      const newMessage = await messageResponse.json();
      setMessages([...messages, newMessage]);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
const pickImage = async () => {
    let permissionResult;
    if (Platform.OS !== "web") {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert(
          "Xin lỗi, chúng tôi cần quyền truy cập vào thư viện ảnh để chọn ảnh!"
        );
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  

  
  const sendMess = async () => {
    if (messages) {
      try {
        const dataSend = await axios.post(
          "http://192.168.1.5:5678/message/",
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

  const renderItem = ({ item }) => {
    const isCurrentUser = item.sender._id === userData._id;
  
    return (
      <View style={[styles.viewMess, isCurrentUser ? styles.viewMessCurrentUser : styles.viewMessOtherUser]}>
        {item.typeMess === "text" ? (
          <Text style={[styles.textMess, isCurrentUser ? styles.textMessCurrentUser : styles.textMessOtherUser]}>{item.content}</Text>
        ) : (
          <Image style={styles.image} source={{ uri: item.content }} />
        )}
      </View>
    );
  };
  
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

        {/* <TouchableOpacity onPress={}>
          <FontAwesome name="send" size={24} color="black" />

        
        </TouchableOpacity> */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 10, height: 10,  resizeMode: "contain"}}
            />
          )}
          <Button title="Chọn ảnh" onPress={pickImage} />
          {selectedImage && <Button title="Gửi ảnh" onPress={sendMessImg} />}
        </View>            
        
        
        
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
    marginBottom: 20,
  },
  viewMessCurrentUser: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  viewMessOtherUser: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10,
  },
  textMess: {
    padding: 10,
    borderRadius: 10,
  },
  textMessCurrentUser: {
    backgroundColor: "#DCF8C5",
  },
  textMessOtherUser: {
    backgroundColor: "#E5E5EA",
  },
  image: {
    width: 150,
    height: 200,
  },
});


export default SendMessage;