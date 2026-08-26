import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Hymn } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface HymnCardProps {
  hymn: Hymn;
  isFavorite: boolean;
  isPlaying: boolean;
  onPress: () => void;
  onPlayPress: () => void;
  onFavoritePress: () => void;
}

export const HymnCard: React.FC<HymnCardProps> = ({
  hymn,
  isFavorite,
  isPlaying,
  onPress,
  onPlayPress,
  onFavoritePress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isPlaying && styles.playingCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.leftRow}>
        <View style={[styles.numberBadge, isPlaying && styles.playingBadge]}>
          <Text style={[styles.numberText, isPlaying && styles.playingNumberText]}>
            #{hymn.number}
          </Text>
        </View>

        <View style={styles.infoWrapper}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {hymn.title}
            </Text>
          </View>
          {hymn.composer ? (
            <Text style={styles.composer} numberOfLines={1}>
              {hymn.composer}
            </Text>
          ) : null}
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{hymn.category}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? COLORS.error : COLORS.outline}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playBtn, isPlaying && styles.activePlayBtn]}
          onPress={onPlayPress}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={isPlaying ? COLORS.white : COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  playingCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  numberBadge: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  playingBadge: {
    backgroundColor: COLORS.primary,
  },
  numberText: {
    color: COLORS.onSecondaryContainer,
    fontSize: 14,
    fontWeight: '800',
  },
  playingNumberText: {
    color: COLORS.white,
  },
  infoWrapper: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  composer: {
    color: COLORS.secondary,
    fontSize: 12,
    marginBottom: 4,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  categoryText: {
    color: COLORS.onPrimaryFixedVariant,
    fontSize: 10,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    padding: 6,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePlayBtn: {
    backgroundColor: COLORS.primary,
  },
});
