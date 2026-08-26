import React, { useState } from 'react';
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

export interface UserFundraiser {
  id: string;
  title: string;
  createdDate: string;
  raisedAmount: number;
  goalAmount: number;
  status: 'active' | 'pending' | 'completed' | 'draft';
}

const INITIAL_MY_FUNDRAISERS: UserFundraiser[] = [
  {
    id: 'mf1',
    title: 'Youth Choir Vestments',
    createdDate: 'Oct 12, 2023',
    raisedAmount: 4500,
    goalAmount: 10000,
    status: 'active',
  },
  {
    id: 'mf2',
    title: 'Pilgrimage Transport Fund',
    createdDate: 'Nov 05, 2023',
    raisedAmount: 0,
    goalAmount: 25900,
    status: 'pending',
  },
  {
    id: 'mf3',
    title: 'Community Food Drive',
    createdDate: 'Sep 20, 2023',
    raisedAmount: 5000,
    goalAmount: 5000,
    status: 'completed',
  },
  {
    id: 'mf4',
    title: 'Ekuphakameni Emergency Repairs',
    createdDate: 'Aug 14, 2023',
    raisedAmount: 1200,
    goalAmount: 15000,
    status: 'draft',
  },
];

interface MyFundraisersScreenProps {
  onBack: () => void;
  onCreateNew: () => void;
}

export const MyFundraisersScreen: React.FC<MyFundraisersScreenProps> = ({
  onBack,
  onCreateNew,
}) => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Pending' | 'Completed' | 'Draft'>('Active');

  const filtered = INITIAL_MY_FUNDRAISERS.filter((f) => {
    if (activeTab === 'Active') return f.status === 'active';
    if (activeTab === 'Pending') return f.status === 'pending';
    if (activeTab === 'Completed') return f.status === 'completed';
    if (activeTab === 'Draft') return f.status === 'draft';
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nazareth Baptist Church</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>My Fundraisers</Text>
          <Text style={styles.screenSubtitle}>Manage and track the progress of your campaigns.</Text>
        </View>

        {/* Filter Tabs (Active | Pending | Completed | Draft) */}
        <View style={styles.tabsRow}>
          {(['Active', 'Pending', 'Completed', 'Draft'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabItem, isSelected && styles.activeTabItem]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, isSelected && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Fundraiser Cards List matching image_0.png */}
        <View style={styles.cardsList}>
          {filtered.map((item) => {
            const percent = Math.min(100, Math.round((item.raisedAmount / item.goalAmount) * 100));
            return (
              <View key={item.id} style={styles.fundraiserCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {item.status === 'active' && (
                    <View style={styles.activeBadge}>
                      <Ionicons name="checkmark-circle" size={12} color={COLORS.white} />
                      <Text style={styles.badgeText}>Active</Text>
                    </View>
                  )}
                  {item.status === 'pending' && (
                    <View style={styles.pendingBadge}>
                      <Text style={styles.pendingBadgeText}>Under Review</Text>
                    </View>
                  )}
                  {item.status === 'completed' && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.badgeText}>Completed</Text>
                    </View>
                  )}
                  {item.status === 'draft' && (
                    <View style={styles.draftBadge}>
                      <Text style={styles.draftBadgeText}>Draft</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.createdText}>Created: {item.createdDate}</Text>

                <View style={styles.progressContainer}>
                  <View style={styles.progressTextRow}>
                    <Text style={styles.raisedText}>
                      R {item.raisedAmount.toLocaleString()} Raised
                    </Text>
                    <Text style={styles.goalText}>
                      Goal: R {item.goalAmount.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
                  </View>
                </View>

                {/* Card Actions */}
                <View style={styles.cardActionsRow}>
                  {item.status === 'active' && (
                    <>
                      <TouchableOpacity
                        style={styles.shareBtn}
                        onPress={() => Alert.alert('Share Fundraiser', `Sharing "${item.title}" link`)}
                      >
                        <Text style={styles.shareBtnText}>Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.manageBtn}
                        onPress={() => Alert.alert('Manage Fundraiser', `Manage updates for "${item.title}"`)}
                      >
                        <Text style={styles.manageBtnText}>Manage</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {item.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.editDraftBtn}
                      onPress={() => Alert.alert('Under Review', 'Your fundraiser is currently under review by the church council.')}
                    >
                      <Text style={styles.editDraftText}>View Status</Text>
                    </TouchableOpacity>
                  )}

                  {item.status === 'draft' && (
                    <TouchableOpacity style={styles.editDraftBtn} onPress={onCreateNew}>
                      <Text style={styles.editDraftText}>Edit Draft</Text>
                    </TouchableOpacity>
                  )}

                  {item.status === 'completed' && (
                    <TouchableOpacity
                      style={styles.manageBtn}
                      onPress={() => Alert.alert('Fundraiser Completed! 🎉', `Total R ${item.raisedAmount} collected.`)}
                    >
                      <Text style={styles.manageBtnText}>View Summary</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Action Button: + Create New */}
      <TouchableOpacity style={styles.fabBtn} onPress={onCreateNew} activeOpacity={0.85}>
        <Ionicons name="add" size={20} color={COLORS.primary} />
        <Text style={styles.fabText}>Create New</Text>
      </TouchableOpacity>
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
    paddingBottom: 90,
  },
  titleSection: {
    gap: 4,
  },
  screenTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  screenSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  cardsList: {
    gap: 14,
    marginTop: 4,
  },
  fundraiserCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 10,
    ...SHADOWS.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 17,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  activeBadge: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  pendingBadge: {
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  pendingBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  completedBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  draftBadge: {
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  draftBadgeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
  },
  createdText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  progressContainer: {
    gap: 6,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  raisedText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  goalText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  shareBtn: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  shareBtnText: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: '700',
  },
  manageBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  manageBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  editDraftBtn: {
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  editDraftText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  fabBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  fabText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
  },
});
