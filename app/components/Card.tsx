import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '@/config/colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({ children, padding = 16, style, ...props }) => {
  return (
    <View
      style={[
        styles.card,
        { padding },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
