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
  Modal,
  ScrollView,
  KeyboardAvoidingViewBase,
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
const SendMessageGroup = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [longPressedMessageId, setLongPressedMessageId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDetailModal, setShowMessageDetailModal] = useState(false);
  const [userOnGroup, setuUserOnGroup] = useState([]);
  const [isFriendListModalVisible, setFriendListModalVisible] = useState(false); // State để theo dõi trạng thái của modal danh sách bạn bè
  //chọn ảnh
  const [selectedImage, setSelectedImage] = useState(null);
  const fileRef = useRef(null);
  const handlePressItem = (message) => {
    // setSelectedMessage(message);
    setShowMessageDetailModal(true);
  };
  useEffect(() => {
    const getUser = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      setUserData(userData);
      const dataUser = await axios.post(
        `${ip}/user/getUserOutCurrentGroupChat`,
        {
          chatId: route.params._id,
          userId: userData._id,
          name: userData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      // setUsers(dataUser.data);
      setuUserOnGroup(dataUser.data);
    };
    getUser();
  }, []);
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
  const callUser = async (id) => {
    // window.open(`/room/${id}`)
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    try {
      const dataSend = await axios.post(
        `${ip}/message/`, {
        chatId: route.params._id,
        content: "http://localhost:5173" + `/room/${route.params._id}`,
        typeMess: "videoCall"
      },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          }
        }
      )
      socket.emit("new message", dataSend.data)
      socket.emit("render-box-chat", true)
    } catch (error) {
      console.log(error);
    }
  }
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
            <TouchableOpacity onPress={() => callUser(route.params._id)}>
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
            <TouchableOpacity>
              <Icon name="call-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => handlePressItem()}>
              <Icon name="menu" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {showMessageDetailModal && (
          <MessageDetailModal
            message={userOnGroup}
            onClose={() => setShowMessageDetailModal(false)}
            route={route.params}
            navigation={navigation}
          />
        )}
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

//modal menu chức năng trong groupchat
const MessageDetailModal = ({ message, onClose, route, navigation }) => {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isFriendListModalVisible, setFriendListModalVisible] = useState(false);
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const isAdmin = route.groupAdmin._id;

  const getUser = async () => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const dataUser = await axios.post(
      `${ip}/user/getUserOutCurrentGroupChat`,
      {
        chatId: route._id,
        userId: userData._id,
        name: userData.name,
      },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    setFriendList(dataUser.data);
  };
  const handleSelectFriend = async (idUser) => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      if (!userDataString) {
        console.log("userData không tồn tại trong AsyncStorage");
        return;
      }

      if (!userData || !userData._id) {
        console.log("Dữ liệu userData không hợp lệ");
        return;
      }

      // Hiển thị cửa sổ thông báo hỏi người dùng có muốn thêm thành viên không
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn thêm thành viên này?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: async () => {
              try {
                // Gửi yêu cầu thêm thành viên nếu người dùng đồng ý
                const addUser = await axios.post(
                  `${ip}/chat/addUserToGroupChat`,
                  {
                    chatId: route._id,
                    userId: idUser,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userData.token}`,
                    },
                  }
                );
                console.log("Thành viên đã được thêm thành công");
                getUser();
              } catch (error) {
                console.log("Đã xảy ra lỗi khi thêm thành viên:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  };

  // Hàm mở modal danh sách bạn bè
  const openFriendListModal = () => {
    setFriendListModalVisible(true);
  };

  // Hàm đóng modal danh sách bạn bè
  const closeFriendListModal = () => {
    setFriendListModalVisible(false);
  };

  const handleDeleteMember = async (userId) => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      if (!userDataString) {
        console.log("userData không tồn tại trong AsyncStorage");
        return;
      }

      if (!userData || !userData._id) {
        console.log("Dữ liệu userData không hợp lệ");
        return;
      }

      const isAdmin = route.groupAdmin._id === userData._id;
      if (!isAdmin) {
        Alert.alert("Cảnh báo", "Bạn không phải admin");
        return;
      }

      // Hiển thị cửa sổ thông báo hỏi người dùng có muốn xóa thành viên không
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn xóa thành viên này?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: async () => {
              try {
                // Gửi yêu cầu xóa thành viên nếu người dùng đồng ý
                const deleteUser = await axios.post(
                  `${ip}/chat/removeUserFromGroup`,
                  {
                    chatId: route._id,
                    userId: userId,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userData.token}`,
                    },
                  }
                );
                Alert.alert("Thông báo", "Thành viên đã được xóa thành công");
                // console.log("Thành viên đã được xóa thành công");
              } catch (error) {
                console.log("Đã xảy ra lỗi khi xóa thành viên:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      if (!userDataString) {
        console.log("userData không tồn tại trong AsyncStorage");
        return;
      }

      if (!userData || !userData._id) {
        console.log("Dữ liệu userData không hợp lệ");
        return;
      }

      const isAdmin = route.groupAdmin._id === userData._id;
      if (!isAdmin) {
        Alert.alert("Cảnh báo", "Bạn không phải admin");
        return;
      }

      // Hiển thị cửa sổ thông báo hỏi người dùng có muốn xóa thành viên không
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn xóa thành viên này?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: async () => {
              try {
                // Gửi yêu cầu xóa thành viên nếu người dùng đồng ý
                const deleteUser = await axios.post(
                  `${ip}/chat/removeAllUserFromGroup`,
                  {
                    chatId: route._id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userData.token}`,
                    },
                  }
                );
                console.log("Nhóm đã xóa thành công");
                Alert.alert(
                  "Thông báo",
                  "Nhóm " + route.chatName + " đã được xóa"
                );
                navigation.navigate("MessageTC");
              } catch (error) {
                console.log("Đã xảy ra lỗi khi xóa thành viên:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMember = () => {
    // Xử lý logic khi người dùng chọn thêm thành viên
    getUser();
    openFriendListModal();
  };

  const handleAssignGroupAdmin = async (userId) => {
    // xử lý khi người dùng chọn gán quyền nhóm trưởng
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      if (!userDataString) {
        console.log("userData không tồn tại trong AsyncStorage");
        return;
      }

      if (!userData || !userData._id) {
        console.log("Dữ liệu userData không hợp lệ");
        return;
      }

      const isAdmin = route.groupAdmin._id === userData._id;
      if (!isAdmin) {
        Alert.alert("Cảnh báo", "Bạn không phải admin");
        return;
      }

      // Hiển thị cửa sổ thông báo hỏi người dùng có muốn xóa thành viên không
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn chuyển quyền trưởng nhóm cho thành viên này?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Chuyển",
            onPress: async () => {
              try {
                // Gửi yêu cầu xóa thành viên nếu người dùng đồng ý
                const deleteUser = await axios.post(
                  `${ip}/chat/sendGoldkey`,
                  {
                    chatId: route._id,
                    newOwnGroup: userId,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userData.token}`,
                    },
                  }
                );
                Alert.alert("Thông báo", "Thành viên đã được xóa thành công");
                // console.log("Thành viên đã được xóa thành công");
              } catch (error) {
                console.log("Đã xảy ra lỗi khi xóa thành viên:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  };
  const handleRenameGroup = async () => {
    // Xử lý logic khi người dùng xác nhận sửa đổi tên nhóm
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);

      if (!userDataString) {
        console.log("userData không tồn tại trong AsyncStorage");
        return;
      }

      if (!userData || !userData._id) {
        console.log("Dữ liệu userData không hợp lệ");
        return;
      }

      // Hiển thị cửa sổ thông báo hỏi người dùng có muốn đổi tên nhóm không
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn đổi tên nhóm này thành " + newChatName + " ???",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Đổi",
            onPress: async () => {
              try {
                // Gửi yêu cầu xóa thành viên nếu người dùng đồng ý
                const reNameChat = await axios.post(
                  `${ip}/chat/renameGroupChat`,
                  {
                    chatId: route._id,
                    chatName: newChatName,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userData.token}`,
                    },
                  }
                );
                console.log("Đã sửa đổi tên nhóm thành:", newChatName);
                setRenameModalVisible(false); // Đóng modal sau khi xác nhận
                navigation.navigate("MessageTC");
              } catch (error) {
                console.log("Đã xảy ra lỗi khi đổi tên nhóm:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const openRenameModal = () => {
    setNewChatName(route.chatName); // Đặt tên nhóm hiện tại vào trường nhập liệu
    setRenameModalVisible(true);
  };

  const closeRenameModal = () => {
    setRenameModalVisible(false);
  };
  //// FFFFFFFFFFFFFFFont danh trang GROUD
  return (
    <Modal visible={true} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.chatName}>{route.chatName}</Text>
        <Text style={styles.member}>Danh sách thành viên</Text>
        <ScrollView horizontal={true}>
          <View style={styles.membersContainer}>
            {/* Sắp xếp danh sách thành viên */}
            {route.users
              .sort((a, b) => {
                if (a._id === route.groupAdmin._id) return -1; // Đặt admin ở đầu danh sách
                if (b._id === route.groupAdmin._id) return 1;
                return 0;
              })
              .map((user) => (
                <TouchableOpacity
                  key={user._id}
                  style={[
                    styles.memberButton,
                    selectedMemberId === user._id &&
                      styles.selectedMemberButton,
                  ]}
                  onPress={() => {
                    setSelectedMemberId(user._id);
                  }}
                >
                  {user._id === route.groupAdmin._id && (
                    <Icon
                      name="key"
                      size={18}
                      color="#FFD700"
                      style={styles.adminIcon}
                    />
                  )}
                  <Text style={styles.memberName}>{user.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <View style={styles.allButton}>
            <View style={styles.buttonRow}>
              <Button title="Thêm thành viên" onPress={handleAddMember} />
              {isAdmin && (
                <Button
                  title="Xóa thành viên"
                  onPress={() => handleDeleteMember(selectedMemberId)}
                />
              )}
            </View>
            {isAdmin && (
              <View style={styles.buttonRow}>
                <Button title="Xóa nhóm" onPress={handleDeleteGroup} />
                <Button title="Đổi tên nhóm" onPress={openRenameModal} />
              </View>
            )}
            <View style={styles.buttonRow}>
              <Button
                title="Gán quyền nhóm trưởng"
                onPress={()=>{handleAssignGroupAdmin(selectedMemberId)}}
              />
            </View>
          </View>
        </View>
        <Button title="Đóng" onPress={onClose} />

        {/* Modal danh sách bạn bè */}
        <Modal visible={isFriendListModalVisible} animationType="slide">
          <SafeAreaView style={styles.containerListAddFiend}>
            <Text style={styles.titleListAddFiend}>
              Danh sách bạn bè có thể thêm vào nhóm {route.chatName}
            </Text>
            <ScrollView style={styles.scrollViewListAddFiend}>
              {friendList.map((friend) => (
                <TouchableOpacity
                  style={styles.memberButtonListAddFiend}
                  key={friend._id}
                  onPress={() => handleSelectFriend(friend._id)}
                >
                  <Text style={styles.memberButtonTextListAddFiend}>{friend.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButtonListAddFiend}
              onPress={closeFriendListModal}
            >
              <Text style={styles.closeButtonTextListAddFiend}>Đóng</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        {/* Modal sửa đổi tên nhóm */}
        <Modal visible={isRenameModalVisible} animationType="slide">
          <SafeAreaView style={styles.containerGroup}>
            <View style={styles.contentGroup}>
              <Text style={styles.titleGroup}>Thay đổi tên nhóm</Text>
              <TextInput
                style={styles.inputGroup}
                onChangeText={setNewChatName}
                value={newChatName}
                placeholder="Nhập tên mới cho nhóm"
                placeholderTextColor="#A9A9A9"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.buttonRowGroup}>
                <TouchableOpacity
                  style={styles.confirmButtonGroup}
                  onPress={handleRenameGroup}
                >
                  <Text style={styles.buttonTextGroup}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButtonGroup}
                  onPress={closeRenameModal}
                >
                  <Text style={styles.buttonTextGroup}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Modal>
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
  updateGroudName: {},
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
  member: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    // left: 0
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  chatName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  membersContainer: {
    flexDirection: "column",
  },
  memberButton: {
    alignItems: "baseline",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    width: 350,
    maxWidth: 360,
  },
  selectedMemberButton: {
    backgroundColor: "#e0e0e0",
  },
  adminIcon: {
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
  },
  allButton: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  buttonsContainer: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  memberButtonWaitAccept: {
    alignItems: "baseline",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    width: 350,
    maxWidth: 360,
  },
  //   modal ửa tên nhóm
  containerGroup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentGroup: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  titleGroup: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputGroup: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonRowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmButtonGroup: {
    backgroundColor: "#3498DB",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonGroup: {
    backgroundColor: "#E74C3C",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonTextGroup: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  //modal them ban be ne
  containerListAddFiend: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  titleListAddFiend: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollViewListAddFiend: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
  },
  memberButtonListAddFiend: {
    backgroundColor: '#3498DB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  memberButtonTextListAddFiend: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButtonListAddFiend: {
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeButtonTextListAddFiend: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SendMessageGroup;
