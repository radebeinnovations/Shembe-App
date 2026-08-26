import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export interface FundraiserItem {
  id: string;
  title: string;
  beneficiary: string;
  location: string;
  description: string;
  story: string;
  raisedAmount: number;
  goalAmount: number;
  daysLeft: number;
  isVerified: boolean;
  image: any;
  documents?: { title: string; size: string }[];
}

export const MOCK_FUNDRAISERS: FundraiserItem[] = [
  {
    id: '1',
    title: 'Ekuphakameni Roof Repair',
    beneficiary: 'Ekuphakameni Parish',
    location: 'Ebuhleni Headquarters, Inanda',
    description: 'Help us repair the main hall roof before the rainy season begins to ensure safe gatherings.',
    story: `Peace be unto you, brethren. Following the heavy storms that passed through the Inanda region last month, the main sanctuary at the Ekuphumuleni Parish sustained significant damage to its roofing structure.

This sanctuary has been a cornerstone for our Sabbath gatherings and holy festivals for over two decades. It is where we come together in our white garments to offer praise, sing hymns, and seek spiritual renewal.

We are calling upon the wider community to assist in raising the necessary funds to repair the roof before the upcoming July festival. Every contribution, no matter the size, brings us closer to restoring our place of worship to its former glory. May you be blessed for your generosity.`,
    raisedAmount: 15400,
    goalAmount: 25000,
    daysLeft: 14,
    isVerified: true,
    image: require('../../assets/ekuphakameni_hero.png'),
    documents: [
      { title: 'Damage_Assessment.pdf', size: 'PDF • 1.2 MB' },
      { title: 'Contractor_Quote.pdf', size: 'PDF • 850 KB' },
    ],
  },
  {
    id: '2',
    title: 'Youth Education Fund',
    beneficiary: 'Youth Ministry',
    location: 'KwaZulu-Natal Region',
    description: 'Supporting university students within our congregation with textbook and transport stipends.',
    story: `Empowering our youth through education and spiritual guidance. Funds raised go directly toward tuition assistance, textbook stipends, and transport for students attending tertiary institutions.`,
    raisedAmount: 8500,
    goalAmount: 10000,
    daysLeft: 30,
    isVerified: true,
    image: require('../../assets/onboarding2_worship.png'),
  },
  {
    id: '3',
    title: 'Widow Support Initiative',
    beneficiary: 'Mrs. N. Dlamini',
    location: 'Inanda, KZN',
    description: 'Emergency assistance for home repairs after the recent severe storms.',
    story: `Supporting widows and elders in our community with emergency home repairs and food parcels following seasonal flooding.`,
    raisedAmount: 4500,
    goalAmount: 10000,
    daysLeft: 20,
    isVerified: true,
    image: require('../../assets/church1_ebuhleni.png'),
  },
  {
    id: '4',
    title: 'Choir Uniforms',
    beneficiary: 'Junior Choir',
    location: 'Umlazi Branch',
    description: 'Sponsoring new white garments for the junior choir members for the upcoming festival.',
    story: `Providing sacred white garments and traditional sashes for 30 young members of the junior choir.`,
    raisedAmount: 750,
    goalAmount: 5000,
    daysLeft: 45,
    isVerified: true,
    image: require('../../assets/onboarding3_connected.png'),
  },
];

import { MyContributionsScreen } from './MyContributionsScreen';
import { MyFundraisersScreen } from './MyFundraisersScreen';
import { CreateFundraiserScreen } from './CreateFundraiserScreen';

interface CommunitySupportScreenProps {
  onBack?: () => void;
  onSelectFundraiser: (item: FundraiserItem) => void;
  onCreateFundraiser?: () => void;
}

export const CommunitySupportScreen: React.FC<CommunitySupportScreenProps> = ({
  onBack,
  onSelectFundraiser,
}) => {
  const [subScreen, setSubScreen] = useState<'main' | 'my_contributions' | 'my_fundraisers' | 'create_fundraiser'>('main');

  if (subScreen === 'my_contributions') {
    return <MyContributionsScreen onBack={() => setSubScreen('main')} />;
  }

  if (subScreen === 'my_fundraisers') {
    return (
      <MyFundraisersScreen
        onBack={() => setSubScreen('main')}
        onCreateNew={() => setSubScreen('create_fundraiser')}
      />
    );
  }

  if (subScreen === 'create_fundraiser') {
    return (
      <CreateFundraiserScreen
        onClose={() => setSubScreen('main')}
        onViewMyFundraisers={() => setSubScreen('my_fundraisers')}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Nazareth Baptist Church</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Community Support</Text>
          <Text style={styles.screenSubtitle}>
            Support approved community needs and help those who need assistance.
          </Text>
        </View>

        {/* Quick Links & Create Action */}
        <View style={styles.quickLinksRow}>
          <TouchableOpacity
            style={styles.quickLinkBtn}
            onPress={() => setSubScreen('my_contributions')}
          >
            <Ionicons name="heart" size={18} color={COLORS.primary} />
            <Text style={styles.quickLinkText}>My Contributions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLinkBtn}
            onPress={() => setSubScreen('my_fundraisers')}
          >
            <Ionicons name="megaphone" size={18} color={COLORS.primary} />
            <Text style={styles.quickLinkText}>My Fundraisers</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Causes (Horizontal Scroll) */}
        <View style={styles.sectionHeader}>
          <Ionicons name="star" size={18} color={COLORS.secondary} />
          <Text style={styles.sectionTitleText}>Featured Causes</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {MOCK_FUNDRAISERS.slice(0, 2).map((item) => {
            const percent = Math.min(100, Math.round((item.raisedAmount / item.goalAmount) * 100));
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.featuredCard}
                onPress={() => onSelectFundraiser(item)}
                activeOpacity={0.85}
              >
                <View style={styles.featuredImageWrapper}>
                  <Image source={item.image} style={styles.featuredImage} resizeMode="cover" />
                  {item.isVerified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={12} color={COLORS.white} />
                      <Text style={styles.verifiedBadgeText}>Verified</Text>
                    </View>
                  )}
                </View>

                <View style={styles.featuredContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardBeneficiary}>BENEFICIARY: {item.beneficiary}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressRow}>
                      <Text style={styles.raisedText}>R {item.raisedAmount.toLocaleString()} raised</Text>
                      <Text style={styles.goalText}>R {item.goalAmount.toLocaleString()} goal</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                      <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
                    </View>
                  </View>

                  <View style={styles.cardFooterRow}>
                    <View style={styles.daysRow}>
                      <Ionicons name="time-outline" size={14} color={COLORS.error} />
                      <Text style={styles.daysText}>{item.daysLeft} Days Left</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.supportBtn}
                      onPress={() => onSelectFundraiser(item)}
                    >
                      <Text style={styles.supportBtnText}>Support</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Active Needs (Vertical List) */}
        <View style={styles.sectionHeader}>
          <Ionicons name="list" size={18} color={COLORS.primary} />
          <Text style={styles.sectionTitleText}>Active Needs</Text>
        </View>

        <View style={styles.verticalList}>
          {MOCK_FUNDRAISERS.map((item) => {
            const percent = Math.min(100, Math.round((item.raisedAmount / item.goalAmount) * 100));
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.verticalCard}
                onPress={() => onSelectFundraiser(item)}
                activeOpacity={0.85}
              >
                <Image source={item.image} style={styles.verticalImage} resizeMode="cover" />

                <View style={styles.verticalInfo}>
                  <View style={styles.titleBadgeRow}>
                    <Text style={styles.verticalTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Ionicons name="hand-left" size={16} color={COLORS.secondary} />
                  </View>

                  <Text style={styles.verticalBeneficiary}>BENEFICIARY: {item.beneficiary}</Text>
                  <Text style={styles.verticalDesc} numberOfLines={2}>
                    {item.description}
                  </Text>

                  <View style={styles.smallProgressBg}>
                    <View style={[styles.smallProgressFill, { width: `${percent}%` }]} />
                  </View>

                  <View style={styles.verticalFooterRow}>
                    <Text style={styles.percentText}>
                      R {item.raisedAmount.toLocaleString()} / R {item.goalAmount.toLocaleString()} ({percent}%)
                    </Text>

                    <TouchableOpacity
                      style={styles.contributeBtn}
                      onPress={() => onSelectFundraiser(item)}
                    >
                      <Text style={styles.contributeBtnText}>Contribute</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  quickLinksRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: SPACING.xs,
  },
  quickLinkBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.card,
  },
  quickLinkText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  sectionTitleText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  horizontalScroll: {
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  featuredCard: {
    width: 300,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginRight: 12,
    ...SHADOWS.card,
  },
  featuredImageWrapper: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  featuredContent: {
    padding: SPACING.md,
    gap: 6,
  },
  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  cardBeneficiary: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cardDescription: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 16,
  },
  progressContainer: {
    gap: 4,
    marginTop: 6,
  },
  progressRow: {
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
    backgroundColor: COLORS.primaryContainer,
    borderRadius: RADIUS.full,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  daysText: {
    color: COLORS.error,
    fontSize: 11,
    fontWeight: '700',
  },
  supportBtn: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
  },
  supportBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  verticalList: {
    gap: 12,
  },
  verticalCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  verticalImage: {
    width: '100%',
    height: 120,
  },
  verticalInfo: {
    padding: SPACING.md,
    gap: 6,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  verticalBeneficiary: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  verticalDesc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 16,
  },
  smallProgressBg: {
    height: 4,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginTop: 4,
  },
  smallProgressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.full,
  },
  verticalFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  percentText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '600',
  },
  contributeBtn: {
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  contributeBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
