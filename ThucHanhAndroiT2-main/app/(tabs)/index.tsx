import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type ExerciseHref = string;

type Exercise = {
  id: string;
  title: string;
  description: string;
  href: ExerciseHref;
};

const exercises: Exercise[] = [
  {
    id: 'exercise10',
    title: 'Bài 10',
    description: 'Màn hình danh sách',
    href: '/(exercises)/exercise10'
  },
  {
    id: 'exercise12',
    title: 'Bài 12',
    description: 'Form đăng nhập',
    href: '/(exercises)/exercise12'
  },
  {
    id: 'exercise13',
    title: 'Bài 13',
    description: 'Đồng hồ đếm ngược',
    href: '/(exercises)/exercise13'
  },
  {
    id: 'exercise14',
    title: 'Bài 14',
    description: 'Ứng dụng To-do',
    href: '/(exercises)/exercise14'
  },
  {
    id: 'exercise15',
    title: 'Bài 15',
    description: 'Ứng dụng xem ảnh',
    href: '/(exercises)/exercise15'
  },
  {
    id: 'exercise16',
    title: 'Bài 16',
    description: 'Gọi API thời tiết',
    href: '/(exercises)/exercise16'
  },
  {
    id: 'exercise17',
    title: 'Bài 17',
    description: 'Tab Navigation',
    href: '/(exercises)/exercise17'
  },
  {
    id: 'exercise18',
    title: 'Bài 18',
    description: 'Danh sách bài viết',
    href: '/(exercises)/exercise18'
  },
];

export default function TabIndexScreen() {
  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise) => (
        <Link key={exercise.id} href={exercise.href as any} asChild>
          <TouchableOpacity style={styles.exerciseCard}>
            <Text style={styles.exerciseTitle}>
              {exercise.title}
            </Text>
            <Text style={styles.exerciseDescription}>
              {exercise.description}
            </Text>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  exerciseCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#007AFF',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
  },
});
