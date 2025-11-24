import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";

// Bảng chuyển đổi weathercode Open-Meteo sang mô tả
const weatherDescriptions: { [key: number]: string } = {
  0: "Trời quang",
  1: "Ít mây",
  2: "Nhiều mây",
  3: "Mây che phủ",
  45: "Sương mù",
  48: "Sương mù đóng băng",
  51: "Mưa nhỏ",
  53: "Mưa vừa",
  55: "Mưa rào",
  61: "Mưa nhẹ",
  63: "Mưa vừa",
  65: "Mưa to",
  71: "Tuyết nhẹ",
  73: "Tuyết vừa",
  75: "Tuyết nặng",
  80: "Mưa rào rải rác",
  81: "Mưa rào thường xuyên",
  82: "Mưa rào mạnh",
  // Thêm các code khác nếu muốn
};

type WeatherData = {
  temperature: number;
  humidity: number;
  description: string;
};

export default function WeatherAppComplete() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy tọa độ từ tên thành phố
  const fetchCoordinates = async (cityName: string) => {
    const resp = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName
      )}&count=1`
    );
    const data = await resp.json();
    if (!data.results || data.results.length === 0) throw new Error("Không tìm thấy thành phố");
    return { latitude: data.results[0].latitude, longitude: data.results[0].longitude };
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên thành phố");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const { latitude, longitude } = await fetchCoordinates(city);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("Lỗi từ API thời tiết");
      const data = await resp.json();

      const temp = data.current_weather?.temperature;
      const weatherCode = data.current_weather?.weathercode;
      const humidityArr = data.hourly?.relative_humidity_2m;
      const humidity = Array.isArray(humidityArr) && humidityArr.length > 0 ? humidityArr[0] : null;

      if (temp === undefined || humidity === null || weatherCode === undefined) {
        throw new Error("Dữ liệu thời tiết không đầy đủ");
      }

      setWeather({
        temperature: temp,
        humidity: humidity,
        description: weatherDescriptions[weatherCode] || "Không rõ",
      });
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời tiết</Text>

      <TextInput
        placeholder="Nhập tên thành phố…"
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={fetchWeather} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Tra cứu</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.text}>🌡 Nhiệt độ: {weather.temperature} °C</Text>
          <Text style={styles.text}>💧 Độ ẩm: {weather.humidity} %</Text>
          <Text style={styles.text}>⛅ Thời tiết: {weather.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    padding: 24,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00796b",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b2dfdb",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#00796b",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  result: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#004d40",
  },
});
