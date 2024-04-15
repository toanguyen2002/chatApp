import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ip = "192.168.110.194";
const socket = io("http://localhost:5678");
export default function NewGroup({ navigation }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [checkedUsers, setCheckedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const response = await axios.post(
          `http://${ip}:5678/user/getUserAccept`,
          {
            name: userData.name,
            userId: userData._id,
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, userId]);
  };

  const handleDeselectUser = (userId) => {
    setCheckedUsers((prevCheckedUsers) =>
      prevCheckedUsers.filter((id) => id !== userId)
    );
  };

  const createGroupChat = async () => {
    try {
      const filteredCheckedUsers = checkedUsers.filter(item => item !== undefined);
      console.log('====================================');
      console.log(filteredCheckedUsers);
      console.log('====================================');
      if (checkedUsers.length === 0) {
        Alert.alert("Thông báo", "Bạn chưa chọn thành viên!!!!!");
        return;
      }
      if (name === "") {
        Alert.alert("Thông báo", "Bạn chưa nhập tên nhóm!!!!!");
        return;
      }
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const response = await axios.post(
        `http://${ip}:5678/chat/createGroupChat`,
        {
          name: name,
          users: JSON.stringify(filteredCheckedUsers),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      const responseData = response.data;
      // Gửi thông báo tới server socket khi nhóm mới được tạo
      socket.emit("new-group", responseData);
      // Đóng modal hoặc thực hiện các thao tác khác sau khi tạo nhóm thành công
      clockModal(false);
      Alert.alert("Thông báo", "Tạo thành công nhóm " + name);
    } catch (error) {
      console.log("Error creating group chat: ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ top: 13, left: 5 }}>
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
        </View>
        <View style={{ flexDirection: "column ", left: 15, top: 5 }}>
          <Text style={styles.nameGroup}>Nhóm mới</Text>
          <Text></Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.iconUser}>
          <AntDesign name="addusergroup" size={40} color="#1E90FF" />
        </View>
        <View></View>
        <View style={{ left: 30 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Đặt tên nhóm"
            value={name} // Giá trị hiện tại của TextInput là name
            onChangeText={text => setName(text)} // Gán giá trị mới cho name khi nội dung thay đổi
          ></TextInput>

        </View>
        <View style={styles.iconButton}>
          <Pressable
            style={[
              styles.buttonText,
            ]}
            onPress={createGroupChat}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.friendList}>
        <View>
          <Text style={{ fontSize: 17 }}>Danh sách bạn bè</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#C6E2FF",
            borderRadius: 5,
            right: 5,
          }}
        >
          <View>
            {users.map((item, index) => (
              <React.Fragment key={item.id || index.toString()}>
                <MessageItem
                  id={item._id}
                  name={item.name}
                  onSelect={handleSelectUser}
                  onDeselect={handleDeselectUser}
                />
                {index !== users.length - 1 && (
                  <View style={styles.separator1} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const MessageItem = ({ id, name, onSelect, onDeselect }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onSelect(id);
    } else {
      onDeselect(id);
    }
  };

  return (
    <TouchableOpacity onPress={handleCheck}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 4 }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderRadius: 4,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isChecked ? "#1E90FF" : "transparent",
          }}
        >
          {isChecked && (
            <AntDesign name="check" size={18} color="white" />
          )}
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#1E90FF",
    marginTop: 50,
  },
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  friendList: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  nameGroup: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    marginTop: 10,
  },
  iconUser: {
    left: 3,
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    height: 35,
    width: 60,
    borderRadius: 100,
  },
  buttonDisabled: {
    backgroundColor: "#aaa", // Màu tối
  },
  iconButton: {
    top: 5,
    left: 40,
  },
  textInput: {
    height: 40,
    backgroundColor: "white",
    width: 200,
    fontSize: 17,
  },
  separator1: {
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 5,
    marginVertical: 10,
    borderRadius: 20,
  },
});
