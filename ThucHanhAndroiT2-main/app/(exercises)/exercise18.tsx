import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PAGE_SIZE = 10;

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Lấy dữ liệu từ API
  const fetchPosts = async (pageNum = 1, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await response.json();
      // Phân trang giả lập
      const start = (pageNum - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pagedData = data.slice(start, end);

      if (reset) setPosts(pagedData);
      else setPosts((prev) => [...prev, ...pagedData]);

      setHasMore(end < data.length);
      setPage(pageNum);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu bài viết.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Load more khi kéo xuống cuối
  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchPosts(page + 1);
  };

  // Reload bằng pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts(1, true);
  };

  // Filter bài viết theo search
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => Alert.alert("Bài viết", item.title)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2}>{item.body}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#00796b" style={{ margin: 16 }} /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#f5f5f5" },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  item: {
    padding: 16,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color: "#00796b" },
});
