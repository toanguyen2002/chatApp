import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ip = "192.168.1.6";

export default function AddFriend({ navigation }) {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userDataString = await AsyncStorage.getItem("userData");
                const userData = JSON.parse(userDataString);
                const fetchedUsers = await axios.post(
                    `http://${ip}:5678/user/getUserNotFriend`,
                    {
                        userId: userData._id,
                        name: userData.name,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    }
                );
                setUsers(fetchedUsers.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUser();
    }, [searchText, users]);

    const clickToaddFriend = async (userIdWantToAdd) => {
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        try {
            await axios.post(`http://${ip}:5678/user/addfriend`, {
                userid: userData._id,
                friendId: userIdWantToAdd
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // Lọc mảng users dựa trên searchText
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchText, users]);

    return (

        <View style={{ width: 420, height: 1000, backgroundColor: "#DCDCDC" }}>
            <View style={{ width: 420, height: 1000, backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", backgroundColor: "#1E90FF", marginTop: 50, height: 40, alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ left: 5 }}>
                        <Pressable
                            style={{ flexDirection: "row" }}
                            onPress={() => navigation.goBack()}
                        >
                            <AntDesign name="arrowleft" size={30} color="white" />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "column ", left: -25 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Thêm Bạn </Text>
                    </View>
                    <View></View>
                </View>
                <View style={{ flexDirection: "row", left: 15, top: 15, alignItems: "center" }}>
                    <View>
                        <AntDesign name="adduser" size={50} color="#1E90FF" />
                    </View>
                    <View style={{ left: 15 }}>
                        <TextInput
                            style={{ height: 50, backgroundColor: "white", width: 200 }}
                            placeholder="Nhập tên người bạn muốn tim"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <Pressable
                        style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1E90FF", left: 40, width: 60, borderRadius: 100, height: 40 }}
                        onPress={() => console.log("Send button pressed")}
                    >
                        <AntDesign name="arrowright" size={24} color="white" />
                    </Pressable>
                </View>
                <Text style={{ paddingHorizontal: 15, marginTop: 20, fontWeight: "bold", marginTop: 20, fontSize: 15 }}>Người bạn có thể biết</Text>
                <ScrollView>
                    {filteredUsers.map((user) => (
                        <View key={user._id} style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, marginTop: 20 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#1E90FF", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 24, color: "white" }}>{user.name.charAt(0)}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 15 }}>
                                <Text>{user.name}</Text>
                                <Pressable
                                    onPress={() => clickToaddFriend(user._id)}
                                    style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1E90FF", width: 60, height: 40, borderRadius: 100, marginRight: 20, marginTop: 5 }}
                                >
                                    <AntDesign name="adduser" size={24} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
