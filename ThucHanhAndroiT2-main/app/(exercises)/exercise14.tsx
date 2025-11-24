import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Nếu dùng Expo:
import { Ionicons } from "@expo/vector-icons";
// Nếu dùng CLI thuần, thay thế bằng:
// import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get("window");

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<
    { id: string; title: string; completed: boolean }[]
  >([]);

  const [editingTask, setEditingTask] = useState<{ id: string; title: string } | null>(null);
  const [editText, setEditText] = useState("");

  // --- Logic Lưu/Tải Dữ liệu ---

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem("TASKS");
      if (saved) setTasks(JSON.parse(saved));
    } catch (e) {
      console.error("Lỗi khi tải dữ liệu:", e);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
    } catch (e) {
      console.error("Lỗi khi lưu dữ liệu:", e);
    }
  };

  // --- Logic Công việc ---

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title: task.trim(), completed: false },
    ]);
    setTask("");
    Keyboard.dismiss();
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEdit = (id: string, title: string) => {
    setEditingTask({ id, title });
    setEditText(title);
  };

  const saveEdit = () => {
    if (!editingTask || !editText.trim()) return;
    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id ? { ...t, title: editText.trim() } : t
      )
    );
    setEditingTask(null);
    setEditText("");
  };

  // --- Render Item ---
  const renderItem = ({ item }: { item: typeof tasks[0] }) => (
    <View style={styles.itemContainer}>
      {/* Checkbox & Text */}
      <TouchableOpacity
        style={styles.itemLeft}
        onPress={() => toggleComplete(item.id)}
      >
        <View style={[styles.checkbox, item.completed && styles.checkedBox]}>
            {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text
          style={[
            styles.itemText,
            item.completed && styles.itemTextCompleted,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
            onPress={() => startEdit(item.id, item.title)}
            style={[styles.iconButton, {backgroundColor: '#E3F2FD'}]}
        >
          <Ionicons name="pencil" size={18} color="#1E88E5" />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => deleteTask(item.id)}
            style={[styles.iconButton, {backgroundColor: '#FFEBEE', marginLeft: 8}]}
        >
          <Ionicons name="trash" size={18} color="#E53935" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAED" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subTitle}>{tasks.length} công việc</Text>
      </View>

      {/* Danh sách công việc */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Chưa có công việc nào. Thêm mới nào! 😊</Text>
        )}
      />

      {/* Input Area (Sử dụng KeyboardAvoidingView để bàn phím không che Input) */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Thêm công việc mới..."
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={addTask}
          disabled={!task.trim()} // Vô hiệu hóa nếu input trống
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Modal sửa công việc */}
      <Modal visible={!!editingTask} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
            style={styles.modalKeyAvoid}
          >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Chỉnh sửa công việc</Text>
                    <TouchableOpacity onPress={() => setEditingTask(null)}>
                        <Ionicons name="close" size={24} color="#999" />
                    </TouchableOpacity>
                </View>

              <TextInput
                value={editText}
                onChangeText={setEditText}
                style={styles.modalInput}
                autoFocus
              />

              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnCancel]}
                  onPress={() => setEditingTask(null)}
                >
                  <Text style={styles.btnTextCancel}>Hủy bỏ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnSave]}
                  onPress={saveEdit}
                  disabled={!editText.trim()}
                >
                  <Text style={styles.btnTextSave}>Lưu lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerWrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subTitle: {
      fontSize: 14,
      color: "#888",
      marginTop: 4
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999'
  },
  // --- Input Styles ---
  inputWrapper: {
    position: "absolute",
    bottom: 0,
    width: width - 40,
    alignSelf: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Platform.OS === 'ios' ? 20 : 10, // Thêm padding cho iOS
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    color: "#333",
  },
  addBtn: {
    backgroundColor: "#4A3780", // Màu tím đậm hiện đại
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A3780",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },
  // --- List Item Styles ---
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#4A3780",
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedBox: {
      backgroundColor: "#4A3780",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flexShrink: 1, // Đảm bảo text bị giới hạn chiều rộng
  },
  itemTextCompleted: {
      textDecorationLine: "line-through",
      color: "#bbb"
  },
  actionButtons: {
      flexDirection: 'row',
  },
  iconButton: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalKeyAvoid: {
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    minWidth: 300,
    padding: 25,
    borderRadius: 20,
    elevation: 10,
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalInput: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 25,
    color: "#333",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  modalBtnCancel: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd"
  },
  modalBtnSave: {
    backgroundColor: "#4A3780",
  },
  btnTextCancel: {
      color: "#666",
      fontWeight: 'bold'
  },
  btnTextSave: {
    color: "white",
    fontWeight: "bold",
  },
});