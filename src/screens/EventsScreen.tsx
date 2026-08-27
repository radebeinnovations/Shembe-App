import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';

interface Props {
  onBack: () => void;
}

export const EventsScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Events</Text>
            <Text style={styles.headerSubtitle}>Gatherings, festivals, and key dates.</Text>
          </View>
        </View>

        <View style={styles.placeholderCard}>
          <Ionicons name="calendar-outline" size={48} color={COLORS.primary} style={{ marginBottom: 16 }} />
          <Text style={styles.placeholderTitle}>No Upcoming Events</Text>
          <Text style={styles.placeholderText}>
            Check back later for updates on church gatherings and festivals.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
  },
  backBtn: {
    marginRight: SPACING.md,
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  placeholderCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
});
