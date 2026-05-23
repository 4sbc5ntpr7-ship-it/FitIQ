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
import { Button } from '@/components/Button';
import { colors } from '@/config/colors';
import { typography } from '@/config/typography';

const SAMPLE_MEALS = [
  { id: 1, name: 'Breakfast', time: '08:00', calories: 450, items: 'Oatmeal, Banana, Milk' },
  { id: 2, name: 'Lunch', time: '12:30', calories: 650, items: 'Chicken, Rice, Broccoli' },
  { id: 3, name: 'Snack', time: '16:00', calories: 150, items: 'Apple, Almonds' },
];

export default function MealsScreen({ navigation }: any) {
  return (
    <SafeArea>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Today's Meals</Text>
          <Button
            title="+ Add Meal"
            variant="primary"
            size="small"
            onPress={() => alert('Add meal modal')}
          />
        </View>

        {SAMPLE_MEALS.map((meal) => (
          <Card key={meal.id} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <Text style={styles.mealCalories}>{meal.calories} cal</Text>
            </View>
            <Text style={styles.mealItems}>{meal.items}</Text>
          </Card>
        ))}

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📷 Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>⌨️ Manual</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  mealCard: {
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  mealTime: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  mealCalories: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  mealItems: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
});
