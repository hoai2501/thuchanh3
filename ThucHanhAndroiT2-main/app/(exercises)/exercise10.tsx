import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";

// Dữ liệu mẫu
const students = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Sinh viên ${i + 1}`,
  age: 18 + (i % 5),
  class: `Lớp ${Math.ceil((i + 1) / 5)}`,
}));

export default function StudentListWithAlert() {

  const handlePress = (item: typeof students[0]) => {
    Alert.alert("Thông tin chi tiết", `Họ tên: ${item.name}\nTuổi: ${item.age}\nĐang học: ${item.class}`);
  };

  // Hàm lấy chữ cái đầu để làm Avatar
  const getInitials = (name: string) => {
    return name.split(" ").pop()?.charAt(0) || "S";
  };

  // Hàm chọn màu ngẫu nhiên cho Avatar để đẹp hơn
  const getAvatarColor = (id: string) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#1A535C", "#FF9F1C", "#2D9CDB"];
    return colors[parseInt(id) % colors.length];
  };

  const renderItem = ({ item }: { item: typeof students[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item)}
      activeOpacity={0.8}
    >
      {/* Phần Avatar bên trái */}
      <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.id) }]}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>

      {/* Phần thông tin bên phải */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>

        <View style={styles.rowInfo}>
          {/* Badge hiển thị lớp */}
          <View style={styles.classBadge}>
            <Text style={styles.classText}>{item.class}</Text>
          </View>

          <Text style={styles.ageText}>• {item.age} tuổi</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách lớp học</Text>
        <Text style={styles.headerSubtitle}>Tổng số: {students.length} sinh viên</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa", // Màu nền xám xanh hiện đại
  },
  header: {
    padding: 20,
    paddingTop: 40, // Cho iOS nếu không dùng SafeAreaView
    backgroundColor: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    flexDirection: "row", // Xếp avatar và info nằm ngang
    alignItems: "center",
    padding: 15,
    borderRadius: 16, // Bo góc tròn hơn
    marginBottom: 12,
    // Hiệu ứng đổ bóng (Shadow)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3, // Shadow cho Android
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hình tròn
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  rowInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  classBadge: {
    backgroundColor: "#e3f2fd", // Màu nền xanh nhạt cho lớp
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  classText: {
    color: "#007bff",
    fontSize: 12,
    fontWeight: "600",
  },
  ageText: {
    fontSize: 13,
    color: "#888",
  },
});