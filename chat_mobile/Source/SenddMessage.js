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
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

const socket = io("http://localhost:5678");
const ip = "192.168.1.6";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
    socket.emit("setup", userData);
    socket.on("connect", () => {
      // socket.on("disconnect", () => {
      //     console.log("mess", socket);
      //     console.log(`Socket disconnected: ${socket.id}`);
      // });
    });
    socket.emit("render-box-chat", true);
  }, []);
  const scrollTobottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const rerenderMessage = async () => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    setUserData(userData);
    //
    try {
      const response = await fetch(
        `http://${ip}:5678/message/${route.params._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      const responseData = await response.json();

      scrollTobottom();
      setMessages(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rerenderMessage();
    scrollTobottom();
  }, [messages]);

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

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true, // Cho phép chọn nhiều ảnh
      });
      if (!result.cancelled) {
        // Nếu người dùng đã chọn ảnh
        const selectedImages = result.uri; // Mảng các uri của ảnh đã chọn
        sendMessImg(selectedImages); // Gửi mảng ảnh đã chọn
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  const sendMessImg = async (selectedImages) => {
    try {
      // Lặp qua mỗi ảnh đã chọn để gửi
      for (const uri of selectedImages) {
        if (uri) {
          // Kiểm tra xem URI có tồn tại không
          const formData = new FormData();
          formData.append("fileImage", {
            uri,
            type: "image/jpeg",
            name: "photo.jpg",
          }); // Thêm ảnh vào formData

          // Gửi formData chứa ảnh
          const response = await axios.post(
            "http://" + ip + ":5678/message/messImage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Gửi thông tin tin nhắn (link ảnh) tới server
          const dataSend = await axios.post("http://" + ip + ":5678/message/", {
            chatId: route.params._id,
            content: response.data.url,
            typeMess: "image",
          });

          if (!dataSend.ok) {
            throw new Error(
              `Error sending message: HTTP status ${dataSend.status}`
            );
          }

          // Cập nhật danh sách tin nhắn
          const newMessage = await dataSend.json();
          setMessages([...messages, newMessage]);
          socket.emit("new message", dataSend.data);
          socket.emit("render-box-chat", true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Sau khi gửi xong, reset selectedImage về null
    setSelectedImage(null);
  };

  const sendMess = async () => {
    if (messages) {
      try {
        if (selectedImage) {
          // Nếu đã chọn ảnh, gửi ảnh đi
          sendMessImg(selectedImage);
        } else {
          const dataSend = await axios.post(
            "http://" + ip + ":5678/message/",
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
          socket.emit("new message", dataSend.data);
          socket.emit("render-box-chat", true);
          setMessages((prevMessages) => [...prevMessages, dataSend.data]);
          scrollTobottom();
          setText("");
          flatListRef.current.scrollToEnd({ animated: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.sender._id === userData._id;
  
    return (
      <View
        style={[
          styles.viewMess,
          isCurrentUser ? styles.viewMessCurrentUser : styles.viewMessOtherUser,
        ]}
      >
        {item.typeMess === "text" ? (
          <Text
            style={[
              styles.textMess,
              isCurrentUser
                ? styles.textMessCurrentUser
                : styles.textMessOtherUser,
            ]}
          >
            {item.content}
          </Text>
        ) : (
          <View>
            {item.ImageUrl && Array.isArray(item.ImageUrl) && item.ImageUrl.map((image, index) => (
              <Image
                key={index}
                style={styles.image}
                source={{ uri: image.url }}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
                style={{ width: 10, height: 10, resizeMode: "contain" }}
              />
            )}
            <Button title="Chọn ảnh" onPress={pickImage} />
            {selectedImage && <Button title="Gửi ảnh" onPress={() => sendMessImg(selectedImage)} />}
          </View>

          <TouchableOpacity onPress={sendMess}>
            <Image
              source={require("../assets/zalo.png")}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
