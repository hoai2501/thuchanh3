import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration } from "react-native";

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    const sec = parseInt(seconds);

    if (isNaN(sec) || sec <= 0) return;

    setTimeLeft(sec);
    setRunning(true);
  };

  useEffect(() => {
    if (running && timeLeft !== null && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (timeLeft === 0) {
      setRunning(false);
      Vibration.vibrate(800); // Rung 0.8 giây
    }
  }, [timeLeft]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        Countdown Timer
      </Text>

      {/* Nhập số giây */}
      <TextInput
        placeholder="Nhập số giây..."
        keyboardType="numeric"
        value={seconds}
        onChangeText={setSeconds}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 20,
        }}
      />

      {/* Hiển thị thời gian còn lại */}
      {timeLeft !== null && (
        <Text style={{ fontSize: 36, textAlign: "center", marginBottom: 20 }}>
          {timeLeft > 0 ? timeLeft : "Time's up!"}
        </Text>
      )}

      {/* Nút Start */}
      <TouchableOpacity
        onPress={startCountdown}
        style={{
          backgroundColor: "#28a745",
          padding: 14,
          borderRadius: 8,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
}
