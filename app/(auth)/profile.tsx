import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { User, Settings, LogOut, Crown, FileText } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Crown, label: 'Upgrade to Premium', color: '#f59e0b' },
    { icon: FileText, label: 'My Designs', color: '#3b82f6' },
    { icon: Settings, label: 'Settings', color: '#64748b' },
  ];

  return (
    <ScrollView className="flex-1 px-4 pt-12" style={{ backgroundColor: colors.background }}>
      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center">
          <User size={48} color="white" />
        </View>
        <Text className="text-2xl font-bold mt-3" style={{ color: colors.text }}>{user?.name || 'User'}</Text>
        <Text className="text-sm" style={{ color: colors.muted }}>{user?.email || 'user@example.com'}</Text>
        <View className="bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-full mt-2">
          <Text className="text-sm font-semibold" style={{ color: colors.muted }}>Free Plan</Text>
        </View>
      </View>

      <Card>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center px-4 py-4 border-b border-gray-100 dark:border-gray-800"
            style={{ borderBottomWidth: index === menuItems.length - 1 ? 0 : 1 }}
            onPress={() => {}}
          >
            <item.icon size={24} color={item.color} />
            <Text className="flex-1 ml-3 text-base" style={{ color: colors.text }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Card>

      <TouchableOpacity onPress={logout} className="flex-row items-center justify-center mt-6 py-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
        <LogOut size={20} color="#ef4444" />
        <Text className="text-red-500 font-semibold ml-2">Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
