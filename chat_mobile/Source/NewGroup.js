import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";


export default function NewGroup({ navigation }) {
    const [users, setUsers] = useState([]);
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
          ></TextInput>
        </View>
        <View style={styles.iconButton}>
          <Pressable style={styles.buttonText}>
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
                <MessageItem {...item} />
                {index !== users.length - 1 && (
                  <View style={styles.separator1} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
        {/* Danh sách bạn bè sẽ được đặt ở đây */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#1E90FF",
    marginTop: 50,
  },
  container: {
    flexDirection: "row",
    padding:10,
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
