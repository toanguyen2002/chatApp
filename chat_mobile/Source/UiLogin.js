import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import UiRegister from './UiRegister';


const UiLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Gọi API đăng nhập với số điện thoại và mật khẩu
  };

  const handleRegister = () => {
    // Xử lý khi người dùng nhấn vào "Đăng Kí"
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/zalo.png')} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="SỐ ĐIỆN THOẠI"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="MẬT KHẨU"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            // onPress={handleLogin}
            onPress={()=>{navigation.navigate('MessageTC')}}
          
          >
            <Text style={styles.buttonText}>ĐĂNG NHẬP VỚI MẬT KHẨU</Text>
          </Pressable>
        
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.registerText}>Chưa có tài khoản?</Text>
        <Pressable onPress={()=>{navigation.navigate('UiRegister')}}>
          <Text style={styles.registerText}>Đăng Kí</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: '#ccc',
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
    backgroundColor: '#0084ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
  },
  registerText: {
    color: '#0084ff',
    fontSize: 16,
  },
});

export default UiLogin;

