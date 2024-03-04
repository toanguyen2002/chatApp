import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,TextInput, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";

const messages = [
  {
    id: "1",
    sender: "Alice",
    message: "Hello!",
    image: require("../assets/avt2.png"),
  },
  {
    id: "2",
    sender: "Bob",
    message: "Hi there!",
    image: require("../assets/avt3.png"),
  },
  {
    id: "3",
    sender: "Judy",
    message: "Hi there!",
    image: require("../assets/avt4.png"),
  },
  {
    id: "4",
    sender: "James",
    message: "Hi there!",
    image: require("../assets/avt5.png"),
  },
  {
    id: "5",
    sender: "Michel",
    message: "Hi there!",
    image: require("../assets/avt6.png"),
  },
];

const MessageItem = ({ sender, message, image }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SenddMessage'); // Chuyển hướng sang màn hình Send
  };

  return (
    <TouchableOpacity style={styles.messageContainer} onPress={handlePress}>
      <Image source={image} style={styles.image} />
      <View style={styles.messageContent}>
        <Text style={styles.sender}>{sender}</Text>
        <Text>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MessageTC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", backgroundColor: "blue", height: 50, alignItems: "center", justifyContent: 'center' }}>
          {/* Icon tìm kiếm */}
          <AntDesign name="search1" size={25} color="white" />
          <View style={{ marginLeft: 20, marginTop: 2 }}>
            {/* Text hiển thị "Tìm kiếm" */}
            <TextInput
              placeholder="Tìm kiếm"
              style={{
                width: 200,
                fontSize: 18,
                color: "white",
                outlineStyle: "none",
              }}
            ></TextInput>
          </View>
          {/* ----- */}

          {/* Icon thêm bạn bè */}
          <View style={{ marginLeft: 100 }}>
            <AntDesign name="adduser" size={30} color="white" />
          </View>
        </View>
      </View>

        
      </View>
      <View style={styles.container1}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageItem sender={item.sender} message={item.message} image={item.image} />}
          keyExtractor={(item) => item.id}
          
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000FF",
    width: "100%",
  },
  imageContainer: {
    width: "40px",
    height: "40px",
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
    resizeMode:'contain'
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
