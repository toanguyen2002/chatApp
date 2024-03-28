import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function NewGroup({ navigation }) {
    return (
        <ScrollView>
            <View style={{ width: 420, height: 1000, backgroundColor: "#DCDCDC" }}>
                <View style={{ width: 420, height: 1000, backgroundColor: "white", }}>

                    <View style={{ flexDirection: "row", backgroundColor: "#1E90FF", marginTop: 50 }}>

                        <View style={{ top: 8, left: 5 }}>
                            <Pressable
                                style={{ flexDirection: "row" }}
                                onPress={() => {
                                    navigation.goBack();
                                  }}>
                                <AntDesign name="arrowleft" size={24} color="white" />
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: "column ", left: 15 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>Nhóm mới </Text>
                            <Text style={{ color: "white" }}>Đã chọn: 0 </Text>

                        </View>


                    </View>
                    <View style={{ flexDirection: "row", left: 15, top: 15 }}>
                        <View >
                            <AntDesign name="addusergroup" size={50} color="#1E90FF" />
                        </View>
                        <View style={{ left: 15 }}>
                            <TextInput
                                style={{ height: 50, backgroundColor: "white", width: 200 }}
                                placeholder="Đặt tên nhóm">

                            </TextInput>
                        </View>
                        <Pressable style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1E90FF", left: 25, width: 60, borderRadius: 100 }}>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </Pressable>
                    </View>
                    <View style={{ top: 20, left: 15 }}>
                        <Text style={{fontWeight: "500"}}>Liên lạc gần đây</Text>
                    </View>
                    {/* Kết thúc */}




                </View>
            </View>
        </ScrollView>
    );
}