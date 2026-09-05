import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Home, TrendingUp, Award, Plus } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 px-4 pt-12" style={{ backgroundColor: colors.background }}>
      <Text className="text-3xl font-bold" style={{ color: colors.text }}>
        Hello, {user?.name?.split(' ')[0] || 'Architect'} 👋
      </Text>
      <Text className="text-base mt-1" style={{ color: colors.muted }}>
        Let's build something amazing today.
      </Text>

      <View className="flex-row gap-2 mt-6 mb-4">
        <Card className="flex-1 items-center py-3">
          <Home size={24} color={colors.primary} />
          <Text className="text-xl font-bold mt-1" style={{ color: colors.text }}>0</Text>
          <Text className="text-xs" style={{ color: colors.muted }}>Designs</Text>
        </Card>
        <Card className="flex-1 items-center py-3">
          <Award size={24} color="#8b5cf6" />
          <Text className="text-xl font-bold mt-1" style={{ color: colors.text }}>0%</Text>
          <Text className="text-xs" style={{ color: colors.muted }}>Vastu</Text>
        </Card>
        <Card className="flex-1 items-center py-3">
          <TrendingUp size={24} color="#22c55e" />
          <Text className="text-xl font-bold mt-1" style={{ color: colors.text }}>0</Text>
          <Text className="text-xs" style={{ color: colors.muted }}>Projects</Text>
        </Card>
      </View>

      <Button variant="primary" className="mb-4" onPress={() => router.push('/design/new')}>
        <Plus size={20} color="white" className="mr-2" />
        New Design
      </Button>

      <Card className="py-8 items-center">
        <Text className="text-lg" style={{ color: colors.muted }}>No designs yet</Text>
        <Text className="text-sm" style={{ color: colors.muted }}>Start your first project now.</Text>
      </Card>
    </ScrollView>
  );
}
