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

const WORKOUTS = [
  {
    id: 1,
    type: 'Home',
    name: 'Full Body Circuit',
    duration: '30 min',
    difficulty: 'Intermediate',
    exercises: ['Push-ups', 'Squats', 'Planks'],
  },
  {
    id: 2,
    type: 'Gym',
    name: 'Chest & Triceps',
    duration: '45 min',
    difficulty: 'Advanced',
    exercises: ['Bench Press', 'Dumbbell Flies', 'Tricep Dips'],
  },
  {
    id: 3,
    type: 'Home',
    name: 'Cardio Blast',
    duration: '20 min',
    difficulty: 'Beginner',
    exercises: ['Jumping Jacks', 'Burpees', 'Mountain Climbers'],
  },
];

export default function WorkoutsScreen() {
  return (
    <SafeArea>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Workout Plans</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
            <Text style={styles.filterTabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Gym</Text>
          </TouchableOpacity>
        </View>

        {/* Workouts List */}
        {WORKOUTS.map((workout) => (
          <Card key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <View>
                <Text style={styles.workoutType}>{workout.type}</Text>
                <Text style={styles.workoutName}>{workout.name}</Text>
              </View>
              <Text style={styles.workoutDuration}>{workout.duration}</Text>
            </View>

            <Text
              style={[
                styles.workoutDifficulty,
                workout.difficulty === 'Beginner' && styles.beginner,
                workout.difficulty === 'Intermediate' && styles.intermediate,
                workout.difficulty === 'Advanced' && styles.advanced,
              ]}
            >
              {workout.difficulty}
            </Text>

            <View style={styles.exercisesContainer}>
              {workout.exercises.map((exercise, i) => (
                <View key={i} style={styles.exercise}>
                  <Text style={styles.exerciseText}>• {exercise}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </Card>
        ))}
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
    marginBottom: 20,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterTabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  workoutCard: {
    marginBottom: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutType: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 4,
  },
  workoutName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  workoutDuration: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
  workoutDifficulty: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  beginner: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#10b981',
  },
  intermediate: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    color: '#f59e0b',
  },
  advanced: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
  },
  exercisesContainer: {
    marginBottom: 16,
  },
  exercise: {
    paddingVertical: 4,
  },
  exerciseText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.background,
  },
});
