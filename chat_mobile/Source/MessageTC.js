import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { io } from "socket.io-client";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = "https://mail.getandbuy.shop";

const socket = io("http://localhost:5678");
const MessageTC = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [dataChatBox, setDataChatBox] = useState([]);
  const sortByDateSend = (arr) => {
    return arr.slice().sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0; // Nếu lastMessage rỗng, không cần sắp xếp
      const dateA = new Date(a.lastMessage.dateSend);
      const dateB = new Date(b.lastMessage.dateSend);
      return dateB - dateA; // Sắp xếp giảm dần
    });
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
        const response = await axios.get(ip + "/chat/", {
          headers: {
            Authorization: `Bearer ${userDataObject.token}`,
          },
        });
        setDataChatBox(sortByDateSend(response.data));
        socket.emit("render-box-chat", true);
        // console.log(response.data)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dataChatBox]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //ở đây
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        {/* Phần header */}
        <View style={styles.header}>
          <View style={styles.usernameContainer}>
            <AntDesign
              name="search1"
              size={25}
              color="white"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập tên của bạn..."
              placeholderTextColor="white"
            />
          </View>
          <Pressable style={styles.plus} onPress={toggleModal}>
            <AntDesign name="plus" size={25} color="white" />
          </Pressable>
        </View>

        {/* Phần danh sách tin nhắn */}
        <View style={styles.chatListContainer}>
          {dataChatBox.map((item, index) => {
            if (item.isGroup === false) {
              if (userData && userData._id === item.users[0]._id) {
                item.chatName = item.users[1].name;
              } else {
                item.chatName = item.users[0].name;
              }
            }
            return (
              <View key={index}>
                <MessageItem {...item} />
                {/* Đường ngăn cách dưới mỗi tin nhắn */}
                <View style={styles.separator} />
              </View>
            );
          })}
        </View>
      </KeyboardAvoidingView>

      {/* Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="none">
        {/* Nội dung của Modal */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Pressable style={{ flexDirection: "row" }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="adduser" size={25} color="#FFF68F" />
                  </View>

                  <Pressable
                    onPress={() => {
                      navigation.navigate("AddFriend");
                      toggleModal();
                    }}
                  >
                    <View style={{ marginLeft: 10, marginTop: 2 }}>
                      <Text style={{ fontSize: 20, fontWeight: 400 }}>
                        Thêm bạn
                      </Text>
                    </View>
                  </Pressable>
                </Pressable>
                {/* ---------- */}
                <Pressable
                  onPress={() => {
                    navigation.navigate("NewGroup");
                    toggleModal();
                  }}
                  style={{ flexDirection: "row", marginTop: 25 }}
                >
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="addusergroup" size={25} color="#FFF68F" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Tạo nhóm
                    </Text>
                  </View>
                </Pressable>
                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="cloudo" size={25} color="#FFF68F" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Cloud của tôi
                    </Text>
                  </View>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const MessageItem = (props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (props.isGroup) {
      navigation.navigate("SendMessageGroup", props); // Navigate to SendMessageGroup screen
    } else {
      navigation.navigate("SenddMessage", props); // Navigate to SendMessage screen
    }
  };



  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          alignItems: "center", // Thêm thuộc tính alignItems
        }}
      >
        {/* chỗ cần style  */}
        <View style={styles.ChatName}>
          <Text style={styles.Name}>{props.chatName[0]}</Text>
        </View>
        {/* Chỗ cần style */}
        <View style={{ flex: 1 }}>
          <View style={styles.TextChat}>
            <View style={{}}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {props.chatName}
              </Text>
            </View>
            {props.lastMessage ? (
              props.lastMessage.typeMess === "text" ? (
                <Text style={{ fontSize: 14 }}>{props.lastMessage.content}</Text>
              ) : props.lastMessage.typeMess === "Multimedia" ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="file1" size={14} color="black" />
                  <Text style={{ fontSize: 14, marginLeft: 5 }}>File</Text>
                </View>
              ) : props.lastMessage.typeMess === "videoCall" ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="videocam" size={14} color="black" />
                  <Text style={{ fontSize: 14, marginLeft: 5 }}>Cuộc gọi</Text>
                </View>
              ) : null // Handle unknown message types gracefully
            ) : (
              <Text></Text> // Placeholder for no message
            )}
          </View>
          {props.lastMessage && props.lastMessage.dateSend ? (
            <Text style={[styles.TimeStamp, { textAlign: "right" }]}>
              {new Date(props.lastMessage.dateSend).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#3498DB",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  usernameContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  username: {
    marginTop: 13,
  },
  usernameView: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },

  plus: {
    paddingRight: 20,
  },
  input: {
    flex: 1,
    color: "white",
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  chatListContainer: {
    flex: 9,
    backgroundColor: "white",
    padding: 10,
  },
  separator: {
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  ChatName: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
  },
  Name: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    // alignItems: "flex-end",
    // justifyContent: "flex-start",
    marginTop: 60,
    marginLeft: 160,
  },
  modalContent: {
    backgroundColor: "#00BFFF",
    padding: 20,
    borderRadius: 10,
    width: 230,
    height: 200,
  },
  TextChat: {
    left: 15,
  },
});

export default MessageTC;