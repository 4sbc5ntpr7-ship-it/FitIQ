import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeArea } from '@/components/SafeArea';
import { Card } from '@/components/Card';
import { colors } from '@/config/colors';
import { typography } from '@/config/typography';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function HomeScreen({ navigation }: any) {
  const { profile } = useUserProfile();

  const dailyCalories = 2000; // Example
  const consumedCalories = 1250;
  const remainingCalories = dailyCalories - consumedCalories;

  const macros = {
    protein: { consumed: 65, target: 150, color: colors.protein },
    carbs: { consumed: 210, target: 250, color: colors.carbs },
    fats: { consumed: 35, target: 65, color: colors.fats },
  };

  const waterIntake = 6;
  const waterTarget = 8;

  return (
    <SafeArea>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.date}>Today's Progress</Text>
        </View>

        {/* Calorie Summary */}
        <Card style={styles.calorieCard}>
          <View style={styles.calorieContent}>
            <View>
              <Text style={styles.calorieLabel}>Daily Target</Text>
              <Text style={styles.calorieValue}>{dailyCalories}</Text>
              <Text style={styles.calorieUnit}>calories</Text>
            </View>
            <View style={styles.calorieCenter}>
              <View style={styles.calorieCircle}>
                <Text style={styles.caloriePercent}>
                  {Math.round((consumedCalories / dailyCalories) * 100)}%
                </Text>
              </View>
            </View>
            <View style={styles.calorieRight}>
              <Text style={styles.calorieLabel}>Consumed</Text>
              <Text style={styles.calorieValue}>{consumedCalories}</Text>
              <Text style={styles.calorieRemaining}>
                {remainingCalories} left
              </Text>
            </View>
          </View>
        </Card>

        {/* Macros */}
        <Text style={styles.sectionTitle}>Macronutrients</Text>
        {Object.entries(macros).map(([key, macro]) => (
          <Card key={key} style={styles.macroCard}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <Text style={styles.macroValue}>
                {macro.consumed}g / {macro.target}g
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((macro.consumed / macro.target) * 100, 100)}%`,
                    backgroundColor: macro.color,
                  },
                ]}
              />
            </View>
          </Card>
        ))}

        {/* Water Intake */}
        <Text style={styles.sectionTitle}>Water Intake</Text>
        <Card style={styles.waterCard}>
          <View style={styles.waterContent}>
            <View>
              <Text style={styles.waterLabel}>Today</Text>
              <Text style={styles.waterValue}>{waterIntake}</Text>
              <Text style={styles.waterUnit}>of {waterTarget} cups</Text>
            </View>
            <View style={styles.waterCups}>
              {Array.from({ length: waterTarget }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.waterCup,
                    i < waterIntake && styles.waterCupFilled,
                  ]}
                />
              ))}
            </View>
          </View>
        </Card>

        {/* Weight */}
        <Text style={styles.sectionTitle}>Current Weight</Text>
        <Card style={styles.weightCard}>
          <View style={styles.weightContent}>
            <View>
              <Text style={styles.weightLabel}>Latest</Text>
              <Text style={styles.weightValue}>{profile?.weight || 'N/A'}</Text>
              <Text style={styles.weightUnit}>kg</Text>
            </View>
            <TouchableOpacity style={styles.addWeightButton}>
              <Text style={styles.addWeightText}>+ Add Today</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  calorieCard: {
    marginBottom: 24,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: colors.primary,
  },
  calorieContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  calorieValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  calorieUnit: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  calorieCenter: {
    alignItems: 'center',
  },
  calorieCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriePercent: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
  },
  calorieRight: {
    alignItems: 'flex-end',
  },
  calorieRemaining: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  macroCard: {
    marginBottom: 12,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  macroValue: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  waterCard: {
    marginBottom: 24,
  },
  waterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  waterValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  waterUnit: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  waterCups: {
    flexDirection: 'row',
    gap: 6,
  },
  waterCup: {
    width: 32,
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  waterCupFilled: {
    backgroundColor: colors.info,
    borderColor: colors.info,
  },
  weightCard: {
    marginBottom: 24,
  },
  weightContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weightLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  weightValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  weightUnit: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  addWeightButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  addWeightText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.background,
  },
});
