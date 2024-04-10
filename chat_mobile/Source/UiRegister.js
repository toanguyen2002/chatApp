import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image, Pressable, Modal, Alert } from 'react-native';
import axios from "axios";
const ip = "192.168.110.194";
const UiRegister = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userOtp, setUserOtp] = useState('');
  const [countdown, setCountdown] = useState(60); // 1 phút, tính bằng giây

  useEffect(() => {
    let timer = null;
    if (modalVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [modalVisible, countdown]);
  useEffect(() => {
    if (countdown === 0) {
      setModalVisible(false);
    }
  }, [countdown]);

  const openModal = () => {
    setModalVisible(true);
    setCountdown(60); // Reset countdown về 300 giây (5 phút)
  };

  const handleGetOTP = async () => {
    var otpRender = '';
    for (let index = 0; index < 5; index++) {
      otpRender += Math.floor((Math.random() * (20 - 16)) + 5).toString();
      setOtp(otpRender);
    }
    if (email == "" || !email.endsWith('@gmail.com')) {
      Alert.alert("Thông báo", "Email Rỗng hoặc không hợp Phải là Gmail");
    } else {
      openModal();
      try {
        const response = await fetch(`http://${ip}:5678/user/getotp`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ email: email, otp: otpRender })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        setModalVisible(false);
        Alert.alert("Thông báo", "Email đã tồn tại trong hệ thống vui lòng đăng nhập");
      }
    }
  };

  const handleRegister = async () => {
    if (userOtp !== otp) {
      Alert.alert("Thông báo", "OTP Không Tồn Tại Hoặc Sai Vui Lòng Kiểm Tra Lại");
    } else {
      try {
        const data = { name, email, password };
        const response = await fetch("http://" + ip + ":5678/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log(responseData);
        setName("");
        setEmail("");
        setPassword("");
        setModalVisible(false);
        setOtp('');
        Alert.alert("Thành công", "Đã đăng ký thành công");
        navigation.navigate("UiLogin")
      } catch (error) {
        Alert.alert("Thông báo", "lỗi hệ thống");
      }
    }
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
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.register}>
          <View style={styles.register}>
            <Pressable onPress={() => handleGetOTP()}>
              <Text style={styles.registerText}>Đăng Kí</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nhập OTP</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Nhập OTP"
              value={userOtp}
              onChangeText={setUserOtp}
              keyboardType="numeric"
            />
            <Text style={styles.countdownText}>{Math.floor(countdown / 60)}:{(countdown % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</Text>
            <Button
              title="Xác nhận OTP"
              onPress={() => {
                handleRegister();
              }}
            />
          </View>
        </View>
      </Modal>
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
    width: "50%",
    height: "50%",
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
  register: {
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flex: 1,
    height: "50%",
    width: "70%",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTextInput: {
    height: 40,
    width: "100%",
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10
  },
  countdownText: {
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },

});

export default UiRegister;