import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// ---------------- Constants & Helpers ----------------
const PRIMARY_COLOR = "#009688"; // Màu chủ đạo Teal
const BG_COLOR = "#F2F5F8"; // Màu nền xám xanh nhạt
const CARD_BG = "#FFFFFF";
const { width } = Dimensions.get("window");

// Hàm lấy màu ngẫu nhiên cho Avatar
const getAvatarColor = (id: number) => {
  const colors = ["#E57373", "#F06292", "#BA68C8", "#64B5F6", "#4DB6AC", "#81C784", "#FFD54F"];
  return colors[id % colors.length];
};

// ---------------- Navigators ----------------
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const NewsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// ---------------- Components ----------------

// Màn hình 1: Home (Danh sách sinh viên)
const HomeScreen = ({ navigation }: any) => {
  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Nguyễn Văn ${String.fromCharCode(65 + i)}`, // Tên giả: Nguyễn Văn A, B, C...
    age: 18 + (i % 5),
    class: `CNTT K${15 + (i % 3)}`,
    gpa: (2.5 + Math.random() * 1.5).toFixed(1),
  }));

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailScreen", { item })}
      activeOpacity={0.7}
    >
      <View style={[styles.avatarSmall, { backgroundColor: getAvatarColor(item.id) }]}>
        <Text style={styles.avatarText}>{item.name.charAt(item.name.length - 1)}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubTitle}>
          {item.class} • {item.age} tuổi
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Màn hình 2: Chi tiết sinh viên
const DetailScreen = ({ route }: any) => {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Background */}
      <View style={styles.detailHeader}>
        <View style={[styles.avatarLarge, { backgroundColor: getAvatarColor(item.id) }]}>
          <Text style={styles.avatarLargeText}>{item.name.charAt(item.name.length - 1)}</Text>
        </View>
        <Text style={styles.detailName}>{item.name}</Text>
        <Text style={styles.detailClass}>{item.class}</Text>
      </View>

      {/* Info Sections */}
      <View style={styles.sectionContainer}>
        <View style={styles.infoRow}>
            <InfoBox label="Tuổi" value={item.age} icon="calendar-outline" />
            <InfoBox label="GPA" value={item.gpa} icon="school-outline" />
            <InfoBox label="Trạng thái" value="Đang học" icon="checkmark-circle-outline" />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.contactText}>student{item.id}@university.edu.vn</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.contactText}>0909 123 45{item.id}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
             <Text style={styles.actionButtonText}>Gửi tin nhắn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const InfoBox = ({ label, value, icon }: any) => (
    <View style={styles.infoBox}>
        <Ionicons name={icon} size={24} color={PRIMARY_COLOR} style={{marginBottom: 5}}/>
        <Text style={styles.infoValue}>{value}</Text>
        <Text style={styles.infoLabel}>{label}</Text>
    </View>
)

// Màn hình 3: Tin tức (News)
const NewsScreen = () => {
    // Dữ liệu giả lập tin tức
    const newsData = [1, 2, 3, 4, 5].map(i => ({
        id: i,
        title: `Thông báo quan trọng về lịch thi học kỳ ${i}`,
        date: '24/05/2025',
        image: `https://picsum.photos/400/200?random=${i}`
    }));

    return (
        <View style={styles.container}>
             <FlatList
                data={newsData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.newsCard}>
                        <Image source={{ uri: item.image }} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                            <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                            <View style={styles.newsFooter}>
                                <Ionicons name="time-outline" size={14} color="#888" />
                                <Text style={styles.newsDate}>{item.date}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

// Màn hình 4: Profile Cá nhân
const ProfileScreen = () => (
  <View style={styles.container}>
    <View style={styles.profileHeader}>
        <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }}
            style={styles.profileImage}
        />
        <Text style={styles.profileName}>Admin User</Text>
        <Text style={styles.profileRole}>Giảng viên</Text>
    </View>

    <View style={styles.menuContainer}>
        <MenuItem icon="person-outline" title="Thông tin cá nhân" />
        <MenuItem icon="settings-outline" title="Cài đặt hệ thống" />
        <MenuItem icon="notifications-outline" title="Thông báo" badge={3}/>
        <MenuItem icon="help-circle-outline" title="Trợ giúp & Phản hồi" />
        <MenuItem icon="log-out-outline" title="Đăng xuất" isDestructive />
    </View>
  </View>
);

const MenuItem = ({ icon, title, badge, isDestructive }: any) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
            <View style={[styles.menuIconBox, isDestructive && {backgroundColor: '#FFEBEE'}]}>
                <Ionicons name={icon} size={22} color={isDestructive ? "#D32F2F" : "#555"} />
            </View>
            <Text style={[styles.menuText, isDestructive && {color: "#D32F2F"}]}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {badge && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </View>
    </TouchableOpacity>
);

// ---------------- Stack Configurations ----------------
const screenOptionsCommon = {
  headerStyle: { backgroundColor: PRIMARY_COLOR, elevation: 0, shadowOpacity: 0 }, // Xóa shadow header mặc định
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" as "bold" },
  headerTitleAlign: "center" as "center",
};

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={screenOptionsCommon}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Sinh Viên" }} />
    <HomeStack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Hồ Sơ Sinh Viên" }} />
  </HomeStack.Navigator>
);

const NewsStackScreen = () => (
  <NewsStack.Navigator screenOptions={screenOptionsCommon}>
    <NewsStack.Screen name="NewsScreen" component={NewsScreen} options={{ title: "Tin Tức" }} />
  </NewsStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={screenOptionsCommon}>
    <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Cá Nhân" }} />
  </ProfileStack.Navigator>
);

// ---------------- App ----------------
export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;
          if (route.name === "Home") iconName = focused ? "people" : "people-outline";
          else if (route.name === "News") iconName = focused ? "newspaper" : "newspaper-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            elevation: 8
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: "Sinh viên" }} />
      <Tab.Screen name="News" component={NewsStackScreen} options={{ tabBarLabel: "Tin tức" }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarLabel: "Cá nhân" }} />
    </Tab.Navigator>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR },

  // -- List Styles --
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    // Shadow style
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 4 },
  cardSubTitle: { fontSize: 14, color: "#888" },

  // -- Detail Styles --
  detailHeader: {
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)"
  },
  avatarLargeText: { fontSize: 40, fontWeight: "bold", color: "#fff" },
  detailName: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  detailClass: { fontSize: 16, color: "rgba(255,255,255,0.9)" },

  sectionContainer: { padding: 20, marginTop: -20 },
  infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 16,
      elevation: 4,
      shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4
  },
  infoBox: { alignItems: 'center', flex: 1 },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  infoLabel: { fontSize: 12, color: '#888', marginTop: 2 },

  infoCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  contactText: { marginLeft: 10, fontSize: 15, color: '#555' },

  actionButton: {
      backgroundColor: PRIMARY_COLOR,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10
  },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // -- News Styles --
  newsCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 2 },
  newsImage: { width: '100%', height: 150 },
  newsContent: { padding: 12 },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8, lineHeight: 22 },
  newsFooter: { flexDirection: 'row', alignItems: 'center' },
  newsDate: { fontSize: 12, color: '#888', marginLeft: 6 },

  // -- Profile Styles --
  profileHeader: { alignItems: 'center', padding: 30, backgroundColor: '#fff', marginBottom: 15 },
  profileImage: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  profileRole: { fontSize: 14, color: PRIMARY_COLOR, fontWeight: '600' },

  menuContainer: { backgroundColor: '#fff', flex: 1 },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0'
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconBox: {
      width: 36, height: 36, borderRadius: 8, backgroundColor: '#F5F7FA',
      justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  menuText: { fontSize: 16, color: '#333' },
  badge: { backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});