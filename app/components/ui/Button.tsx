import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { clsx } from 'clsx';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  onPress,
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonProps) {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const variantStyles = {
    primary: 'bg-blue-500 active:bg-blue-600',
    secondary: 'bg-purple-500 active:bg-purple-600',
    outline: `border-2 ${isDark ? 'border-blue-400' : 'border-blue-500'} bg-transparent`,
    danger: 'bg-red-500 active:bg-red-600',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 rounded-xl',
  };

  const textColors = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: isDark ? 'text-blue-400' : 'text-blue-500',
    danger: 'text-white',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={clsx(
        'items-center justify-center flex-row',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50',
        className
      )}
      activeOpacity={0.7}
    >
      {loading ? <ActivityIndicator color={variant === 'outline' ? '#3b82f6' : 'white'} /> : <Text className={clsx('font-semibold', textColors[variant])}>{children}</Text>}
    </TouchableOpacity>
  );
}
