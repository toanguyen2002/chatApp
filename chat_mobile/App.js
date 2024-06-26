import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity ,StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import 'react-native-reanimated';

import Phonebook from "./Source/Phonebook";
import AddFriend from "./Source/AddFriend";
import Friend from "./Source/Friend";
import NewGroup from "./Source/NewGroup";
import Resetpassword from "./Source/Resetpassword";
import WebViewScreen from "./Source/WebViewScreen";
import SendMessageGroup from "./Source/SendMessageGroup";
import UiRegister from "./Source/UiRegister";
import UiLogin from "./Source/UiLogin";
import MessageTC from "./Source/MessageTC";
import SenddMessage from "./Source/SenddMessage";
import Personal from "./Source/Personal"
import Diary from "./Source/Diary"
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UiLogin" component={UiLogin} />
        <Stack.Screen name="MessageTC" component={MessageTC} />
        <Stack.Screen name="UiRegister" component={UiRegister} />
        <Stack.Screen name="SenddMessage" component={SenddMessage} />
        <Stack.Screen name="PhoneBook" component={Phonebook} />
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="Friend" component={Friend} />
        <Stack.Screen name="NewGroup" component={NewGroup} />
        <Stack.Screen name="Resetpassword" component={Resetpassword} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        <Stack.Screen name="SendMessageGroup" component={SendMessageGroup} />
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

  if (
    currentScreen === "UiLogin" ||
    currentScreen === "UiRegister" ||
    currentScreen === "Resetpassword" ||
    currentScreen === "Resetpassword" ||
    currentScreen === "AddFriend" ||
    currentScreen === "SenddMessage" ||
    currentScreen === "WebViewScreen" ||
    currentScreen === "SendMessageGroup"
  ) {
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
        borderTopWidth: 1, 
        borderTopColor: "gray"
      }}
    >
      <BottomTabButton
        iconName="message1"
        label="Tin nhắn"
        screenName="MessageTC"
        navigation={navigation}
        currentScreen={currentScreen}
      />
      <BottomTabButton
        iconName="contacts"
        label="Danh bạ"
        screenName="PhoneBook"
        navigation={navigation}
        currentScreen={currentScreen}
      />
      <BottomTabButton
        iconName="user-o"
        label="Cá nhân"
        screenName="Personal"
        navigation={navigation}
        currentScreen={currentScreen}
      />
    </View>
  );
}

function BottomTabButton({
  iconName,
  label,
  screenName,
  navigation,
  currentScreen,
}) {
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
    <TouchableOpacity
      style={currentScreen === screenName ? styles.activeTab : styles.tab}
      onPress={handlePress}
    >
      <IconComponent
        name={iconName}
        size={24}
        color={currentScreen === screenName ? "blue" : "black"}
      />
      <Text
        style={{
          color: currentScreen === screenName ? "blue" : "black",
          marginTop: 5,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
  },
  activeTab: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});