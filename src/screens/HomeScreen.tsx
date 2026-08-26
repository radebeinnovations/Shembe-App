import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

/* Custom SVG Icons matching exact Stitch prototype image_0.png & image_1.png */
const HymnsIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="#735c00">
    <Path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.2 20.1 5.05 19.5 6.5 19.5c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.35-.75-2-1zm-1 12.25c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v10.25zM6.5 7.5c.78 0 1.55.08 2.25.25V9.3c-.7-.13-1.47-.2-2.25-.2-1.35 0-2.85.3-4 1V8.5c1.15-.7 2.65-1 4-1zm0 3c.78 0 1.55.08 2.25.25v1.55c-.7-.13-1.47-.2-2.25-.2-1.35 0-2.85.3-4 1v-1.6c1.15-.7 2.65-1 4-1zm0 3c.78 0 1.55.08 2.25.25v1.55c-.7-.13-1.47-.2-2.25-.2-1.35 0-2.85.3-4 1v-1.6c1.15-.7 2.65-1 4-1z" />
  </Svg>
);

const SermonsIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24">
    <Path d="M4 9h3l5-4v14l-5-4H4V9z" fill="#735c00" />
    <Path d="M7 14h2.5v3.5H7z" fill="#735c00" />
    <Path
      d="M15.5 8.5l2.2-2.2M17.5 12h3M15.5 15.5l2.2 2.2"
      stroke="#735c00"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const PrayerIcon = () => (
  <Svg width={30} height={30} viewBox="0 0 24 24" fill="#012d1d">
    <Path d="M12 2L6 8.5V19h3.5v-8.5L12 6.5l2.5 4V19H18V8.5L12 2z" />
  </Svg>
);

const ScripturesIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="#414844">
    <Path d="M19 2H6c-1.2 0-2 .9-2 2v16c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 17H6V4h7v15zm6 0h-4V4h4v15z" />
  </Svg>
);

const GiveIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="#745c00">
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommunityIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="#414844">
    <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </Svg>
);

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const handleShareQuote = async () => {
    try {
      await Share.share({
        message: '"Kholwa kuJehova ngayo yonke inhliziyo yakho, ungenciki kokwakho ukuqonda." - IzAga 3:5 (Shembe App)',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header Section matching Stitch design */}
      <View style={styles.header}>
        <View style={styles.userProfileRow}>
          <Image
            source={require('../../assets/sipho_profile.png')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <View style={styles.userTextWrapper}>
            <Text style={styles.greetingLabel}>SAWUBONA</Text>
            <Text style={styles.userNameText}>John Doe</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => onNavigate('Explore')}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Today's Inspiration Card */}
      <View style={styles.inspirationSection}>
        <Text style={styles.inspirationSectionLabel}>Today's Inspiration</Text>
        <View style={styles.inspirationCard}>
          <Text style={styles.quoteWatermark}>❝</Text>

          <Text style={styles.quoteText}>
            "Kholwa kuJehova ngayo yonke inhliziyo yakho, ungenciki kokwakho ukuqonda."
          </Text>

          <View style={styles.quoteFooterRow}>
            <Text style={styles.verseRefText}>IZAGA 3:5</Text>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShareQuote} activeOpacity={0.8}>
              <Ionicons name="share-outline" size={14} color={COLORS.onPrimaryContainer} />
              <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Access Bento Grid with Exact Prototype SVG Icons */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.quickAccessHeaderLabel}>Quick Access</Text>

        <View style={styles.twoColumnGrid}>
          {/* 1. Hymns */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Hymns')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#fff6d6' }]}>
              <HymnsIcon />
            </View>
            <Text style={styles.bentoCardTitle}>Hymns</Text>
          </TouchableOpacity>

          {/* 2. Sermons */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Sermons')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#fff6d6' }]}>
              <SermonsIcon />
            </View>
            <Text style={styles.bentoCardTitle}>Sermons</Text>
          </TouchableOpacity>

          {/* 3. Prayer */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Prayer')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#e0f2f1' }]}>
              <PrayerIcon />
            </View>
            <Text style={styles.bentoCardTitle}>Prayer</Text>
          </TouchableOpacity>

          {/* 4. Scriptures */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Hymns')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#efeeea' }]}>
              <ScripturesIcon />
            </View>
            <Text style={styles.bentoCardTitle}>Scriptures</Text>
          </TouchableOpacity>

          {/* 5. Give */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Offerings')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#fed65b' }]}>
              <GiveIcon />
            </View>
            <Text style={styles.bentoCardTitle}>Give</Text>
          </TouchableOpacity>

          {/* 6. Community */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Explore')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#efeeea' }]}>
              <CommunityIcon />
            </View>
            <Text style={styles.bentoCardTitle}>Community</Text>
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
    paddingTop: 8,
  },
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  userTextWrapper: {
    gap: 1,
  },
  greetingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -0.3,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  inspirationSection: {
    gap: SPACING.xs,
  },
  inspirationSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
  inspirationCard: {
    backgroundColor: '#1b4332',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    position: 'relative',
    overflow: 'hidden',
    gap: SPACING.md,
    ...SHADOWS.card,
  },
  quoteWatermark: {
    position: 'absolute',
    top: 10,
    right: 14,
    fontSize: 72,
    color: 'rgba(255, 255, 255, 0.12)',
    fontWeight: '900',
  },
  quoteText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    fontStyle: 'italic',
    paddingRight: 20,
  },
  quoteFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.xs,
  },
  verseRefText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shareBtnText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 13,
    fontWeight: '700',
  },
  quickAccessSection: {
    gap: SPACING.sm,
  },
  quickAccessHeaderLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bentoCard: {
    width: '48%',
    height: 120,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
});
