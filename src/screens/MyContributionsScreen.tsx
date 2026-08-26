import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export interface ContributionRecord {
  id: string;
  title: string;
  beneficiary: string;
  date: string;
  ref: string;
  amount: number;
  status: 'Successful' | 'Pending';
}

const MOCK_CONTRIBUTIONS: ContributionRecord[] = [
  {
    id: 'c1',
    title: 'Ekuphumleni Orphanage Roof Repair',
    beneficiary: 'Ekuphumleni Care Centre',
    date: '12 Oct 2023',
    ref: 'CM-8924-A',
    amount: 500,
    status: 'Successful',
  },
  {
    id: 'c2',
    title: 'Community Vegetable Garden Seeds',
    beneficiary: 'Youth Agriculture Co-op',
    date: '28 Aug 2023',
    ref: 'CM-7731-B',
    amount: 150,
    status: 'Successful',
  },
  {
    id: 'c3',
    title: 'Widows Support Fund - Winter Blankets',
    beneficiary: 'Umama Womthandazo',
    date: '05 May 2023',
    ref: 'CM-4490-W',
    amount: 800,
    status: 'Successful',
  },
];

interface MyContributionsScreenProps {
  onBack: () => void;
}

export const MyContributionsScreen: React.FC<MyContributionsScreenProps> = ({ onBack }) => {
  const totalGiven = MOCK_CONTRIBUTIONS.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Contributions</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Top Summary Stat Bento Cards matching image_1.png */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL GIVEN</Text>
            <Text style={styles.statValue}>R {totalGiven.toLocaleString()}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>FUNDRAISERS</Text>
            <Text style={styles.statValue}>{MOCK_CONTRIBUTIONS.length}</Text>
          </View>
        </View>

        {/* Contributions List */}
        <View style={styles.listSection}>
          {MOCK_CONTRIBUTIONS.map((item) => (
            <View key={item.id} style={styles.contributionCard}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle-outline" size={12} color={COLORS.onSurface} />
                  <Text style={styles.statusBadgeText}>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.beneficiaryText}>Beneficiary: {item.beneficiary}</Text>

              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={12} color={COLORS.onSurfaceVariant} />
                <Text style={styles.metaText}>
                  {item.date} • Ref: {item.ref}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardBottomRow}>
                <Text style={styles.amountLabel}>Amount</Text>
                <Text style={styles.amountValue}>R {item.amount}</Text>
              </View>

              <TouchableOpacity
                style={styles.receiptBtn}
                onPress={() =>
                  Alert.alert(
                    'Contribution Receipt 🧾',
                    `Cause: ${item.title}\nBeneficiary: ${item.beneficiary}\nRef: ${item.ref}\nAmount Paid: R ${item.amount}\nStatus: Verified Successful`
                  )
                }
              >
                <Ionicons name="receipt-outline" size={14} color={COLORS.primary} />
                <Text style={styles.receiptBtnText}>View Receipt</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 60,
    backgroundColor: COLORS.surfaceContainerLowest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  statLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  listSection: {
    gap: 14,
    marginTop: 4,
  },
  contributionCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    gap: 6,
    ...SHADOWS.card,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  statusBadgeText: {
    color: COLORS.onSurface,
    fontSize: 10,
    fontWeight: '700',
  },
  beneficiaryText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginVertical: 4,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  amountValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  receiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    marginTop: 4,
  },
  receiptBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
