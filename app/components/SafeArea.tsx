import React from 'react';
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';
import { colors } from '@/config/colors';

interface SafeAreaProps extends ViewProps {
  children: React.ReactNode;
}

export const SafeArea: React.FC<SafeAreaProps> = ({ children, style, ...props }) => {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
