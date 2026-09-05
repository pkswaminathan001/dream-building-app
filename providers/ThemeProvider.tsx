import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  border: '#e2e8f0',
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  muted: '#94a3b8',
};

const darkColors = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#f1f5f9',
  border: '#334155',
  primary: '#60a5fa',
  secondary: '#a78bfa',
  success: '#4ade80',
  danger: '#f87171',
  warning: '#fbbf24',
  muted: '#64748b',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('theme');
      setTheme(saved ? (saved as Theme) : (systemTheme || 'light'));
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
