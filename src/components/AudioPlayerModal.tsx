import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
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
      {/* Floating Mini Player Bar */}
      {!isModalVisible && (
        <TouchableOpacity
          style={styles.miniPlayer}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.9}
        >
          <View style={styles.miniLeft}>
            <View style={styles.miniDisc}>
              <Ionicons
                name={activeTrack.type === 'hymn' ? 'musical-notes' : 'headset'}
                size={18}
                color={COLORS.white}
              />
            </View>
            <View style={styles.miniInfo}>
              <Text style={styles.miniTitle} numberOfLines={1}>
                {activeTrack.title}
              </Text>
              <Text style={styles.miniSubtitle} numberOfLines={1}>
                {activeTrack.subtitle}
              </Text>
            </View>
          </View>

          <View style={styles.miniControls}>
            <TouchableOpacity onPress={togglePlayPause} style={styles.miniControlBtn}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={22}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={stopAudio} style={styles.miniControlBtn}>
              <Ionicons name="close" size={22} color={COLORS.onPrimaryContainer} />
            </TouchableOpacity>
          </View>

          {/* Mini progress line */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </TouchableOpacity>
      )}

      {/* Full-Screen Hymn & Audio Modal */}
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
            <View style={styles.coverDiscContainer}>
              <View style={styles.largeDisc}>
                <Ionicons
                  name={activeTrack.type === 'hymn' ? 'book' : 'radio'}
                  size={52}
                  color={COLORS.white}
                />
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
                <View style={[styles.fullProgressFill, { width: `${progressPercent}%` }]} />
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
  miniPlayer: {
    position: 'absolute',
    bottom: 64,
    left: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...SHADOWS.card,
    zIndex: 1000,
  },
  miniLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  miniDisc: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  miniInfo: {
    flex: 1,
  },
  miniTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  miniSubtitle: {
    color: COLORS.onPrimaryContainer,
    fontSize: 11,
  },
  miniControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniControlBtn: {
    padding: 6,
  },
  progressBarBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.secondaryContainer,
  },

  // Modal styles
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
  coverDiscContainer: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  largeDisc: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.card,
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
