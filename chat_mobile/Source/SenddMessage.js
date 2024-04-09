import axios from 'axios';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
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
  const [longPressedMessageId, setLongPressedMessageId] = useState(null);

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
    socket.on("connect", () => {});
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

      const updatedMessages = responseData.filter(
        (message) => message._id !== longPressedMessageId
      );

      scrollTobottom();
      setMessages(updatedMessages);
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
        allowsMultipleSelection: true,
      });
      if (!result.cancelled) {
        const selectedImages = result.uri;
        sendMessImg(selectedImages);
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  const sendMessImg = async (selectedImages) => {
    try {
      for (const uri of selectedImages) {
        if (uri) {
          const formData = new FormData();
          formData.append("fileImage", {
            uri,
            type: "image/jpeg",
            name: "photo.jpg",
          });

          const response = await axios.post(
            "http://" + ip + ":5678/message/messImage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

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

          const newMessage = await dataSend.json();
          setMessages([...messages, newMessage]);
          socket.emit("new message", dataSend.data);
          socket.emit("render-box-chat", true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setSelectedImage(null);
  };

  const sendMess = async () => {
    if (messages) {
      try {
        if (selectedImage) {
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

  const handleGetidMessAndDelete = async (messId) => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      const response = await axios.post(
        `http://${ip}:5678/message/deleteMess`,
        {
          messId: messId,
        },
        {
          headers: {
            Authorization: `Bearer ${userData && userData.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Tin nhắn đã được xóa thành công");
        rerenderMessage();
      } else {
        console.log("Có lỗi xảy ra khi xóa tin nhắn");
      }
    } catch (error) {
      console.log("Lỗi khi gửi yêu cầu xóa tin nhắn:", error);
    }
  };

  const handleLongPress = (messageId) => {
    setLongPressedMessageId(messageId);
  };

  const handleCancelLongPress = () => {
    setLongPressedMessageId(null);
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.sender._id === userData._id;

    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item._id)}
        onPress={handleCancelLongPress}
      >
        <View
          style={[
            styles.viewMess,
            isCurrentUser
              ? styles.viewMessCurrentUser
              : styles.viewMessOtherUser,
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
              {item.ImageUrl &&
                Array.isArray(item.ImageUrl) &&
                item.ImageUrl.map((image, index) => (
                  <Image
                    key={index}
                    style={styles.image}
                    source={{ uri: image.url }}
                  />
                ))}
            </View>
          )}
          {longPressedMessageId === item._id && (
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity
                onPress={() => handleGetidMessAndDelete(item._id)}
              >
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableOpacity onPress={handleGoBack}>
          <Text>Trở về</Text>
        </TouchableOpacity>
        <View>
          <Text>{route.params.chatName}</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.messagesList}
        />
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Nhập tin nhắn..."
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button title="Chọn ảnh" onPress={pickImage} />
            {selectedImage && (
              <Button
                title="Gửi ảnh"
                onPress={() => sendMessImg(selectedImage)}
              />
            )}
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
    position: "relative",
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
  deleteButtonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    color: "white",
  },
});

export default SendMessage;
