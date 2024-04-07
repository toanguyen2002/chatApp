import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { MessageTC, Personal, PhoneBook, SenddMessage, UiLogin, UiRegister, Diary, Discover } from "./Source";
import Phonebook from "./Source/Phonebook";
import AddFriend from "./Source/AddFriend";
import Friend from "./Source/Friend";
import NewGroup from "./Source/NewGroup";
import Resetpassword from "./Source/Resetpassword";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UiLogin" component={UiLogin} />
        <Stack.Screen name="MessageTC" component={MessageTC} />
        <Stack.Screen name="UiRegister" component={UiRegister} />
        <Stack.Screen name="SenddMessage" component={SenddMessage} />
        <Stack.Screen name="PhoneBook" component={PhoneBook} />
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="Friend" component={Friend} />
        <Stack.Screen name="NewGroup" component={NewGroup} />
        <Stack.Screen name="Resetpassword" component={Resetpassword} />
        {/* <Stack.Screen name="Setting" component={Setting} /> */}
      </Stack.Navigator>
      <BottomNavigation />
    </NavigationContainer>
  );
}

function BottomNavigation() {
  const navigation = useNavigation();
  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const { index, routes } = navigation.getRootState();
      setCurrentScreen(routes[index].name);
    });

    return unsubscribe;
  }, [navigation]);

  if (currentScreen === "UiLogin" || currentScreen === "UiRegister" || currentScreen === "Resetpassword" || currentScreen === "Resetpassword" || currentScreen === "AddFriend" || currentScreen === "SenddMessage"  ) {
    return null; // Ẩn BottomNavigation khi ở màn hình UiLogin
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 80,
        backgroundColor: "#fff",
      }}
    >
      <BottomTabButton
        iconName="message1"
        label="Tin nhắn"
        screenName="MessageTC"
        navigation={navigation}
      />
      <BottomTabButton
        iconName="contacts"
        label="Danh bạ"
        screenName="PhoneBook"
        navigation={navigation}
      />
      <BottomTabButton
        iconName="windows"
        label="Khám phá"
        screenName="Discover"
        navigation={navigation}
      />
      <BottomTabButton
        iconName="time-outline"
        label="Nhật ký"
        screenName="Diary"
        navigation={navigation}
      />
      <BottomTabButton
        iconName="user-o"
        label="Cá nhân"
        screenName="Personal"
        navigation={navigation}
      />
    </View>
  );
}

function BottomTabButton({ iconName, label, screenName, navigation }) {
  const handlePress = () => {
    navigation.navigate(screenName);
  };

  let IconComponent;

  // Kiểm tra xem iconName có tồn tại trong AntDesign không
  if (AntDesign?.glyphMap.hasOwnProperty(iconName)) {
    IconComponent = AntDesign;
  }
  // Kiểm tra xem iconName có tồn tại trong FontAwesome không
  else if (FontAwesome?.glyphMap.hasOwnProperty(iconName)) {
    IconComponent = FontAwesome;
  }
  // Nếu không tìm thấy trong cả AntDesign và FontAwesome, sử dụng Ionicons
  else {
    IconComponent = Ionicons;
  }

  return (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={handlePress}>
      <IconComponent name={iconName} size={24} color="black" />
      <Text style={{ color: 'black', marginTop: 5 }}>{label}</Text>
    </TouchableOpacity>
  );
}
