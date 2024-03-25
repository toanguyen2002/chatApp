import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageTC = () => {
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

        const response = await axios.get("http://172.20.10.3:5678/chat/", {
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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={require("../assets/zalo.png")}
          placeholder="tìm kiếm"
        />
        <Text>{userData && userData.name}</Text>
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
    backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    width: 40,
    height: 40,
    top: 12,
  },
  container1: {
    flex: 9,
    backgroundColor: "blue",
    padding: 10,
  },
});

export default MessageTC;
