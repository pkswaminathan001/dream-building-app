import { Tabs } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Home, Compass, User, Plus } from 'lucide-react-native';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const { colors, theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          borderTopColor: isDark ? '#334155' : '#e2e8f0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home size={size} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color, size }) => <Compass size={size} color={color} /> }} />
      <Tabs.Screen
        name="new-design"
        options={{
          title: '',
          tabBarIcon: () => (
            <View className="bg-blue-500 rounded-full p-3 -mt-4 shadow-lg">
              <Plus size={28} color="white" />
            </View>
          ),
        }}
        listeners={{ tabPress: (e) => { e.preventDefault(); router.push('/design/new'); } }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User size={size} color={color} /> }} />
    </Tabs>
  );
}
