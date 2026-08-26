import React, { useState } from 'react';
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
import { useAudio } from '../context/AudioContext';
import { useBookmarks } from '../context/BookmarkContext';

interface HymnPlayerScreenProps {
  onClose: () => void;
  onOpenDownloaded?: () => void;
}

export const HymnPlayerScreen: React.FC<HymnPlayerScreenProps> = ({
  onClose,
  onOpenDownloaded,
}) => {
  const { activeTrack, isPlaying, togglePlayPause, positionMillis, durationMillis } = useAudio();
  const { isFavoriteHymn, toggleFavoriteHymn } = useBookmarks();
  const [isDownloaded, setIsDownloaded] = useState(false);

  const hymnTitle = activeTrack?.title || 'Hamba Nathi';
  const hymnNumber = activeTrack?.number || 250;
  const choirName = activeTrack?.subtitle || 'Ebuhleni Choir';
  const isFav = activeTrack ? isFavoriteHymn(activeTrack.id) : false;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 35;

  const handleDownloadToggle = () => {
    setIsDownloaded(!isDownloaded);
    Alert.alert(
      !isDownloaded ? 'Downloaded Offline 📥' : 'Download Removed 🗑️',
      !isDownloaded
        ? `${hymnTitle} (Hymn ${hymnNumber}) has been saved for offline audio playback!`
        : `${hymnTitle} removed from offline storage.`
    );
  };

  const handleShare = () => {
    Alert.alert('Share Hymn', `Sharing link to Hymn ${hymnNumber} - ${hymnTitle}`);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onClose}>
          <Ionicons name="chevron-down" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerLabel}>NOW PLAYING</Text>
        </View>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => Alert.alert('Hymn Options', `${hymnTitle} - Hymn ${hymnNumber}`)}
        >
          <Ionicons name="ellipsis-vertical" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Landscape Hero Artwork Image */}
        <View style={styles.artworkWrapper}>
          <Image
            source={require('../../assets/hymn_player_artwork.png')}
            style={styles.artworkImage}
            resizeMode="cover"
          />
        </View>

        {/* Track Info & Favourite Button */}
        <View style={styles.trackInfoRow}>
          <View style={styles.trackInfoText}>
            <View style={styles.hymnBadge}>
              <Text style={styles.hymnBadgeText}>HYMN {hymnNumber}</Text>
            </View>
            <Text style={styles.trackTitle}>{hymnTitle}</Text>
            <Text style={styles.trackSubtitle}>{choirName}</Text>
          </View>

          <TouchableOpacity
            style={styles.favBtn}
            onPress={() => activeTrack && toggleFavoriteHymn(activeTrack.id)}
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={26}
              color={isFav ? COLORS.error : COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Seek Bar & Timestamps */}
        <View style={styles.progressSection}>
          <View style={styles.seekBarBg}>
            <View style={[styles.seekBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(positionMillis || 102000)}</Text>
            <Text style={styles.timeText}>{formatTime(durationMillis || 270000)}</Text>
          </View>
        </View>

        {/* Main Playback Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.subControlBtn}>
            <Ionicons name="shuffle" size={22} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn}>
            <Ionicons name="play-skip-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Large Primary Play Button */}
          <TouchableOpacity
            style={styles.mainPlayBtn}
            onPress={togglePlayPause}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={36}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn}>
            <Ionicons name="play-skip-forward" size={28} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.subControlBtn}>
            <Ionicons name="repeat" size={22} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Secondary Actions Bar */}
        <View style={styles.actionsBar}>
          <TouchableOpacity style={styles.actionItem} onPress={handleDownloadToggle}>
            <Ionicons
              name={isDownloaded ? 'checkmark-circle' : 'cloud-download-outline'}
              size={22}
              color={isDownloaded ? COLORS.primary : COLORS.onSurfaceVariant}
            />
            <Text style={styles.actionText}>{isDownloaded ? 'Saved' : 'Download'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={22} color={COLORS.onSurfaceVariant} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={onOpenDownloaded || (() => Alert.alert('Playlist', 'Added to Sabbath Worship Playlist'))}
          >
            <Ionicons name="list-outline" size={22} color={COLORS.onSurfaceVariant} />
            <Text style={styles.actionText}>Playlist</Text>
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
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  artworkWrapper: {
    width: '100%',
    height: 200,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  trackInfoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  trackInfoText: {
    flex: 1,
  },
  hymnBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginBottom: 6,
  },
  hymnBadgeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  trackTitle: {
    color: COLORS.onSurface,
    fontSize: 22,
    fontWeight: '800',
  },
  trackSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    marginTop: 2,
  },
  favBtn: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  seekBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  seekBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  controlsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
  },
  subControlBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPlayBtn: {
    width: 76,
    height: 76,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  actionsBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
  },
  actionItem: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '700',
  },
});
