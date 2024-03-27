import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Phonebook() {
  const [activeForm, setActiveForm] = useState("friend");
  const [activeForm1, setActiveForm1] = useState("all");
  const [selectedChar, setSelectedChar] = useState(null);
  const [showCharBar, setShowCharBar] = useState(true);

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  const handleCharPress = (char) => {
    setSelectedChar(char);
  };

  const handlePress = (form) => {
    setActiveForm(form);
    setActiveForm1(form);
    setShowCharBar(form !== "recent");
  };
  const renderForm = () => {
    // If activeForm is null, default to "friend"
    const formToShow = activeForm || "friend";
    const formToShow1 = activeForm1 || "all";

    return (
      <View style={{ position: "relative", flex: 1, marginLeft: 10 }}>
        {(formToShow === "friend" ||
          formToShow1 === "all" ||
          formToShow1 === "recent") && (
            <View style={styles.tabContainer}>
              <View style={styles.tabItem}>
                <View style={{ marginLeft: 15 }}>
                  <FontAwesome5 name="user-friends" size={24} color="black" />
                </View>

                <Text style={styles.tabText}>Lời mời kết bạn</Text>
              </View>
              <View style={styles.tabItem}>
                <View style={{ marginLeft: 15 }}>
                  <AntDesign name="contacts" size={24} color="black" />
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.tabText}>Danh bạ máy</Text>
                  <Text style={styles.subText}>Liên hệ có dùng Zalo</Text>
                </View>
              </View>
              
            </View>
          )}
        {formToShow === "group" && (
          <View style={{}}>
            <View style={styles.tabContainer2}>
              <View style={{ flex: 2, flexDirection: "row", alignItems: 'center', top: 10 }}>
                <Image
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                  source={require("../assets/newgrp.png")}
                />
                <Text style={{ fontSize: 20 }}> Tạo nhóm mới</Text>
                
              </View>
              <View style={styles.separator}></View>

              {/* <View>
                  <Text style={{ fontWeight: '600', fontSize: 15 }}>Tính năng nổi bật</Text>
                </View> */}

              <View style={{ flexDirection: "column" }}>
                <View style={{ left: 20, bottom: 10 }}>
                  <Text style={{ fontWeight: '600', fontSize: 15 }}>Tính năng nổi bật</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>

                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{ width: 70, height: 70, resizeMode: 'contain' }}
                      source={require("../assets/tool1.png")}
                    />
                    <Text style={{ fontWeight: '450', fontSize: 15 }}>Lịch</Text>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{ width: 70, height: 70, resizeMode: 'contain' }}
                      source={require("../assets/tool2.png")}
                    />
                    <Text style={{ fontWeight: '450', fontSize: 15 }}>Nhắc hẹn</Text>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{ width: 70, height: 70, resizeMode: 'contain' }}
                      source={require("../assets/tool3.png")}
                    />
                    <Text style={{ fontWeight: '450', fontSize: 15 }}>Nhóm online</Text>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{ width: 70, height: 70, resizeMode: 'contain' }}
                      source={require("../assets/tool4.png")}
                    />
                    <Text style={{ fontWeight: '450', fontSize: 15 }}>Chia sẻ ảnh</Text>
                  </View>

                </View>
              </View>

              <View style={styles.separator}></View>

              <View style={{ flexDirection: "column" }}>
                <View style={{ left: 20, bottom: 10 }}>
                  <Text style={{ fontWeight: '600', fontSize: 15 }}>Nhóm đang tham gia</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
                  <Image
                    style={{ width: 70, height: 70, resizeMode: 'contain' }}
                    source={require("../assets/grp1.png")}
                  />
                  <Image
                    style={{ width: 70, height: 70, resizeMode: 'contain' }}
                    source={require("../assets/grp2.png")}
                  />
                  <Image
                    style={{ width: 70, height: 70, resizeMode: 'contain' }}
                    source={require("../assets/grp3.png")}
                  />
                  <Image
                    style={{ width: 70, height: 70, resizeMode: 'contain' }}
                    source={require("../assets/grp5.png")}
                  />
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
    <ScrollView>
      {/* Phần background của ứng dụng */}
      {/* ----- */}

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

      {/* Phần chứa các tab và nội dung */}
      <View
        style={{
          width: 420,
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 5,
          right: 27,
          top: 3
        }}
      >
        {/* Tab "Bạn bè" */}

        <Pressable
          onPress={() => handlePress("friend")}
          style={[activeForm === "friend" && styles.activeTab,]}
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


        {/* Tab "Nhóm" */}
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

      {/* Đường kẻ phân cách giữa các phần */}
      <View
        style={{ borderWidth: 1, borderColor: "#C6C4C4", width: 420 }}
      ></View>

      {/* Nội dung tương ứng với tab được chọn */}
      {renderForm()}
    </ScrollView>
  );
}

// StyleSheet để tạo kiểu cho các phần giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  activeTabText1: {
    right: 10
  },
  tabContainer: {
    top:20,
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
    fontSize: 45,
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
    borderColor: 'blue',
  },
  activeTabText: {
    color: "blue",
    justifyContent: 'center',
    alignItems: 'center'
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
    resizeMode: 'contain'
  },
  tabContainer2: {
    backgroundColor: 'white'
  }
});
