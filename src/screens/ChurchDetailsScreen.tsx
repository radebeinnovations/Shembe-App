import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface ChurchDetailsScreenProps {
  onBack: () => void;
  onDirections?: () => void;
  church?: {
    id: string;
    name: string;
    location: string;
    badge: string;
    distance: string;
    phone: string;
    email: string;
    about: string;
    image: any;
  };
}

export const ChurchDetailsScreen: React.FC<ChurchDetailsScreenProps> = ({
  onBack,
  onDirections,
  church = {
    id: 'ekuphakameni',
    name: 'Ekuphakameni Mission',
    location: 'Inanda, KwaZulu-Natal',
    badge: 'Headquarters',
    distance: '25km',
    phone: '+27 31 123 4567',
    email: 'info@ekuphakameni.org',
    about:
      "Ekuphakameni, meaning 'the elevated place', serves as the historic and spiritual headquarters of the Nazareth Baptist Church. Founded in the early 20th century, it is a site of deep pilgrimage, reverence, and communal worship, preserving the traditions of the White Garment and the Holy Mountain.",
    image: require('../../assets/ekuphakameni_hero.png'),
  },
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${church.name} - ${church.location}. Shembe Church App.`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetDirections = () => {
    if (onDirections) {
      onDirections();
    } else {
      Alert.alert(
        'Directions',
        `Opening GPS navigation to ${church.name} (${church.location}).`
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Church Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Hero Image Section */}
        <View style={styles.heroCard}>
          <Image source={church.image} style={styles.heroImage} resizeMode="cover" />

          {/* Floating Actions */}
          <View style={styles.floatingActions}>
            <TouchableOpacity
              style={styles.floatingBtn}
              onPress={() => setIsBookmarked(!isBookmarked)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.floatingBtn} onPress={handleShare} activeOpacity={0.8}>
              <Ionicons name="share-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Hero Overlay Info */}
          <View style={styles.heroOverlay}>
            <View style={styles.badgeWrapper}>
              <Text style={styles.badgeText}>{church.badge}</Text>
            </View>
            <Text style={styles.heroTitle}>{church.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.surfaceContainerLow} />
              <Text style={styles.locationText}>{church.location}</Text>
            </View>
          </View>
        </View>

        {/* Quick Action Bento Grid (Directions & Give) */}
        <View style={styles.bentoRow}>
          <TouchableOpacity
            style={styles.directionsBtn}
            onPress={handleGetDirections}
            activeOpacity={0.85}
          >
            <Ionicons name="compass-outline" size={24} color={COLORS.white} />
            <Text style={styles.directionsBtnText}>Get Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.giveBtn} onPress={() => Alert.alert('Give Offering', 'Support this congregation')} activeOpacity={0.85}>
            <Ionicons name="heart-outline" size={24} color={COLORS.white} />
            <Text style={styles.giveBtnText}>Give</Text>
          </TouchableOpacity>
        </View>

        {/* Service Times Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="time-outline" size={22} color={COLORS.primary} />
            <Text style={styles.cardHeaderTitle}>Service Times</Text>
          </View>

          <View style={styles.serviceRow}>
            <View>
              <Text style={styles.serviceTitle}>Sabbath Service</Text>
              <Text style={styles.serviceSubtitle}>Main Congregation</Text>
            </View>
            <Text style={styles.serviceTimeText}>09:00 AM</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.serviceRow}>
            <View>
              <Text style={styles.serviceTitle}>Evening Prayer</Text>
              <Text style={styles.serviceSubtitle}>Daily Gathering</Text>
            </View>
            <Text style={styles.serviceTimeText}>18:00 PM</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>About This Church</Text>
          <Text style={styles.aboutText}>{church.about}</Text>
        </View>

        {/* Contact Info Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>Contact Info</Text>

          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.outline} style={styles.contactIcon} />
            <View>
              <Text style={styles.contactMainText}>{church.phone}</Text>
              <Text style={styles.contactLabel}>OFFICE HOURS</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color={COLORS.outline} style={styles.contactIcon} />
            <View>
              <Text style={styles.contactMainText}>{church.email}</Text>
              <Text style={styles.contactLabel}>GENERAL INQUIRIES</Text>
            </View>
          </View>
        </View>

        {/* Request Prayer Action Button */}
        <TouchableOpacity
          style={styles.requestPrayerBtn}
          onPress={() => Alert.alert('Request Prayer', 'Your prayer request has been sent to the elders.')}
          activeOpacity={0.85}
        >
          <Ionicons name="sparkles-outline" size={20} color={COLORS.onSurface} />
          <Text style={styles.requestPrayerBtnText}>Request Prayer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  topBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  backBtn: {
    width: 44,
    height: 44,
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
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: 60,
  },
  heroCard: {
    width: '100%',
    height: 240,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  floatingActions: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    gap: 8,
  },
  floatingBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(49, 36, 25, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeText: {
    color: '#f6decd',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: COLORS.surfaceContainerLow,
    fontSize: 13,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: SPACING.md,
  },
  directionsBtn: {
    flex: 1,
    height: 72,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    ...SHADOWS.card,
  },
  directionsBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  giveBtn: {
    flex: 1,
    height: 72,
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    ...SHADOWS.card,
  },
  giveBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.md,
  },
  cardHeaderTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  serviceTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '600',
  },
  serviceSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  serviceTimeText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginVertical: 10,
  },
  aboutText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  contactIcon: {
    marginRight: 12,
  },
  contactMainText: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '600',
  },
  contactLabel: {
    color: COLORS.outline,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  requestPrayerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    gap: 8,
    marginTop: SPACING.xs,
    ...SHADOWS.card,
  },
  requestPrayerBtnText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
});
