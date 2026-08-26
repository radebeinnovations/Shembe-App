import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { FundraiserItem } from './CommunitySupportScreen';

interface FundraiserDetailScreenProps {
  fundraiser: FundraiserItem;
  onBack: () => void;
  onSupport: () => void;
}

export const FundraiserDetailScreen: React.FC<FundraiserDetailScreenProps> = ({
  fundraiser,
  onBack,
  onSupport,
}) => {
  const percent = Math.min(100, Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100));

  const handleShare = () => {
    Alert.alert('Share Fundraiser', `Sharing link to "${fundraiser.title}"`);
  };

  const handleReport = () => {
    Alert.alert('Report Fundraiser', 'Thank you. The church council will review this fundraiser.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Nazareth Baptist Church
        </Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <View style={styles.heroWrapper}>
          <Image source={fundraiser.image} style={styles.heroImage} resizeMode="cover" />
          {fundraiser.isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
              <Text style={styles.verifiedText}>Verified by Church</Text>
            </View>
          )}
        </View>

        {/* Title & Beneficiary */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{fundraiser.title}</Text>
          <Text style={styles.beneficiaryText}>Beneficiary: {fundraiser.beneficiary}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={COLORS.onSurfaceVariant} />
            <Text style={styles.locationText}>{fundraiser.location}</Text>
          </View>
        </View>

        {/* Progress Bento Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressTopRow}>
            <View>
              <Text style={styles.progressLabel}>RAISED</Text>
              <Text style={styles.raisedAmountText}>R {fundraiser.raisedAmount.toLocaleString()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.progressLabel}>GOAL</Text>
              <Text style={styles.goalAmountText}>R {fundraiser.goalAmount.toLocaleString()}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
          </View>

          <View style={styles.progressFooterRow}>
            <View style={styles.daysRow}>
              <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
              <Text style={styles.daysText}>{fundraiser.daysLeft} days remaining</Text>
            </View>

            <Text style={styles.fundedText}>{percent}% Funded</Text>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity style={styles.ctaBtn} onPress={onSupport} activeOpacity={0.85}>
            <Ionicons name="heart" size={18} color={COLORS.white} />
            <Text style={styles.ctaBtnText}>Support This Cause</Text>
          </TouchableOpacity>
        </View>

        {/* Our Story Section */}
        <View style={styles.storySection}>
          <Text style={styles.sectionHeading}>Our Story</Text>
          <Text style={styles.storyText}>{fundraiser.story}</Text>
        </View>

        {/* Supporting Documents Section */}
        {fundraiser.documents && fundraiser.documents.length > 0 && (
          <View style={styles.docsSection}>
            <Text style={styles.sectionHeading}>Supporting Documents</Text>

            <View style={styles.docsGrid}>
              {fundraiser.documents.map((doc, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.docCard}
                  onPress={() => Alert.alert('Download Document', `Downloading ${doc.title}`)}
                >
                  <View style={styles.docIconBox}>
                    <Ionicons name="document-text" size={20} color={COLORS.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.docTitle} numberOfLines={1}>
                      {doc.title}
                    </Text>
                    <Text style={styles.docSubtitle}>{doc.size}</Text>
                  </View>
                  <Ionicons name="cloud-download-outline" size={18} color={COLORS.onSurfaceVariant} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Secondary Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={18} color={COLORS.onSecondaryContainer} />
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportBtn} onPress={handleReport}>
            <Ionicons name="flag-outline" size={18} color={COLORS.onSurfaceVariant} />
            <Text style={styles.reportBtnText}>Report Fundraiser</Text>
          </TouchableOpacity>
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
  backBtn: {
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
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    gap: SPACING.lg,
  },
  heroWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: COLORS.surfaceVariant,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...SHADOWS.card,
  },
  verifiedText: {
    color: COLORS.onSurface,
    fontSize: 11,
    fontWeight: '800',
  },
  titleSection: {
    paddingHorizontal: SPACING.md,
    gap: 4,
  },
  titleText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  beneficiaryText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  progressCard: {
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  raisedAmountText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  goalAmountText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  progressFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  daysText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  fundedText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: RADIUS.md,
    marginTop: 4,
  },
  ctaBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  storySection: {
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  sectionHeading: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
    paddingBottom: 6,
  },
  storyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 15,
    lineHeight: 24,
  },
  docsSection: {
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  docsGrid: {
    gap: 10,
    marginTop: 4,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  docIconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  docSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.secondaryContainer,
    height: 46,
    borderRadius: RADIUS.md,
  },
  shareBtnText: {
    color: COLORS.onSecondaryContainer,
    fontSize: 13,
    fontWeight: '700',
  },
  reportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceContainerLowest,
    height: 46,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  reportBtnText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
});
