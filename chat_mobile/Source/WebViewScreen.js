import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route, navigation }) => {
  const { url } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView source={{ uri: url }} />
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  goBackButton: {
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  goBackButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default WebViewScreen;
