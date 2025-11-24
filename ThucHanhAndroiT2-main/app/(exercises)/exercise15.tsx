import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SAMPLE_IMAGES = [
  "https://picsum.photos/id/1015/600/800",
  "https://picsum.photos/id/1016/600/800",
  "https://picsum.photos/id/1020/600/800",
  "https://picsum.photos/id/1024/600/800",
  "https://picsum.photos/id/1025/600/800",
  "https://picsum.photos/id/1035/600/800",
];

export default function ImageGalleryWithSwipe() {
  const [images] = useState<string[]>(SAMPLE_IMAGES);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const pagerRef = useRef<FlatList<any> | null>(null);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalVisible(true);
  };

  // Khi modal mở, cuộn pager tới ảnh đã chọn
  useEffect(() => {
    if (modalVisible && pagerRef.current) {
      setTimeout(() => {
        pagerRef.current?.scrollToIndex({ index: activeIndex, animated: false });
      }, 50);
    }
  }, [modalVisible]);

  // Render ô grid 3 cột
  const renderGridItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => openModal(index)}
      style={styles.gridItem}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item }} style={styles.gridImage} />
    </TouchableOpacity>
  );

  // Render ảnh full-screen (FlatList horizontal)
  const renderPagerItem = ({ item }: { item: string }) => (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      <Image source={{ uri: item }} style={styles.fullImage} resizeMode="contain" />
    </View>
  );

  const getPagerItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Grid 3 cột */}
      <FlatList
        data={images}
        keyExtractor={(item, i) => item + i}
        renderItem={renderGridItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 6 }}
      />

      {/* Modal full-screen */}
      <Modal visible={modalVisible} transparent={false} animationType="fade">
        <View style={styles.modalContainer}>
          <FlatList
            ref={pagerRef}
            data={images}
            keyExtractor={(item, i) => "pager-" + i}
            renderItem={renderPagerItem}
            horizontal
            pagingEnabled
            initialScrollIndex={activeIndex}
            getItemLayout={getPagerItemLayout}
            onMomentumScrollEnd={(ev) => {
              const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);
              setActiveIndex(newIndex);
            }}
            showsHorizontalScrollIndicator={false}
          />

          {/* Counter ảnh */}
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {activeIndex + 1} / {images.length}
            </Text>
          </View>

          {/* Nút đóng */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const GAP = 6;
const ITEM_SIZE = (Dimensions.get("window").width - GAP * 4) / 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  gridItem: {
    margin: GAP,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  modalContainer: { flex: 1, backgroundColor: "#000" },
  fullImage: { width: Dimensions.get("window").width, height: Dimensions.get("window").height },
  closeBtn: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeText: { color: "#fff", fontSize: 16 },
  counter: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  counterText: { color: "#fff", fontSize: 14 },
});
