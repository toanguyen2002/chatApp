import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function Friend({ navigation }) {
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
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Lời mời kết bạn </Text>

                        </View>


                    </View>
                    {/* Kết thúc */}
                    





                </View>
            </View>
        </ScrollView>
    );
}