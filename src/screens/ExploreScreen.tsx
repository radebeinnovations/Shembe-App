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
  initialSubScreen?: 'explore' | 'community' | 'detail' | 'create';
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ 
  onNavigate, 
  initialSubScreen = 'explore' 
}) => {
  const [subScreen, setSubScreen] = useState<'explore' | 'community' | 'detail' | 'create'>(initialSubScreen);
  const [selectedFundraiser, setSelectedFundraiser] = useState<FundraiserItem | null>(null);

  React.useEffect(() => {
    setSubScreen(initialSubScreen);
  }, [initialSubScreen]);

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
        onViewMyFundraisers={() => onNavigate('MyFundraisers')}
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

        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => onNavigate('NotificationsSettings')}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* We no longer have the hero banner at the top in the new design */}

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

      {/* 2. Spiritual Growth */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spiritual Growth</Text>
        <View style={styles.spiritualGrid}>
          {/* Left Column (Bible) */}
          <TouchableOpacity style={styles.bibleCard} activeOpacity={0.85} onPress={() => onNavigate('Bible')}>
            <Image
              source={require('../../assets/bible_cover.png')}
              style={styles.bibleImage}
            />
            <View style={styles.bibleContent}>
              <Ionicons name="book" size={20} color={COLORS.primary} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Bible</Text>
              <Text style={styles.cardSubtitle}>Daily readings and scripture study.</Text>
            </View>
          </TouchableOpacity>

          {/* Right Column */}
          <View style={styles.spiritualRightCol}>
            {/* Teachings */}
            <TouchableOpacity style={styles.teachingsCard} activeOpacity={0.85} onPress={() => onNavigate('Teachings')}>
              <Ionicons name="bulb-outline" size={20} color={COLORS.primary} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Shembe Teachings</Text>
            </TouchableOpacity>

            {/* Inspiration */}
            <TouchableOpacity style={[styles.teachingsCard, styles.inspirationCard]} activeOpacity={0.85} onPress={() => onNavigate('Inspiration')}>
              <Ionicons name="heart-outline" size={20} color="#745c00" style={styles.cardIcon} />
              <Text style={[styles.cardTitle, { color: '#745c00' }]}>Inspiration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 3. Community */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Community</Text>
        <View style={styles.worshipStack}>
          {/* Events */}
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.85} onPress={() => onNavigate('Events')}>
            <View style={[styles.actionIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Events</Text>
              <Text style={styles.actionSubtitle}>Gatherings, festivals, and key dates.</Text>
            </View>
          </TouchableOpacity>

          {/* Support */}
          <TouchableOpacity 
            style={styles.actionCard} 
            activeOpacity={0.85}
            onPress={() => setSubScreen('community')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="hand-left-outline" size={24} color="#745c00" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Support</Text>
              <Text style={styles.actionSubtitle}>Community outreach and fundraising.</Text>
            </View>
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
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  worshipImageContainer: {
    width: 120,
    height: '100%',
  },
  worshipImage: {
    width: '100%',
    height: '100%',
  },
  worshipContent: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'center',
  },
  cardIcon: {
    marginBottom: SPACING.xs,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
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
  spiritualGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  bibleCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bibleImage: {
    width: '100%',
    height: 120,
  },
  bibleContent: {
    padding: SPACING.md,
  },
  spiritualRightCol: {
    flex: 1,
    gap: SPACING.md,
  },
  teachingsCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inspirationCard: {
    backgroundColor: '#FDE68A',
    borderColor: '#FCD34D',
  },
  actionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionIconBox: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
});
