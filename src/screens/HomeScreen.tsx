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
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

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
          onPress={() => onNavigate('NotificationsSettings')}
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

      {/* Quick Access Bento Grid with Clean Vector Icons */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.quickAccessHeaderLabel}>Quick Access</Text>

        <View style={styles.twoColumnGrid}>
          {/* 1. Hymns */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Hymns')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FFF7E6' }]}>
              <MaterialCommunityIcons name="book-open" size={24} color="#745c00" />
            </View>
            <Text style={styles.bentoCardTitle}>Hymns</Text>
          </TouchableOpacity>

          {/* 2. Sermons */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Sermons')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FFF7E6' }]}>
              <MaterialCommunityIcons name="bullhorn" size={24} color="#745c00" />
            </View>
            <Text style={styles.bentoCardTitle}>Sermons</Text>
          </TouchableOpacity>

          {/* 3. Prayer */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Prayer')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
              <MaterialCommunityIcons name="hands-pray" size={26} color="#063E27" />
            </View>
            <Text style={styles.bentoCardTitle}>Prayer</Text>
          </TouchableOpacity>

          {/* 4. Scriptures */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Bible')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="book" size={22} color="#475569" />
            </View>
            <Text style={styles.bentoCardTitle}>Scriptures</Text>
          </TouchableOpacity>

          {/* 5. Give */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Offerings')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FDE68A' }]}>
              <MaterialCommunityIcons name="hand-heart" size={24} color="#745c00" />
            </View>
            <Text style={styles.bentoCardTitle}>Give</Text>
          </TouchableOpacity>

          {/* 6. Community */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => onNavigate('Explore_Community')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F1F5F9' }]}>
              <MaterialCommunityIcons name="account-group" size={26} color="#475569" />
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
