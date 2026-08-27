import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import Slider from '@react-native-community/slider';
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
  const {
    activeTrack,
    isPlaying,
    togglePlayPause,
    positionMillis,
    durationMillis,
    seekTo,
    playNextTrack,
    playPrevTrack,
  } = useAudio();
  const { isFavoriteHymn, toggleFavoriteHymn } = useBookmarks();

  const [isDownloaded, setIsDownloaded] = useState(false);
  const [barWidth, setBarWidth] = useState(300);

  const hymnTitle = activeTrack?.title || 'Nkosi Yami, Woza Kimina';
  const hymnNumber = activeTrack?.number || 1;
  const choirName = activeTrack?.subtitle || 'Ebuhleni Choir';
  const isFav = activeTrack ? isFavoriteHymn(activeTrack.id) : false;

  const formatTime = (ms: number) => {
    if (!ms || isNaN(ms)) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentDuration = durationMillis > 0 ? durationMillis : 255000;

  const handleRewind15 = () => {
    const newPos = Math.max(0, positionMillis - 15000);
    seekTo(newPos);
  };

  const handleFastForward15 = () => {
    const newPos = Math.min(currentDuration, positionMillis + 15000);
    seekTo(newPos);
  };

  const handleDownloadToggle = () => {
    setIsDownloaded(!isDownloaded);
    Alert.alert(
      !isDownloaded ? 'Downloaded Offline 📥' : 'Download Removed 🗑️',
      !isDownloaded
        ? `${hymnTitle} (Hymn ${hymnNumber}) saved for offline playback!`
        : `${hymnTitle} removed from offline storage.`
    );
  };

  const handleShare = () => {
    Alert.alert('Share Hymn', `Sharing link to Hymn ${hymnNumber} - ${hymnTitle}`);
  };

  return (
    <View style={styles.container}>

      {/* Top Header - Restored Clean Stitch Design */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="chevron-down" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerLabel}>NOW PLAYING</Text>
        </View>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => Alert.alert('Hymn Options', `${hymnTitle} - Hymn ${hymnNumber}`)}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Hero Artwork - Modern Shembe Sacred Music Cover Art */}
        <View style={styles.artworkWrapper}>
          <Image
            source={require('../../assets/shembe_cover.webp')}
            style={styles.artworkImage}
            resizeMode="cover"
          />
          {/* Playing indicator overlay */}
          {isPlaying && (
            <View style={styles.nowPlayingOverlay}>
              <View style={styles.nowPlayingDot} />
              <Text style={styles.nowPlayingText}>NOW PLAYING</Text>
            </View>
          )}
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
            activeOpacity={0.7}
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
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={currentDuration}
            value={positionMillis}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor={COLORS.surfaceContainerHigh}
            thumbTintColor={COLORS.primary}
            onSlidingComplete={(value) => seekTo(value)}
          />

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
            <Text style={styles.timeText}>{formatTime(currentDuration)}</Text>
          </View>
        </View>

        {/* Main Playback Controls */}
        <View style={styles.controlsRow}>
          {/* Rewind -15 Seconds */}
          <TouchableOpacity style={styles.subControlBtn} onPress={handleRewind15} activeOpacity={0.7}>
            <View style={styles.seekBtnContainer}>
              <Ionicons name="play-back" size={20} color={COLORS.primary} />
              <Text style={styles.seekBtnLabel}>15</Text>
            </View>
          </TouchableOpacity>

          {/* Previous Track */}
          <TouchableOpacity style={styles.skipBtn} onPress={playPrevTrack} activeOpacity={0.7}>
            <Ionicons name="play-skip-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Large Primary Play / Pause Button */}
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

          {/* Next Track */}
          <TouchableOpacity style={styles.skipBtn} onPress={playNextTrack} activeOpacity={0.7}>
            <Ionicons name="play-skip-forward" size={28} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Fast Forward +15 Seconds */}
          <TouchableOpacity style={styles.subControlBtn} onPress={handleFastForward15} activeOpacity={0.7}>
            <View style={styles.seekBtnContainer}>
              <Text style={styles.seekBtnLabel}>15</Text>
              <Ionicons name="play-forward" size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Secondary Actions Bar */}
        <View style={styles.actionsBar}>
          <TouchableOpacity style={styles.actionItem} onPress={handleDownloadToggle} activeOpacity={0.7}>
            <Ionicons
              name={isDownloaded ? 'checkmark-circle' : 'cloud-download-outline'}
              size={22}
              color={isDownloaded ? COLORS.primary : COLORS.onSurfaceVariant}
            />
            <Text style={styles.actionText}>{isDownloaded ? 'Saved' : 'Download'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShare} activeOpacity={0.7}>
            <Ionicons name="share-social-outline" size={22} color={COLORS.onSurfaceVariant} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={onOpenDownloaded || (() => Alert.alert('Playlist', 'Added to Sabbath Worship Playlist'))}
            activeOpacity={0.7}
          >
            <Ionicons name="list-outline" size={22} color={COLORS.onSurfaceVariant} />
            <Text style={styles.actionText}>Playlist</Text>
          </TouchableOpacity>
        </View>

        {/* Full isiZulu Hymn Verses */}
        {activeTrack?.verses && activeTrack.verses.length > 0 && (
          <View style={styles.versesCard}>
            <Text style={styles.versesHeader}>ISIZULU HYMN TEXT</Text>
            {activeTrack.verses.map((verse, index) => (
              <View key={index} style={styles.verseBlock}>
                <Text style={styles.verseText}>{verse}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  hiddenAudioStreamContainer: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    width: 1,
    height: 1,
    opacity: 0,
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
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: 40,
  },
  artworkWrapper: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 300,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryContainer,
    position: 'relative',
    ...SHADOWS.goldGlow,
    borderWidth: 2,
    borderColor: 'rgba(115,92,0,0.2)',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  nowPlayingOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(1,45,29,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  nowPlayingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ade80',
  },
  nowPlayingText: {
    color: '#4ade80',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  trackInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xs,
  },
  trackInfoText: {
    flex: 1,
    gap: 4,
  },
  hymnBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  hymnBadgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.onSurface,
  },
  trackSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
  },
  favBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
  },
  progressSection: {
    gap: 8,
    paddingHorizontal: SPACING.xs,
  },
  seekBarBg: {
    height: 8,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.full,
    position: 'relative',
    justifyContent: 'center',
  },
  seekBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  seekBarThumb: {
    width: 14,
    height: 14,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    marginLeft: -7,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: SPACING.xs,
  },
  subControlBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seekBtnLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  skipBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPlayBtn: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.goldGlow,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  actionItem: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  versesCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  versesHeader: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  verseBlock: {
    paddingBottom: SPACING.xs,
  },
  verseText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.onSurface,
    fontWeight: '500',
  },
});
