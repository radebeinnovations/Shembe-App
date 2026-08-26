import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_SERMONS } from '../data/mockData';
import { Sermon } from '../types';
import { useAudio } from '../context/AudioContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface SermonsScreenProps {
  onBack?: () => void;
}

export const SermonsScreen: React.FC<SermonsScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { playSermon, activeTrack, isPlaying } = useAudio();

  const categories = ['All', 'Sabbath Service', 'Holy Gathering', 'Youth Address'];

  const filteredSermons = MOCK_SERMONS.filter((s) =>
    selectedCategory === 'All' ? true : s.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.headerTitleRow}>
          {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.screenTitle}>Sermons & Broadcasts</Text>
            <Text style={styles.screenSubtitle}>Imiyalezo, Imiphasho & Inkulumo zaBaphathi</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillsScroll}
          contentContainerStyle={styles.pillsContent}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, isSelected && styles.activePill]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.pillText, isSelected && styles.activePillText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredSermons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isCurrentActive = activeTrack?.id === item.id;
          return (
            <TouchableOpacity
              style={[styles.sermonCard, isCurrentActive && styles.activeCard]}
              onPress={() => playSermon(item)}
              activeOpacity={0.8}
            >
              <View style={styles.thumbnailWrapper}>
                <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.playOverlay}>
                  <Ionicons
                    name={isCurrentActive && isPlaying ? 'pause-circle' : 'play-circle'}
                    size={44}
                    color={COLORS.gold}
                  />
                </View>
                {item.isLive && (
                  <View style={styles.liveTag}>
                    <Text style={styles.liveTagText}>LIVE</Text>
                  </View>
                )}
                <View style={styles.durationTag}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </View>

              <View style={styles.infoBox}>
                <View style={styles.topRow}>
                  <View style={styles.catBadge}>
                    <Text style={styles.catBadgeText}>{item.category}</Text>
                  </View>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.speaker}>{item.speaker}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  headerSection: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: SPACING.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: '800',
  },
  screenSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: SPACING.sm,
  },
  pillsScroll: {
    marginTop: 4,
  },
  pillsContent: {
    gap: 8,
  },
  pill: {
    backgroundColor: COLORS.bgElevated,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  activePill: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  pillText: {
    color: COLORS.whiteSubtle,
    fontSize: 12,
    fontWeight: '600',
  },
  activePillText: {
    color: COLORS.bgDark,
    fontWeight: '800',
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: 120,
  },
  sermonCard: {
    backgroundColor: COLORS.bgCardDark,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    ...SHADOWS.card,
  },
  activeCard: {
    borderColor: COLORS.gold,
  },
  thumbnailWrapper: {
    height: 160,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.liveRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  liveTagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  durationTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  durationText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
  },
  infoBox: {
    padding: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  catBadge: {
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  catBadgeText: {
    color: COLORS.goldLight,
    fontSize: 10,
    fontWeight: '700',
  },
  dateText: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  speaker: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '600',
  },
});
