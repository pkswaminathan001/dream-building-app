import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export default function RegisterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6" style={{ backgroundColor: colors.background }}>
      <Text className="text-3xl font-bold text-center" style={{ color: colors.text }}>
        Create Account
      </Text>
      <Text className="text-center mt-1" style={{ color: colors.muted }}>
        Start designing your dream home
      </Text>

      <View className="mt-8 space-y-4">
        <TextInput
          className="rounded-xl border p-4 text-base"
          placeholder="Full Name"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
          style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text }}
        />
        <TextInput
          className="rounded-xl border p-4 text-base"
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text }}
        />
        <TextInput
          className="rounded-xl border p-4 text-base"
          placeholder="Password"
          placeholderTextColor={colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text }}
        />

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          className="bg-blue-500 rounded-xl py-4 items-center"
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-semibold text-lg">Create Account</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-center text-blue-500 mt-4">Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
