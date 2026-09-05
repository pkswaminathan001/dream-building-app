import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './hooks/useTheme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { colors, theme } = useTheme();
  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Slot />
    </>
  );
}
