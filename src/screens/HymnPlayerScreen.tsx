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
  const [startSecs, setStartSecs] = useState<number>(0);
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
  const progressPercent = Math.min(100, Math.max(0, (positionMillis / currentDuration) * 100));

  const handleSeekTouch = (evt: any) => {
    if (!currentDuration) return;
    const touchX = evt.nativeEvent.locationX;
    const newPercent = touchX / barWidth;
    const targetMs = Math.floor(newPercent * currentDuration);
    const targetSecs = Math.floor(targetMs / 1000);
    setStartSecs(targetSecs);
    seekTo(targetMs);
  };

  const handleRewind15 = () => {
    const newPos = Math.max(0, positionMillis - 15000);
    setStartSecs(Math.floor(newPos / 1000));
    seekTo(newPos);
  };

  const handleFastForward15 = () => {
    const newPos = Math.min(currentDuration, positionMillis + 15000);
    setStartSecs(Math.floor(newPos / 1000));
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
      {/* Hidden YouTube Audio Stream Player (Invisible, plays real YouTube audio in background) */}
      {activeTrack?.youtubeId && isPlaying && Platform.OS === 'web' && (
        <View style={styles.hiddenAudioStreamContainer}>
          <iframe
            key={`${activeTrack.youtubeId}-${startSecs}`}
            src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1${startSecs > 0 ? `&start=${startSecs}` : ''}`}
            style={{ width: '100%', height: '100%', border: 0 }}
            allow="autoplay; encrypted-media"
          />
        </View>
      )}

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
        {/* Landscape Hero Artwork Image - Restored Original Prototype Format */}
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
          <TouchableOpacity
            style={styles.seekBarBg}
            onPress={handleSeekTouch}
            onLayout={(e: LayoutChangeEvent) => setBarWidth(e.nativeEvent.layout.width)}
            activeOpacity={0.9}
          >
            <View style={[styles.seekBarFill, { width: `${progressPercent}%` }]} />
            <View style={[styles.seekBarThumb, { left: `${progressPercent}%` }]} />
          </TouchableOpacity>

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
            <Text style={styles.timeText}>{formatTime(currentDuration)}</Text>
          </View>
        </View>

        {/* Main Playback Controls */}
        <View style={styles.controlsRow}>
          {/* Rewind -15 Seconds */}
          <TouchableOpacity style={styles.subControlBtn} onPress={handleRewind15} activeOpacity={0.7}>
            <Ionicons name="refresh-circle-outline" size={26} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Previous Track (Hymn 140 -> Hymn 112 -> Hymn 89 -> etc) */}
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

          {/* Next Track (Hymn 1 -> Hymn 24 -> Hymn 55 -> Hymn 89 -> etc) */}
          <TouchableOpacity style={styles.skipBtn} onPress={playNextTrack} activeOpacity={0.7}>
            <Ionicons name="play-skip-forward" size={28} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Fast Forward +15 Seconds */}
          <TouchableOpacity style={styles.subControlBtn} onPress={handleFastForward15} activeOpacity={0.7}>
            <Ionicons name="repeat" size={22} color={COLORS.onSurfaceVariant} />
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
    height: 200,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    backgroundColor: '#000',
    ...SHADOWS.card,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
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
