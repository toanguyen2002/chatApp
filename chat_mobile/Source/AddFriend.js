import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function Adfr({ navigation }) { 
    return (
        <ScrollView>
            <View style={{ width: 420, height: 1000, backgroundColor: "#DCDCDC" }}>
                <View style={{ width: 420, height: 1000, backgroundColor: "white", }}>
                    <View style={{ flexDirection: "row", backgroundColor: "#1E90FF", marginTop: 50, height:40, alignItems:"center" }}>
                        <View style={{ left: 5 }}>
                            <Pressable
                                style={{ flexDirection: "row" }}
                                onPress={() => {
                                    navigation.goBack();
                                }}>
                                <AntDesign name="arrowleft" size={24} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: "column ", left: 15 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Thêm Bạn </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", left: 15, top: 15 }}>
                        <View >
                            <AntDesign name="adduser" size={50} color="#1E90FF" />                       
                        </View>
                        <View style={{ left: 15 }}>
                            <TextInput
                                style={{ height: 50, backgroundColor: "white", width: 200 }}
                                placeholder="Nhập tên bạn">
                            </TextInput>
                        </View>
                        <Pressable style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1E90FF", left: 25, width: 60, borderRadius: 100 }}>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </Pressable>
                    </View>
                    {/* Kết thúc */}
                </View>
            </View>
        </ScrollView>
    );
}