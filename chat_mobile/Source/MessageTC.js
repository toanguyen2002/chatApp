import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageTC = ({ navigation }) => {
  const rou = useRoute();
  const [userData, setUserData] = useState(null);
  const [dataChatBox, setDataChatBox] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);

        const response = await axios.get("http://192.168.0.236:5678/chat/", {
          headers: {
            Authorization: `Bearer ${userDataObject.token}`,
          },
        });
        setDataChatBox(response.data);
        // console.log(response.data)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const getChat = async () => {
  //     try {
  //       const chatData = await axios.get(
  //         `http://192.168.1.6:5678/chat/findChatByName?chatName=${search}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userData.token}`,
  //           },
  //         }
  //       );
  //       setUsers(chatData.data);
  //       console.log(chatData.data)
  //     } catch (error) {
  //       console.log("lỗi không tìm thấy tên ", error);
  //     }
  //   };
  //   getChat();
  // }, [search, userData]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
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
      <Text style={{ fontSize: 20 }}>{props.chatName[0]}</Text>
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
      <Text style={{ fontSize: 12 }}>{props.timeSend}</Text>
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
    fontSize:18
    
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
});

export default MessageTC;