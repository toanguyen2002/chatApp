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
            <View style={styles.tabItem}>
              <View style={{ marginLeft: 15 }}>
                <FontAwesome name="birthday-cake" size={24} color="black" />
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text style={styles.tabText}>Lịch sinh nhật</Text>
                <Text style={styles.subText}>
                  Theo dõi sinh nhật của bạn bè
                </Text>
              </View>
            </View>
            <View style={styles.separator}></View>
            
            <View style={styles.tabButtonsContainer}>
              <Pressable
                onPress={() => handlePress("all")}
                style={[
                  styles.tabButton,
                  activeForm1 === "all" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeForm1 === "all" && styles.activeTabText,
                  ]}
                >
                  Tất cả
                </Text>
              </Pressable>
             
             
              <Pressable
                onPress={() => handlePress("recent")}
                style={[
                  styles.tabButton,
                  activeForm1 === "recent" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeForm1 === "recent" && styles.activeTabText,
                  ]}
                >
                  Mới truy cập
                </Text>
              </Pressable>
            </View>
            {showCharBar && (
              <ScrollView horizontal style={styles.charBar}>
                {alphabet.map((char) => (
                  <Pressable
                    key={char}
                    onPress={() => handleCharPress(char)}
                    style={[
                      styles.charButton,
                      selectedChar === char && styles.selectedChar,
                    ]}
                  >
                    <Text style={styles.charText}>{char}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        )}
        {activeForm1 === "all" && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Hiển thị nội dung</Text>
          </View>
        )}
        {activeForm1 === "recent" && (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.subtitle}>
              Cho phép hiển thị trạng thái truy cập
            </Text>
            <Text style={styles.description}>
              Bạn có thể thấy khi bạn bè truy cập. Bạn bè cũng xem được trạng
              thái truy cập của bạn
            </Text>
            <Pressable style={styles.allowButton}>
              <Text style={styles.allowButtonText}>Cho phép</Text>
            </Pressable>
          </ScrollView>
        )}

        {formToShow === "group" && (
          <View style={{}}>
            <View style={styles.tabContainer2}>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/zalo.png")}
                />
                <Text style={styles.textContainer2}> Tạo nhóm mới</Text>
              </View>
              <View style={styles.separator}></View>
              <View style={{ flex: 1,flexDirection:"row",justifyContent:"space-around", marginBottom:20 }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/zalo.png")}
                />
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/zalo.png")}
                />
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/zalo.png")}
                />
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/zalo.png")}
                />
              </View>
              <View style={styles.separator}></View>

              <View></View>
            </View>
          </View>
        )}
         {formToShow === "qa" && (
          <View style={{ backgroundColor: "#DCDCDC", width: 420, height: 800 }}>
            <View style={{ backgroundColor: "white", width: 420, height: 500 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/zalo.png")}
                  style={styles.image}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Tìm thêm Official Account
                </Text>
              </View>

              <View>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Official Account đang quan tâm
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/zalo.png")}
                  style={styles.image}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  ZaloPay
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/zalo.png")}
                  style={styles.image}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Zalo Official Account
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/zalo.png")}
                  style={styles.image}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Zing MP3
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      
    );
  };
  return (
    <ScrollView>
      {/* Phần background của ứng dụng */}
      <ImageBackground
        source={require("../assets/zalo.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            {/* Icon tìm kiếm */}
            <Image
              source={require("../assets/zalo.png")}
              style={{ width: 30, height: 30, marginLeft: 20 }}
            ></Image>
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
            {/* Icon thêm bạn bè */}
            <View style={{ marginLeft: 100 }}>
              <AntDesign name="adduser" size={30} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Phần chứa các tab và nội dung */}
      <View
        style={{
          width: 420,
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* Tab "Bạn bè" */}
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

        {/* Tab "QA" */}
        <Pressable
          onPress={() => handlePress("qa")}
          style={[activeForm === "qa" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeForm === "qa" && styles.activeTabText1,
            ]}
          >
            QA
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
  activeTabText1: {},
  tabContainer: {
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
    backgroundColor: "#2D4ADF",
  },
  activeTabText: {
    color: "white",
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
  image:{
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 90,
  },
});
