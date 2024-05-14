import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User({ navigation }) {
  const [userData, setUserData] = useState(null);

  const handlePress = () => {
    navigation.navigate("UiLogin");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
        // console.log(response.data)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <AntDesign
            name="search1"
            size={25}
            color="white"
            style={styles.searchIconContainer}
          />
          <View style={styles.searchIconContainer}>
            <TextInput placeholder="Tìm kiếm" style={styles.input}></TextInput>
          </View>
          <Pressable style={styles.settingsIconContainer}>
            <SimpleLineIcons name="settings" size={24} color="white" />
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
            <View></View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userNameText}>
                {userData && userData.name}
              </Text>
              <Text style={styles.viewProfileText}>
                {userData && userData.email}
              </Text>
            </View>
            <View style={styles.exchangeIconContainer}>
              <FontAwesome name="exchange" size={24} color="black" />
              <Text>hh</Text>
            </View>
          </View>
          <View style={styles.sectionDivider}></View>
        </View>

        <View>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Đăng Xuất</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = {
  container: {
    flexDirection: "row",
    backgroundColor: "#0099FF",
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
  button: {
    height: 40,
    borderRadius: 5,
    backgroundColor: "#0084ff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
};
