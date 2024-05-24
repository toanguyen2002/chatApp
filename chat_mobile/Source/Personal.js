import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

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
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.profileSection}>
        <View style={styles.profileContainer}>
          <Image source={require("../assets/avt1.png")} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData && userData.name}</Text>
            <Text style={styles.userEmail}>{userData && userData.email}</Text>
          </View>
          <Pressable style={styles.exchangeButton}>
            <AntDesign name="checkcircleo" size={24} color="green" backgroundColor = "" />
          </Pressable>
        </View>
        <View style={styles.separator} />
        <Pressable style={styles.logoutButton} onPress={handlePress}>
          <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10, // Ensure enough space for the bottom tab bar
    marginTop: 10
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#0099FF",
    padding: 10,
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
  settingsButton: {
    marginLeft: 10,
  },
  profileSection: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    height: "auto"
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfo: {
    flex: 1,
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  exchangeButton: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: "#0084ff",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: "157%"
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
