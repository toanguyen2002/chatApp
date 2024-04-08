import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ip = "192.168.110.193";
const socket = io("http://localhost:5678")
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
    socket.emit("setup", userData)
    socket.on("connect", () => {
        // socket.on("disconnect", () => {
        //     console.log("mess", socket);
        //     console.log(`Socket disconnected: ${socket.id}`);
        // });
    })
    socket.emit("render-box-chat", true)
}, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
        const response = await axios.get("http://" + ip + ":5678/chat/", {
          headers: {
            Authorization: `Bearer ${userDataObject.token}`,
          },
        });
        setDataChatBox(sortByDateSend(response.data));
        socket.emit("render-box-chat", true)
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
  return (

    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} >
        <View style={styles.container}>
          <View style={styles.search}>
            <AntDesign name="search1" size={25} color="white" />
          </View>
          <Text style={styles.username}>{userData && userData.name}</Text>
          <Pressable style={styles.plus} onPress={toggleModal}>
            <AntDesign name="plus" size={25} color="white" />
          </Pressable>
        </View>

        <View style={styles.container1}>
          {dataChatBox.map((item, index) => {
            if (item.isGroup === false) {
              if (userData && userData._id === item.users[0]._id) {
                item.chatName = item.users[1].name;
              } else {

                item.chatName = item.users[0].name;
              }
            }
            return <MessageItem {...item} key={index} />;
          })}
        </View>

      </KeyboardAvoidingView>


      {/* Modal */}

      <Modal visible={isModalVisible} transparent={true} animationType="none">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Pressable style={{ flexDirection: "row" }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="adduser" size={25} color="#A9A9A9" />
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
                  style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="addusergroup" size={25} color="#A9A9A9" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Tạo nhóm
                    </Text>
                  </View>
                </Pressable>
                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="cloudo" size={25} color="#A9A9A9" />
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

      {/* Modal */}
    </View>
  );
};

const MessageItem = (props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("SenddMessage", props); // Navigate to SendMessage screen
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
        <View style={styles.ChatName}>
          <Text style={styles.Name}>{props.chatName[0]}</Text>
        </View>
        <View style={{ flex: 1,  }}>
          <View style={styles.TextChat}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.chatName}</Text>
            {props.lastMessage ? (
              props.lastMessage.typeMess === "text" ? (
                <Text style={{ fontSize: 14 }}>{props.lastMessage.content}</Text>
              ) : (
                <Text style={{ fontSize: 14 }}>hình ảnh</Text>
              )
            ) : (
              <Text></Text>
            )}
          </View>
          {props.lastMessage && props.lastMessage.dateSend ? (
            <Text style={[styles.TimeStamp, { textAlign: 'right' }]}>
              {new Date(props.lastMessage.dateSend).toLocaleTimeString()}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  
  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  imageContainer: {
    width: 40,
    height: 40,
    top: 12,
  },
  container1: {
    flex: 9,
    backgroundColor: "white",
    padding: 10,
  },
  plus: {
    left: 260
  },
  search: {
    left: 10
  },
  username: {
    left: 30,
    justifyContent: "center",
    fontSize: 18

  },
  modalContainer: {
    flex: 1,
    // alignItems: "flex-end",
    // justifyContent: "flex-start",
    marginTop: 60,
    marginLeft: 160,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    height: 320,
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
    fontWeight: "bold"
  },
  TextChat: {
    left: 15,
    justifyContent: "center",
    alignItems: "center",


  }
});

export default MessageTC;