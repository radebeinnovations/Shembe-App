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
            {hymn.number}
          </Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {hymn.title}
          </Text>
          {hymn.composer ? (
            <Text style={styles.composer} numberOfLines={1}>
              {hymn.composer}
            </Text>
          ) : null}
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
            color={isFavorite ? COLORS.primary : COLORS.onSurfaceVariant}
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
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  playingCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#F8FAFC',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  numberBadge: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.sm,
    backgroundColor: '#EAE8E4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  playingBadge: {
    backgroundColor: COLORS.primary,
  },
  numberText: {
    color: COLORS.onSurface,
    fontSize: 20,
    fontWeight: '800',
  },
  playingNumberText: {
    color: COLORS.white,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  composer: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    padding: 8,
  },
});
