import React from 'react';
import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';
import { useTheme } from '../../hooks/useTheme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, className, noPadding = false, ...props }: CardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      className={clsx(
        'rounded-2xl shadow-sm',
        isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white',
        !noPadding && 'p-4',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
