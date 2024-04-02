import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";


const Resetpassword = (navigation) => {
    const [gmail, setGmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);
    return (
        <View style={styles.container}>
          <Text style={styles.header}>Quên mật khẩu</Text> 
            <View>
              <TextInput
                style={styles.input}
                placeholder="gmail.com"
                value={gmail}
                onChangeText={setGmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu mới"
                secureTextEntry={true}
                value={newPassword}
               
              />
              <Pressable style={styles.button} >
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


export default Resetpassword