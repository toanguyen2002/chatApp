import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image, Pressable } from 'react-native';

const UiRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Gửi yêu cầu đăng kí đến server
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('../assets/zalo.png')} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Tên"
          value={name}
          onChangeText={setName}
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.register}>
        <Pressable onPress={()=>{}}>
          <Text style={styles.registerText}>Đăng Kí</Text>
        </Pressable>
        </View>
         
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
    width:"50%",
    height:"50%",
  },
  formContainer: {
    flex: 2,
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  register:{
    height: 40,
    borderRadius: 5,
    backgroundColor: '#0084ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
  },
 
});

export default UiRegister;