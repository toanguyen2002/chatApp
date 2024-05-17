import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = "https://mail.getandbuy.shop";
export default function Phonebook() {
  const navigation = useNavigation();

  const [activeForm, setActiveForm] = useState("friend");
  const [activeForm1, setActiveForm1] = useState("all");
  const [selectedChar, setSelectedChar] = useState(null);
  const [showCharBar, setShowCharBar] = useState(true);
  const [dataChatBox, setDataChatBox] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);

  const [usersNotFriend, setUsersNotFriend] = useState([]);

  // lỗi socket ở chỗ này gọi ra mà ko sài nên nó lỗi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userDataObject = JSON.parse(userDataString);
        const response = await axios.get(ip + "/chat/", {
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
  }, [dataChatBox]);

  useEffect(() => {
    const getUser = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      setUsersData(userData);
      const dataUser = await axios.post(
        `${ip}/user/getUserAccept`,
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
      setUsers(dataUser.data);
    };
    getUser();
  }, []);
  const accessChatOneToOne = async (item) => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    try {
      const respone = await axios.post(
        ip + "/chat/",
        {
          userId: item._id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(respone.data);
      // Chuyển hướng tới màn hình SendMessage với thông tin của cuộc trò chuyện vừa tạo
      navigation.navigate("SenddMessage", {
        chatId: respone.data._id,
        userName: respone.data.users[1].name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePress = (form) => {
    setActiveForm(form);
    setActiveForm1(form);
    setShowCharBar(form !== "recent");
  };

  const MessageItem = (props) => {
    const navigation = useNavigation();

    const handlePress = () => {
      accessChatOneToOne(props);
      // navigation.navigate("SenddMessage", props);
    };

    return (
      <TouchableOpacity onPress={handlePress} key={props.id}>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 4 }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#1E90FF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, color: "white" }}>
              {props.name.charAt(0)}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: "gray",
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            {props.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderForm = () => {
    const formToShow = activeForm || "friend";
    const formToShow1 = activeForm1 || "all";

    return (
      <View style={{ position: "relative", flex: 1, marginLeft: 10 }}>
        {(formToShow === "friend" ||
          formToShow1 === "all" ||
          formToShow1 === "recent") && (
          <View style={styles.tabContainer}>
            <Pressable onPress={() => navigation.navigate("Friend")}>
              <View style={styles.tabItem}>
                <View style={{ marginLeft: 15 }}>
                  <FontAwesome5 name="user-friends" size={24} color="black" />
                </View>
                <Text style={styles.tabText}>Lời mời kết bạn</Text>
              </View>
            </Pressable>
            <View style={styles.tabItem}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Danh sách bạn bè :{" "}
              </Text>
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
          </View>
        )}
        {formToShow === "group" && (
          <View style={{}}>
            <View style={styles.tabContainer2}>
              <Pressable onPress={() => navigation.navigate("NewGroup")}>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    alignItems: "center",
                    top: 10,
                  }}
                >
                  <Image
                    style={{ width: 70, height: 70, resizeMode: "contain" }}
                    source={require("../assets/newgrp.png")}
                  />
                  <Text style={{ fontSize: 20 }}> Tạo nhóm mới</Text>
                </View>
              </Pressable>
              <View style={styles.separator}></View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ left: 20, bottom: 10 }}>
                  <Text style={{ fontWeight: 600, fontSize: 15 }}>
                    Tính năng nổi bật
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 70, height: 70, resizeMode: "contain" }}
                      source={require("../assets/tool1.png")}
                    />
                    <Text style={{ fontWeight: 400, fontSize: 15 }}>Lịch</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 70, height: 70, resizeMode: "contain" }}
                      source={require("../assets/tool2.png")}
                    />
                    <Text style={{ fontWeight: 400, fontSize: 15 }}>
                      Nhắc hẹn
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 70, height: 70, resizeMode: "contain" }}
                      source={require("../assets/tool3.png")}
                    />
                    <Text style={{ fontWeight: 400, fontSize: 15 }}>
                      Nhóm online
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 70, height: 70, resizeMode: "contain" }}
                      source={require("../assets/tool4.png")}
                    />
                    <Text style={{ fontWeight: 400, fontSize: 15 }}>
                      Chia sẻ ảnh
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.separator}></View>

              <View style={{ flexDirection: "column" }}>
                <View style={{ left: 20, bottom: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    Nhóm đang tham gia :
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 20,
                  }}
                >
                  {/* bạn thêm chữ cái đầu làm avatar được không  */}
                  {/* ở đây */}
                  <View style={styles.container1}>
                    {dataChatBox
                      .filter((item) => item.isGroup === true)
                      .map((item, index) => (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("SenddMessage", item)
                          }
                          key={item._id || index.toString()}
                          style={styles.itemContainer}
                        >
                          <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>
                              {item.chatName.charAt(0).toUpperCase()}
                            </Text>
                          </View>
                          <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>
                              {item.chatName}
                            </Text>
                            {item.lastMessage ? (
                              item.lastMessage.typeMess === "text" ? (
                                <Text style={styles.itemMessage}>
                                  {item.lastMessage.content}
                                </Text>
                              ) : (
                                <Text style={styles.itemMessage}>hình ảnh</Text>
                              )
                            ) : (
                              <View style={styles.separator3} />
                            )}
                            <Text style={styles.itemTime}>{item.timeSend}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
              </View>
              <View style={styles.separator}></View>
              <View></View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView>
        <View>
          <View style={{ marginBottom: 50 }}></View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#3498DB",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="search1" size={25} color="white" />
            <View style={{ marginLeft: 5, marginTop: 2 }}>
              <TextInput
                placeholder="Tìm kiếm"
                style={{
                  width: 200,
                  fontSize: 18,
                  color: "white",
                }}
              ></TextInput>
            </View>
            <Pressable onPress={() => navigation.navigate("AddFriend")}>
              <View style={{ marginLeft: 100 }}>
                <AntDesign name="adduser" size={30} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            width: 420,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 5,
            right: 27,
            top: 3,
          }}
        >
          <Pressable
            onPress={() => handlePress("friend")}
            style={[activeForm === "friend" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeForm === "friend" && styles.activeTabText1,
              ]}
            >
              Bạn bè
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress("group")}
            style={[activeForm === "group" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeForm === "group" && styles.activeTabText1,
              ]}
            >
              Nhóm
            </Text>
          </Pressable>
        </View>
        <View
          style={{ borderWidth: 1, borderColor: "#C6C4C4", width: 420 }}
        ></View>
        {renderForm()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  activeTabText1: {
    right: 10,
  },
  tabContainer: {
    top: 20,
    marginBottom: 20,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tabText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "400",
  },
  subText: {
    marginLeft: 20,
    fontSize: 15,
  },
  textContainer2: {},
  separator: {
    borderWidth: 3,
    borderColor: "#C6C4C4",
    width: "100%",
    marginVertical: 20,
    fontSize: 4,
  },
  tabButtonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2D4ADF",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "blue",
  },
  activeTabText: {
    color: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  charBar: {
    flexDirection: "row",
    marginBottom: 20,
  },
  charButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#2D4ADF",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedChar: {
    backgroundColor: "#2D4ADF",
  },
  charText: {
    fontSize: 18,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
  },
  allowButton: {
    width: 200,
    height: 50,
    backgroundColor: "#CECDFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  allowButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
  allowButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
  image: {
    width: 70,
    height: 70,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 90,
    resizeMode: "contain",
  },
  tabContainer2: {
    backgroundColor: "white",
  },
  container1: {
    flexDirection: "column",
    //style của nhóm chat
    flex: 9,
    backgroundColor: "#98F5FF",
    padding: 1,
    width: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  separator1: {
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 5,
    marginVertical: 10,
    borderRadius: 20,
  },
  listFriend: {
    // backgroundColor: "red"
  },
  customStyle: {
    color: "black",
  },
  separator3: {
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
 itemContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
},
avatarContainer: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#1E90FF",
  justifyContent: "center",
  alignItems: "center",
},
avatarText: {
  fontSize: 24,
  color: "white",
},
itemContent: {
  marginLeft: 10,
},
itemTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginTop:10
},
itemMessage: {
  fontSize: 14,
},
itemTime: {
  fontSize: 12,
},

});
