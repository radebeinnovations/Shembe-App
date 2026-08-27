import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Image,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export const AudioPlayerModal: React.FC = () => {
  const {
    activeTrack,
    isPlaying,
    positionMillis,
    durationMillis,
    isModalVisible,
    togglePlayPause,
    stopAudio,
    setModalVisible,
  } = useAudio();

  // Animated pulse for the pill glow when playing
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pillScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeTrack && !isModalVisible) {
      // Animate pill in
      Animated.spring(pillScaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 9,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTrack, isModalVisible]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.03, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [isPlaying]);

  if (!activeTrack) return null;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent =
    durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;

  return (
    <>
      {/* Floating Mini Player Pill - sits above the tab bar */}
      {!isModalVisible && (
        <Animated.View
          style={[
            styles.miniPillWrapper,
            { transform: [{ scale: pulseAnim }, { scaleX: pillScaleAnim }] },
          ]}
        >
          <TouchableOpacity
            style={styles.miniPill}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.92}
          >
            {/* Animated progress bar at the top of pill */}
            <View style={styles.pillProgressBg}>
              <Animated.View
                style={[styles.pillProgressFill, { width: `${progressPercent}%` as any }]}
              />
            </View>

            {/* Album Art Thumbnail */}
            <Image
              source={require('../../assets/shembe_cover.webp')}
              style={styles.pillThumb}
              resizeMode="cover"
            />

            {/* Track Info */}
            <View style={styles.pillInfo}>
              <View style={styles.pillTrackType}>
                <View style={[styles.pillTypeDot, { backgroundColor: isPlaying ? '#4ade80' : COLORS.onPrimaryContainer }]} />
                <Text style={styles.pillTypeText}>
                  {activeTrack.type === 'hymn' ? 'Isihlabelelo' : 'Inkonzo'}
                </Text>
              </View>
              <Text style={styles.pillTitle} numberOfLines={1}>
                {activeTrack.title}
              </Text>
            </View>

            {/* Controls */}
            <View style={styles.pillControls}>
              <TouchableOpacity
                style={styles.pillPlayBtn}
                onPress={(e) => {
                  e.stopPropagation?.();
                  togglePlayPause();
                }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={18}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pillCloseBtn}
                onPress={(e) => {
                  e.stopPropagation?.();
                  stopAudio();
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={16} color={COLORS.onPrimaryContainer} />
              </TouchableOpacity>
            </View>

            {/* Expand chevron hint */}
            <View style={styles.expandHint}>
              <Ionicons name="chevron-up" size={10} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Full-Screen Player Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="chevron-down" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>
              {activeTrack.type === 'hymn' ? 'Izihlabelelo Reader' : 'Sermon Audio'}
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={stopAudio}>
              <Ionicons name="close" size={24} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.versesScroll} contentContainerStyle={styles.scrollContent}>
            {/* Modern Shembe Album Cover - Hero Section */}
            <View style={styles.coverHeroSection}>
              <View style={styles.coverArtWrapper}>
                <Image
                  source={require('../../assets/shembe_cover.webp')}
                  style={styles.coverArtImage}
                  resizeMode="cover"
                />
                {/* Floating play state badge on cover */}
                {isPlaying && (
                  <View style={styles.coverPlayingBadge}>
                    <View style={styles.coverPlayingDot} />
                    <Text style={styles.coverPlayingText}>NOW PLAYING</Text>
                  </View>
                )}
              </View>




              <Text style={styles.fullTitle}>{activeTrack.title}</Text>
              <Text style={styles.fullSubtitle}>{activeTrack.subtitle}</Text>
            </View>

            {/* Hymn IsiZulu Verses */}
            {activeTrack.verses && activeTrack.verses.length > 0 ? (
              <View style={styles.versesCard}>
                <Text style={styles.versesHeader}>ISIZULU HYMN TEXT</Text>
                {activeTrack.verses.map((verse, index) => (
                  <View key={index} style={styles.verseBlock}>
                    <Text style={styles.verseText}>{verse}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.sermonNotesCard}>
                <Text style={styles.versesHeader}>SERMON AUDIO PLAYBACK</Text>
                <Text style={styles.sermonDesc}>
                  Listening to official sermon recording from Nazareth Baptist Church broadcasts.
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Player Controls Dock */}
          <View style={styles.playerDock}>
            <View style={styles.timelineRow}>
              <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
              <View style={styles.fullProgressBg}>
                <View style={[styles.fullProgressFill, { width: `${progressPercent}%` as any }]} />
              </View>
              <Text style={styles.timeText}>{formatTime(durationMillis || 240000)}</Text>
            </View>

            <View style={styles.mainControlsRow}>
              <TouchableOpacity style={styles.secondaryControl}>
                <Ionicons name="shuffle" size={22} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryControl}>
                <Ionicons name="play-back" size={28} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.largePlayBtn} onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryControl}>
                <Ionicons name="play-forward" size={28} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryControl}>
                <Ionicons name="repeat" size={22} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // ── Mini Pill ────────────────────────────────────────────────────────────────
  miniPillWrapper: {
    position: 'absolute',
    bottom: 72, // sits right above the 64px tab bar with a tiny gap
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  miniPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    overflow: 'hidden',
    ...SHADOWS.goldGlow,
    borderWidth: 1,
    borderColor: 'rgba(134,175,153,0.3)',
  },
  pillProgressBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  pillProgressFill: {
    height: '100%',
    backgroundColor: COLORS.secondaryContainer,
    borderRadius: 2,
  },
  pillThumb: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pillInfo: {
    flex: 1,
    gap: 2,
  },
  pillTrackType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pillTypeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pillTypeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.onPrimaryContainer,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  pillTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  pillControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillPlayBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandHint: {
    position: 'absolute',
    top: 4,
    alignSelf: 'center',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  // ── Full Modal ────────────────────────────────────────────────────────────────
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  closeBtn: {
    padding: 6,
  },
  modalHeaderTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  versesScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 140,
  },

  // Cover Hero
  coverHeroSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  coverArtWrapper: {
    width: 200,
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    position: 'relative',
    ...SHADOWS.goldGlow,
    borderWidth: 2,
    borderColor: 'rgba(115,92,0,0.25)',
  },
  coverArtImage: {
    width: '100%',
    height: '100%',
  },
  coverPlayingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(1,45,29,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  coverPlayingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ade80',
  },
  coverPlayingText: {
    color: '#4ade80',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  youtubeStreamWrapper: {
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  fullTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  fullSubtitle: {
    color: COLORS.secondary,
    fontSize: 14,
    textAlign: 'center',
  },

  // Verses card
  versesCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginTop: SPACING.md,
    ...SHADOWS.card,
  },
  versesHeader: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  verseBlock: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  verseText: {
    color: COLORS.onSurface,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '500',
  },
  sermonNotesCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  sermonDesc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
  },

  // Dock
  playerDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: SPACING.md,
  },
  timeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    width: 36,
  },
  fullProgressBg: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  fullProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  mainControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  secondaryControl: {
    padding: 8,
  },
  largePlayBtn: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
