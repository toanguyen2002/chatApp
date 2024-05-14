import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
const ip = "192.168.1.149";
const Resetpassword = ({navigation}) => {
  const [name, setName] = useState("");
  const resetPassword = async () => {
    try {
      const data = { name };


      const dataRest = await fetch("http://"+ip+":5678/user/reset", { 

        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      console.log(dataRest);
      Alert.alert("Thông báo", "Mật khẩu mới đã được gửi về gmail");
      navigation.navigate("UiLogin")
    } catch (error) {
      Alert.alert("Thông báo", "Tên đăng nh không tồn tại trong hệ thống");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quên mật khẩu</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={name}
          onChangeText={setName}
        />
        <Pressable
        onPress={()=>{
          resetPassword()
        }}
        style={styles.button}>
          <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0084ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  successMessage: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
  },
});

export default Resetpassword;
