import { Stack } from 'expo-router';

export default function ExercisesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="exercise1"
        options={{
          title: 'Bài 1 - Màn hình danh sách',
        }}
      />
      <Stack.Screen
        name="exercise2"
        options={{
          title: 'Bài 2 - Form đăng nhập',
        }}
      />
      <Stack.Screen
        name="exercise3"
        options={{
          title: 'Bài 3 - Đồng hồ đếm ngược',
        }}
      />
      <Stack.Screen
        name="exercise4"
        options={{
          title: 'Bài 4 - Ứng dụng To-do',
        }}
      />
      <Stack.Screen
        name="exercise5"
        options={{
          title: 'Bài 5 - Ứng dụng xem hình ảnh',
        }}
      />
      <Stack.Screen
        name="exercise6"
        options={{
          title: 'Bài 6 - Gọi API thời tiết',
        }}
      />
      <Stack.Screen
        name="exercise7"
        options={{
          title: 'Bài 7 - Tab Navigation',
        }}
      />
      <Stack.Screen
        name="exercise8"
        options={{
          title: 'Bài 10 - Danh sách bài viết',
        }}
      />
    </Stack>
  );
}