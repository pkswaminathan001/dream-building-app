import { Stack } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="design/[id]" options={{ headerShown: true, headerTitle: 'Design Details' }} />
    </Stack>
  );
}
