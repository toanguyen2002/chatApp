import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { io } from 'socket.io-client';
//123
const MessageItem = (props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SenddMessage'); // Navigate to SendMessage screen
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ fontSize: 20 }}>{props.chatName[0]}</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.chatName}</Text>
      {props.lastMessage ? (props.lastMessage.typeMess === 'text' ? <Text style={{ fontSize: 14 }}>{props.lastMessage.content}</Text> : <Text style={{ fontSize: 14 }}>hình ảnh</Text>) : <Text></Text>}
      <Text style={{ fontSize: 12 }}>{props.timeSend}</Text>
    </TouchableOpacity>
  );
};

const MessageTC = () => {
  const rou = useRoute();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [dataChatBox, setDataChatBox] = useState([]);
  
  
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const renderChatBox = async () => {
    try {
      const dataRender = await axios.get("http://localhost:5678/chat/", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setDataChatBox(dataRender.data);
      console.log(dataRender.data);
    } catch (error) {
      console.log("khong lay duoc list chat box tu database");
    }
  };

  useEffect(() => {
    renderChatBox();
  }, []);

  useEffect(() => {
    const getChat = async () => {
      try {
        const chatData = await axios.get(`http://localhost:5678/chat/findChatByName?chatName=${search}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          }
        });
        setUsers(chatData.data);
      } catch (error) {
        console.log("Error fetching chat data by name");
      }
    };
    getChat();
  }, [search]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={require("../assets/zalo.png")}
          placeholder="tìm kiếm"
        />
        <Text>{userData.name}</Text>
      </View>
      <View style={styles.container1}>
        {dataChatBox.map((item, index) => {
          if (item.isGroup === false) {
            if (userData._id === item.users[0]._id) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000FF",
    width: "100%",
    flexDirection: "row"
  },
  imageContainer: {
    width: 40,
    height: 40,
    top: 12,
  },
  container1: {
    flex: 9,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default MessageTC;
