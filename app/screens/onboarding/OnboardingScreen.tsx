import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeArea } from '@/components/SafeArea';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { colors } from '@/config/colors';
import { typography } from '@/config/typography';
import { useUserProfile } from '@/hooks/useUserProfile';

type GoalType = 'lose' | 'gain' | 'maintain';

const GOALS: { id: GoalType; label: string; description: string }[] = [
  { id: 'lose', label: 'Lose Weight', description: 'Create a calorie deficit' },
  { id: 'gain', label: 'Gain Muscle', description: 'Build strength & mass' },
  { id: 'maintain', label: 'Maintain Weight', description: 'Stay at current weight' },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState<'age' | 'weight' | 'height' | 'goal'>("age");
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState<GoalType>('maintain');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createProfile } = useUserProfile();

  const handleNext = () => {
    setError(null);
    if (step === 'age') {
      if (!age || parseInt(age) < 13) {
        setError('Please enter a valid age (13+)');
        return;
      }
      setStep('weight');
    } else if (step === 'weight') {
      if (!weight || parseFloat(weight) <= 0) {
        setError('Please enter a valid weight');
        return;
      }
      setStep('height');
    } else if (step === 'height') {
      if (!height || parseFloat(height) <= 0) {
        setError('Please enter a valid height');
        return;
      }
      setStep('goal');
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      const dailyCalorieTarget = calculateCalories(parseInt(age), parseFloat(weight), parseFloat(height));
      await createProfile({
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        fitnessGoal: goal,
        dailyCalorieTarget,
        email: '',
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateCalories = (age: number, weight: number, height: number) => {
    // Mifflin-St Jeor equation simplified for demo
    let calories = 10 * weight + 6.25 * height - 5 * age + 5;
    const multiplier = { lose: 0.8, gain: 1.1, maintain: 1 };
    return Math.round(calories * multiplier[goal]);
  };

  return (
    <SafeArea>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>Tell us about yourself</Text>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {step === 'age' && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>How old are you?</Text>
            <Input
              label="Age"
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              containerStyle={styles.input}
            />
          </View>
        )}

        {step === 'weight' && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your weight?</Text>
            <Input
              label="Weight (kg)"
              placeholder="Enter your weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              containerStyle={styles.input}
            />
          </View>
        )}

        {step === 'height' && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your height?</Text>
            <Input
              label="Height (cm)"
              placeholder="Enter your height"
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
              containerStyle={styles.input}
            />
          </View>
        )}

        {step === 'goal' && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your fitness goal?</Text>
            {GOALS.map((g) => (
              <TouchableOpacity
                key={g.id}
                onPress={() => setGoal(g.id)}
                style={[styles.goalCard, goal === g.id && styles.goalCardActive]}
              >
                <Text style={styles.goalLabel}>{g.label}</Text>
                <Text style={styles.goalDescription}>{g.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          {step !== 'age' && (
            <Button
              title="Back"
              onPress={() => {
                if (step === 'weight') setStep('age');
                else if (step === 'height') setStep('weight');
                else if (step === 'goal') setStep('height');
              }}
              variant="secondary"
              style={styles.backButton}
            />
          )}
          {step !== 'goal' && (
            <Button
              title="Next"
              onPress={handleNext}
              style={styles.nextButton}
            />
          )}
          {step === 'goal' && (
            <Button
              title="Complete"
              onPress={handleFinish}
              loading={loading}
              style={styles.nextButton}
            />
          )}
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  stepContainer: {
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    marginVertical: 12,
  },
  goalCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  goalCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceLight,
  },
  goalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});
