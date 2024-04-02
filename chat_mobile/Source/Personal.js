import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function User({ navigation }) {
  // Styles
  
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <AntDesign name="search1" size={25} color="white" style={styles.searchIconContainer} />
          <View style={styles.searchIconContainer}>
            <TextInput
              placeholder="Tìm kiếm"
              style={styles.input}
            ></TextInput>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Setting");
            }}
            style={styles.settingsIconContainer}
          >
            <SimpleLineIcons
              name="settings"
              size={24}
              color="white"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.innerSectionContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/avt1.png")}
              style={styles.avatarImage}
            ></Image>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userNameText}>Võ Minh Toàn</Text>
              <Text style={styles.viewProfileText}>Xem trang cá nhân</Text>
            </View>
            <View style={styles.exchangeIconContainer}>
              <FontAwesome
                name="exchange"
                size={24}
                color="black"
              />
            </View>
          </View>

          <View style={styles.sectionDivider}></View>

          {/* Các phần khác tương tự */}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = {
  container: {
    flexDirection: "row",
    backgroundColor: "blue",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIconContainer: {
    marginLeft: 20,
    marginTop: 2,
  },
  input: {
    width: 200,
    fontSize: 18,
    color: "white",
    outlineStyle: "none",
  },
  settingsIconContainer: {
    marginLeft: 90,
  },
  sectionContainer: {
    width: 420,
    height: 1000,
    backgroundColor: "#DCDCDC",
  },
  innerSectionContainer: {
    width: 420,
    height: 470,
    backgroundColor: "white",
  },
  avatarImage: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 90,
  },
  userInfoContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  userNameText: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 400,
  },
  viewProfileText: {
    fontSize: 15,
    marginLeft: 20,
  },
  exchangeIconContainer: {
    marginTop: 20,
    marginLeft: 130,
  },
  sectionDivider: {
    borderWidth: 3,
    borderColor: "#D3D3D3",
    width: 420,
    marginTop: 20,
  },
};

