import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';

interface Props {
  onBack: () => void;
}

export const HelpSupportScreen: React.FC<Props> = ({ onBack }) => {
  const handleEmail = () => {
    Linking.openURL('mailto:support@shembeapp.com').catch(() => {});
  };

  const handleCall = () => {
    Linking.openURL('tel:+27820000000').catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Help & Support</Text>
            <Text style={styles.headerSubtitle}>How can we assist you today?</Text>
          </View>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.actionRow} onPress={handleEmail} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="mail" size={24} color="#0284C7" />
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Email Support</Text>
              <Text style={styles.actionDesc}>support@shembeapp.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionRow} onPress={handleCall} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="call" size={24} color="#16A34A" />
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Call Us</Text>
              <Text style={styles.actionDesc}>+27 82 000 0000</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        <View style={styles.faqCard}>
          <Text style={styles.faqQuestion}>Q: How do I save a hymn for offline use?</Text>
          <Text style={styles.faqAnswer}>
            A: Open any hymn from the Hymns tab and tap the "Download" or "Heart" icon. It will be saved locally on your device for offline reading.
          </Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQuestion}>Q: Can I change my branch / temple?</Text>
          <Text style={styles.faqAnswer}>
            A: Currently, branch assignments are fixed to your registered profile. Please contact support if you need to update this information.
          </Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQuestion}>Q: Are my offerings secure?</Text>
          <Text style={styles.faqAnswer}>
            A: Yes. All tithes and offerings are processed securely via Yoco / PayFast and are heavily encrypted.
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
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  faqCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.onSurface,
    lineHeight: 20,
  }
});
