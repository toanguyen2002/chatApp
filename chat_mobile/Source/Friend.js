import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ip = "192.168.1.149";

export default function Friend({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userDataString = await AsyncStorage.getItem("userData");
                const userData = JSON.parse(userDataString);
                const response = await axios.post(
                    `http://${ip}:5678/user/getUserwaitAccept`,
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
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUser();
    }, users);

    const acceptFriendRequest = async (userId) => {
        console.log(userId);
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        try {
            await axios.post(`http://${ip}:5678/user/acceptFriend`, {
                userid: userData._id,
                friendId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            updateUsersList();
        } catch (error) {
            console.log(error);
        }
        console.log(userId);
    };
    const updateUsersList = async () => {
        // Lấy lại danh sách người dùng từ AsyncStorage sau khi đã thay đổi
        try {
            const userDataString = await AsyncStorage.getItem("userData");
            const userData = JSON.parse(userDataString);
            const response = await axios.post(
                `http://${ip}:5678/user/getUserwaitAccept`,
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
            setUsers(response.data);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const rejectFriendRequest = async (userId) => {
        console.log(userId);
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        try {
            await axios.post(`http://${ip}:5678/user/removeAddFriend`, {
                userid: userData._id,
                friendId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            updateUsersList();
        } catch (error) {
            console.log(error);
        }
        console.log(userId);
        
    };

    return (

        <View style={{ width: 420, height: 1000, backgroundColor: "#DCDCDC" }}>
            <View style={{ width: 420, height: 1000, backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", backgroundColor: "#1E90FF", marginTop: 50, height: 40, alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ left: 5 }}>
                        <Pressable
                            style={{ flexDirection: "row" }}
                            onPress={() => navigation.goBack()}
                        >
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "column ", left: -20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Lời mời kết bạn </Text>
                    </View>
                    <View></View>
                </View>
                <ScrollView>
                    {users.map((user) => (
                        <View key={user._id} style={{ flexDirection: "row", paddingHorizontal: 15, marginTop: 20, alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#1E90FF", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 24, color: "white" }}>{user.name.charAt(0)}</Text>
                            </View>
                            <Text style={{ fontSize: 24, color: "#1E90FF", fontWeight: "bold" }}>{user.name}</Text>
                            <View style={{ flexDirection: "row", marginRight: 15 }}>
                                <Pressable
                                    onPress={() => acceptFriendRequest(user._id)}
                                    style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#009900", width: 60, height: 40, borderRadius: 100, marginRight: 10 }}
                                >
                                    <AntDesign name="check" size={24} color="white" />
                                </Pressable>
                                <Pressable
                                    onPress={() => rejectFriendRequest(user._id)}
                                    style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#990000", width: 60, height: 40, borderRadius: 100 }}
                                >
                                    <AntDesign name="close" size={24} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>

    );
}
