import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { CommunitySupportScreen, FundraiserItem } from './CommunitySupportScreen';
import { FundraiserDetailScreen } from './FundraiserDetailScreen';
import { CreateFundraiserScreen } from './CreateFundraiserScreen';

interface ExploreScreenProps {
  onNavigate: (screen: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate }) => {
  const [subScreen, setSubScreen] = useState<'explore' | 'community' | 'detail' | 'create'>('explore');
  const [selectedFundraiser, setSelectedFundraiser] = useState<FundraiserItem | null>(null);

  if (subScreen === 'community') {
    return (
      <CommunitySupportScreen
        onBack={() => setSubScreen('explore')}
        onSelectFundraiser={(item) => {
          setSelectedFundraiser(item);
          setSubScreen('detail');
        }}
        onCreateFundraiser={() => setSubScreen('create')}
      />
    );
  }

  if (subScreen === 'detail' && selectedFundraiser) {
    return (
      <FundraiserDetailScreen
        fundraiser={selectedFundraiser}
        onBack={() => setSubScreen('community')}
        onSupport={() => onNavigate('Offerings')}
      />
    );
  }

  if (subScreen === 'create') {
    return (
      <CreateFundraiserScreen
        onClose={() => setSubScreen('community')}
        onViewMyFundraisers={() => setSubScreen('community')}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../../assets/shembe_portrait.png')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.headerTitle}>Explore</Text>
        </View>

        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Community Support Hero Banner */}
      <TouchableOpacity
        style={styles.communityBanner}
        onPress={() => setSubScreen('community')}
        activeOpacity={0.88}
      >
        <Image
          source={require('../../assets/onboarding4_pray_give.png')}
          style={styles.communityBannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerTextContent}>
          <View style={styles.bannerBadge}>
            <Ionicons name="heart" size={12} color={COLORS.white} />
            <Text style={styles.bannerBadgeText}>COMMUNITY SUPPORT</Text>
          </View>
          <Text style={styles.bannerTitle}>Support Approved Causes & Needs</Text>
          <Text style={styles.bannerSubtitle}>
            Help repair sanctuaries, fund youth education & support widows.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 1. Worship Category */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Worship</Text>
        <View style={styles.worshipStack}>
          {/* Hymns Card */}
          <TouchableOpacity
            style={styles.worshipCard}
            onPress={() => onNavigate('Hymns')}
            activeOpacity={0.85}
          >
            <View style={styles.worshipImageContainer}>
              <Image
                source={require('../../assets/hymns_cover.png')}
                style={styles.worshipImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.worshipContent}>
              <Ionicons name="book-outline" size={20} color={COLORS.primary} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Hymns</Text>
              <Text style={styles.cardSubtitle} numberOfLines={2}>
                Sacred songs of the Nazareth Baptist Church.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Sermons Card */}
          <TouchableOpacity
            style={styles.worshipCard}
            onPress={() => onNavigate('Sermons')}
            activeOpacity={0.85}
          >
            <View style={styles.worshipImageContainer}>
              <Image
                source={require('../../assets/sermons_cover.png')}
                style={styles.worshipImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.worshipContent}>
              <Ionicons name="mic-outline" size={20} color={COLORS.primary} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Sermons</Text>
              <Text style={styles.cardSubtitle} numberOfLines={2}>
                Spiritual teachings and address recordings.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Pilgrimage Category */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pilgrimage</Text>
        <TouchableOpacity
          style={styles.pilgrimageCard}
          onPress={() => onNavigate('Pilgrimage')}
          activeOpacity={0.85}
        >
          <View style={styles.pilgrimageImageContainer}>
            <Image
              source={require('../../assets/bible_cover.png')}
              style={styles.pilgrimageImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.pilgrimageContent}>
            <Ionicons name="compass-outline" size={20} color={COLORS.primary} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Sacred Journeys</Text>
            <Text style={styles.cardSubtitle} numberOfLines={2}>
              Holy pilgrimage trails, rest stops, and holy mountain guides.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 3. Give & Support Category */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Give & Support</Text>
        <View style={styles.giveStack}>
          {/* Community Support Link */}
          <TouchableOpacity
            style={styles.giveCard}
            onPress={() => setSubScreen('community')}
            activeOpacity={0.85}
          >
            <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.giveCardTitle}>Community Support</Text>
              <Text style={styles.giveCardSubtitle}>Support verified parish initiatives & fundraisers.</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          {/* Digital Offerings Link */}
          <TouchableOpacity
            style={styles.giveCard}
            onPress={() => onNavigate('Offerings')}
            activeOpacity={0.85}
          >
            <Ionicons name="wallet-outline" size={24} color={COLORS.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.giveCardTitle}>Digital Offerings</Text>
              <Text style={styles.giveCardSubtitle}>Tithes, Intekelo kaSabatha & Ukundlondlobeza.</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.lg,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityBanner: {
    width: '100%',
    height: 160,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.card,
  },
  communityBannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(1, 45, 29, 0.65)',
  },
  bannerTextContent: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
    gap: 4,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  worshipStack: {
    gap: SPACING.md,
  },
  worshipCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.card,
  },
  worshipImageContainer: {
    height: 140,
    width: '100%',
  },
  worshipImage: {
    width: '100%',
    height: '100%',
  },
  worshipContent: {
    padding: SPACING.md,
  },
  cardIcon: {
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.onSurface,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  pilgrimageCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.card,
  },
  pilgrimageImageContainer: {
    height: 140,
    width: '100%',
  },
  pilgrimageImage: {
    width: '100%',
    height: '100%',
  },
  pilgrimageContent: {
    padding: SPACING.md,
  },
  giveStack: {
    gap: 10,
  },
  giveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.card,
  },
  giveCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.onSurface,
  },
  giveCardSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
});
