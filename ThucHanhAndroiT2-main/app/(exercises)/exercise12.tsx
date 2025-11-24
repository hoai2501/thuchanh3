import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";

export default function LoginScreen() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const showMessage = (title: string, msg: string) => {
    if (Platform.OS === "web") {
      alert(`${title}\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const handleLogin = () => {
    if (!name.trim() || !password.trim()) {
      showMessage("Lỗi", "Bạn chưa nhập đầy đủ thông tin!");
      return;
    }
    showMessage("Thành công", "Đăng nhập thành công!");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* KeyboardAvoidingView: Đẩy giao diện lên khi bàn phím hiện */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* ScrollView: Giúp cuộn được nếu màn hình nhỏ, và xử lý việc ẩn bàn phím */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            {/* Logo Icon */}
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Đăng nhập hệ thống</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Tên đăng nhập</Text>
              <TextInput
                placeholder="Nhập họ tên"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow cho Android
    elevation: 5,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#007bff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});