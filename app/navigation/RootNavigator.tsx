import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  if (loading || profileLoading) {
    return null; // Replace with splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <Stack.Group>
            <Stack.Screen name="Login" component={require('@/screens/auth/LoginScreen').default} />
            <Stack.Screen name="SignUp" component={require('@/screens/auth/SignUpScreen').default} />
          </Stack.Group>
        ) : !profile ? (
          // Onboarding Stack
          <Stack.Group>
            <Stack.Screen name="Onboarding" component={require('@/screens/onboarding/OnboardingScreen').default} />
          </Stack.Group>
        ) : (
          // Main App Stack
          <Stack.Group>
            <Stack.Screen name="MainApp" component={require('@/screens/main/MainNavigator').default} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
