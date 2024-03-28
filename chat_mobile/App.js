import React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { AsyncStorage } from 'react-native';

import { MessageTC, Personal, PhoneBook, SenddMessage, UiLogin, UiRegister, Diary, Discover } from "./Source";
import Phonebook from "./Source/Phonebook";
import AddFriend from "./Source/AddFriend";
import Friend from "./Source/Friend";
import NewGroup from "./Source/NewGroup";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 80,
          backgroundColor: "#fff",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;
          let labelComponent;

          if (route.name === "Tin nhắn") {
            iconComponent = (
              <AntDesign
                name="message1"
                size={24}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                Tin nhắn
              </Text>
            );
          } else if (route.name === "Danh bạ") {
            iconComponent = (
              <AntDesign
                name="contacts"
                size={24}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                Danh ba
              </Text>
            );
          } else if (route.name === "Khám phá") {
            iconComponent = (
              <AntDesign
                name="windows"
                size={25}
                color={focused ? "#0000FF" : "black"} />
            );
            labelComponent = (
              <Text
                style={{ color: focused ? "#0000FF" : "black", marginTop: 5 }}
              >
                Khám phá
              </Text>
            );
          } else if (route.name === "Nhật ký") {
            iconComponent = (
              <Ionicons
                name="time-outline"
                size={25}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                Nhật ký
              </Text>
            );
          } else if (route.name === "Cá nhân") {
            iconComponent = (
              <FontAwesome
                name="user-o"
                size={24}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                Cá nhân
              </Text>
            );
          }
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
              }}
            >
              {iconComponent}
              {labelComponent}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Tin nhắn" component={MessageTC} />
      <Tab.Screen name="Danh bạ" component={Phonebook} />
      <Tab.Screen name="Khám phá" component={Discover} />
      <Tab.Screen name="Nhật ký" component={Diary} />
      <Tab.Screen name="Cá nhân" component={Personal} />

    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="UiLogin" component={UiLogin} />
        <Stack.Screen name="MessageTC" component={MyTabs} />
        <Stack.Screen name="UiRegister" component={UiRegister} />
        <Stack.Screen name="SenddMessage" component={SenddMessage} />
        <Stack.Screen name="PhoneBook" component={PhoneBook} />
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="Friend" component={Friend} />
        <Stack.Screen name="NewGroup" component={NewGroup} />




        {/* <Stack.Screen name="Setting" component={Setting} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}