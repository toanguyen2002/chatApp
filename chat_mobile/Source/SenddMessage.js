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
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Video from "react-native-video";
import axios from "axios";

const socket = io("http://localhost:5678");
const ip = "https://mail.getandbuy.shop";
const SendMessage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [longPressedMessageId, setLongPressedMessageId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
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
        // setHasNewMessage(true);
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
    if (hasNewMessage && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
      setHasNewMessage(false); // Đặt lại biến đánh dấu sau khi cuộn xuống
    }
  };

  const rerenderMessage = async () => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    setUserData(userData);
    try {
      const response = await fetch(
        `${ip}/message/${route.params._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      const responseData = await response.json();
      setMessages(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollTobottom();
  }, [messages, hasNewMessage]);
  useEffect(() => {
    rerenderMessage();
  }, [messages, hasNewMessage]);
  const handleScrollToBottom = () => {
    if (hasNewMessage) {
      scrollTobottom();
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });
      if (!result.cancelled) {
        let selectedDocuments = result.assets.map((doc) => ({
          uri: doc.uri,
          fileName: doc.name,
          type: doc.mimeType,
        }));

        console.log("Selected documents:", selectedDocuments);
        sendMessImg(selectedDocuments);
      }
    } catch (error) {
      // console.error("Error picking documents:", error);
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
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });
      if (!result.cancelled) {
        let selectedImages;
        if (result.assets && Array.isArray(result.assets)) {
          selectedImages = result.assets.map((asset) => ({
            uri: asset.uri,
            fileName: asset.fileName,
          }));
        } else if (result && Array.isArray(result)) {
          selectedImages = result.map((asset) => ({
            uri: asset.uri,
            fileName: asset.fileName,
          }));
        } else if (!result.assets && !Array.isArray(result.assets)) {
          selectedImages = [
            {
              uri: result.uri,
              fileName: result.fileName,
            },
          ];
        } else {
          selectedImages = [
            {
              uri: result.asset[0].uri,
              fileName: result.asset[0].fileName,
            },
          ];
        }
        sendMessImg(selectedImages);
      }
    } catch (error) {
      // console.error("Error picking images:", error);
    }
  };

  const sendMessImg = async (selectedImages) => {
    try {
      for (const uri of selectedImages) {
        if (uri) {
          const formData = new FormData();
          formData.append("fileImage", {
            uri: uri.uri,
            // type: "image/jpeg",
            name: uri.fileName,
          });

          const response = await fetch(`${ip}/message/messImage`, {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userData.token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Error uploading image: HTTP status ${response.status}`
            );
          }

          const responseData = await response.json();

          const dataSend = await axios.post(
            ip + "/message/",
            {
              chatId: route.params._id,
              ImageUrl: responseData,
              typeMess: "Multimedia",
            },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          );

          if (!dataSend.data) {
            throw new Error(`Error sending message: Empty response data`);
          }

          const newMessage = dataSend.data;
          setMessages([...messages, newMessage]);
          socket.emit("new message", newMessage);
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
            ip + "/message/",
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
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleGetidMessAndDelete = async (messId) => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      const response = await axios.post(
        `${ip}/message/deleteMess`,
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
  const handleGetidMessAndReplaceToNone = async (messId) => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      const response = await axios.post(
        `${ip}/message/blankMess`,
        {
          messId: messId,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Tin nhắn đã được thu hồi thành công");
        rerenderMessage();
      } else {
        console.log("Có lỗi xảy ra khi thu hồi tin nhắn");
      }
    } catch (error) {
      console.log("Lỗi khi gửi yêu cầu thu hồi tin nhắn:", error);
    }
  };
  const handleOpenWebView = (url) => {
    console.log("====================================");
    console.log(url);
    console.log("====================================");
    if (!url) {
      return;
    } else {
      navigation.navigate("WebViewScreen", { url: url });
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
        onPress={() => {
          if (!longPressedMessageId) {
            handleOpenWebView(item.url);
          }
        }}
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
          ) : item.typeMess === "videoCall" ? (
            <TouchableOpacity onPress={() => handleVideoCall(item)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="videocam" size={20} color="red" /> 
                <Text style={styles.textMess}>Video Call</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              {item.ImageUrl.map((imgItem, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  {imgItem.url.endsWith(".docx") && (
                    <Pressable
                      onPress={() => handleOpenWebView(imgItem.url)}
                      android_ripple={{ color: "transparent" }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: "contain",
                          }}
                          source={{
                            uri: "https://res.cloudinary.com/dhyt592i7/image/upload/v1712071261/e8zf6xlepys4jevrmf7q.png",
                          }}
                        />
                        <Text style={{ marginLeft: 10 }}>
                          {imgItem.url.split("/")[3]}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                  {imgItem.url.endsWith(".xlsx") && (
                    <Pressable
                      onPress={() => handleOpenWebView(imgItem.url)}
                      android_ripple={{ color: "transparent" }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: "contain",
                          }}
                          source={{
                            uri: "https://res.cloudinary.com/dhyt592i7/image/upload/v1712071046/covmtdumtqntlsvx9jyi.png",
                          }}
                        />
                        <Text style={{ marginLeft: 10 }}>
                          {imgItem.url.split("/")[3]}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                  {imgItem.url.endsWith(".pptx") && (
                    <Pressable
                      onPress={() => handleOpenWebView(imgItem.url)}
                      android_ripple={{ color: "transparent" }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: "contain",
                          }}
                          source={{
                            uri: "https://res.cloudinary.com/dhyt592i7/image/upload/v1712070852/gocyslxocjixjrfzaszh.png",
                          }}
                        />
                        <Text style={{ marginLeft: 10 }}>
                          {imgItem.url.split("/")[3]}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                  {imgItem.url.endsWith(".pdf") && (
                    <Pressable
                      onPress={() => handleOpenWebView(imgItem.url)}
                      android_ripple={{ color: "transparent" }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: "contain",
                          }}
                          source={{
                            uri: "https://res.cloudinary.com/dhyt592i7/image/upload/v1712070523/s5o96ckawemcfztbomuw.png",
                          }}
                        />
                        <Text style={{ marginLeft: 10 }}>
                          {imgItem.url.split("/")[3]}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                  {(imgItem.url.endsWith(".png") ||
                    imgItem.url.endsWith(".jpg") ||
                    imgItem.url.endsWith(".jpeg")) && (
                    <Pressable
                      onPress={() => handleOpenWebView(imgItem.url)}
                      android_ripple={{ color: "transparent" }}
                    >
                      <Image
                        style={{
                          width: 150,
                          height: 200,
                          resizeMode: "contain",
                        }}
                        source={{ uri: imgItem.url }}
                      />
                    </Pressable>
                  )}
                  {imgItem.url.endsWith(".mp4") && (
                    <Pressable
                      onPress={() => handleOpenWebView(imgItem.url)}
                      android_ripple={{ color: "transparent" }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon
                          name="play-circle-outline"
                          size={50}
                          color="#000"
                        />
                        <Text style={{ marginLeft: 10 }}>
                          {imgItem.url.split("/")[3]}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                </View>
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
              <TouchableOpacity
                onPress={() => handleGetidMessAndReplaceToNone(item._id)}
              >
                <Text style={styles.deleteButton}>Thu hồi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOpenWebView(item.url)}>
                <Text style={styles.deleteButton}>Xem</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancelLongPress()}>
                <Text style={styles.deleteButton}>Hủy</Text>
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
        <View style={styles.headers}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={{
              backgroundColor: "#4876FF",
              borderRadius: 10,
              padding: 10,
              alignItems: "center",
            }}
          >
            {/* //Icon */}
            <Text
              style={{ textAlign: "center", fontWeight: "bold", color: "#FFF" }}
            >
              Trở về
            </Text>
          </TouchableOpacity>
          <View style={{ padding: 10, marginRight: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#FFF",
                fontSize: 16,
              }}
            >
              {route.params.chatName}
            </Text>
          </View>
          <View>
            <TouchableOpacity >
              <Icon name="call-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleScrollToBottom}
          style={hasNewMessage ? styles.scrollToBottomButton : styles.hidden}
        >
          <Text style={styles.scrollToBottomText}>Cuộn xuống</Text>
        </TouchableOpacity>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.messagesList}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={toggleOptions}>
            <Icon
              name={showOptions ? "arrow-down" : "arrow-up"}
              size={24}
              color="#4876FF"
            />
          </TouchableOpacity>
          {showOptions && (
            <>
              <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Icon
                  name="image-outline"
                  size={20}
                  color="white"
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickFile} style={styles.button}>
                <Icon
                  name="document-outline"
                  size={20}
                  color="white"
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </>
          )}
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Nhập tin nhắn..."
          />
          <TouchableOpacity onPress={sendMess}>
            <Icon
              name="send"
              size={24}
              color="#4876FF"
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
    flex: 3,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  sendIcon: {
    width: 20,
    height: 20,
    backgroundColor: "",
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
  image: {},
  headers: {
    backgroundColor: "#3498DB",
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollToBottomButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 5,
  },
  scrollToBottomText: {
    color: "#FFF",
  },
  hidden: {
    display: "none",
  },
  deleteButtonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
    margin: 10,
    marginRight: 10,
  },
  deleteButton: {
    color: "white",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00BFFF",
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    marginBottom: 10,
    top: 0,
    marginLeft: 5,
    marginRight: 10,
  },
  sendIcon: {
    alignSelf: "center", // Để icon nằm giữa theo chiều dọc
    justifyContent: "center", // Để icon nằm giữa theo chiều ngang
    paddingHorizontal: 10, // Để tạo ra một khoảng trống xung quanh icon (tùy chỉnh theo nhu cầu của bạn)
  },
});

export default SendMessage;
