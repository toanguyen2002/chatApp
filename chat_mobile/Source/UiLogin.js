import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UiLogin = ({ navigation }) => {
  const [data, setData] = useState({ name: "admin", password: "123" });
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.110.193:5678/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      await AsyncStorage.setItem("userData", JSON.stringify(responseData));
      navigation.navigate("MessageTC", { token: responseData.token });
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/zalo.png")} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="SỐ ĐIỆN THOẠI"
            value={data.name}
            onChangeText={(text) => setData({ ...data, name: text })} // Update name field of data state
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="MẬT KHẨU"
            value={data.password}
            onChangeText={(text) => setData({ ...data, password: text })} // Update password field of data state
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>ĐĂNG NHẬP VỚI MẬT KHẨU</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.registerText}>Chưa có tài khoản?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("UiRegister");
          }}
        >
          <Text style={styles.registerText}>Đăng Kí</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    flex: 2,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    height: 40,
    borderRadius: 5,
    backgroundColor: "#0084ff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#0084ff",
    fontSize: 16,
  },
});

export default UiLogin;