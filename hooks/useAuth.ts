import { useState, useEffect } from 'react';
import { API } from '../services/api/client';
import { useAuthStore } from '../store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('auth_token');
        const storedUser = await AsyncStorage.getItem('auth_user');
        if (storedToken && storedUser) setAuth(JSON.parse(storedUser), storedToken);
      } catch (error) { console.error('Failed to load auth:', error); }
      finally { setIsLoading(false); }
    };
    loadAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await API.auth.login(email, password);
    setAuth(response.user, response.accessToken);
    await AsyncStorage.setItem('auth_token', response.accessToken);
    await AsyncStorage.setItem('auth_user', JSON.stringify(response.user));
    return response;
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await API.auth.register(name, email, password);
    setAuth(response.user, response.accessToken);
    await AsyncStorage.setItem('auth_token', response.accessToken);
    await AsyncStorage.setItem('auth_user', JSON.stringify(response.user));
    return response;
  };

  const logout = async () => {
    await API.auth.logout();
    clearAuth();
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('auth_user');
  };

  return { user, token, isAuthenticated, isLoading, login, register, logout };
}
