import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Platform,
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
  const [activeVideoModal, setActiveVideoModal] = useState<Sermon | null>(null);

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
              onPress={() => setActiveVideoModal(item)}
              activeOpacity={0.85}
            >
              <View style={styles.thumbnailWrapper}>
                <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.playOverlay}>
                  <Ionicons
                    name="play-circle"
                    size={48}
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

      {/* Video Stream Modal */}
      {activeVideoModal && (
        <Modal
          visible={!!activeVideoModal}
          animationType="slide"
          transparent
          onRequestClose={() => setActiveVideoModal(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle} numberOfLines={1}>
                  {activeVideoModal.title}
                </Text>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setActiveVideoModal(null)}
                >
                  <Ionicons name="close" size={22} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              <View style={styles.videoPlayerContainer}>
                {Platform.OS === 'web' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId || '5qap5aO4i9A'}?autoplay=1`}
                    style={{ width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image source={{ uri: activeVideoModal.thumbnailUrl }} style={styles.thumbnail} />
                )}
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.modalSpeaker}>{activeVideoModal.speaker}</Text>
                <Text style={styles.modalDate}>{activeVideoModal.date} • {activeVideoModal.duration}</Text>

                <TouchableOpacity
                  style={styles.audioFallbackBtn}
                  onPress={() => {
                    playSermon(activeVideoModal);
                    setActiveVideoModal(null);
                  }}
                >
                  <Ionicons name="headset-outline" size={18} color={COLORS.white} />
                  <Text style={styles.audioFallbackText}>Switch to Audio Background Playback</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  headerSection: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
    gap: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
  },
  screenTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  screenSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  pillsScroll: {
    flexDirection: 'row',
  },
  pillsContent: {
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  activePill: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  pillText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  activePillText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  listContent: {
    padding: SPACING.md,
    gap: 16,
    paddingBottom: 40,
  },
  sermonCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  activeCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  thumbnailWrapper: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: '#1b1c1a',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  liveTagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  durationTag: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  durationText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  infoBox: {
    padding: SPACING.md,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catBadge: {
    backgroundColor: COLORS.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  catBadgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  dateText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  speaker: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalContentCard: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#1b4332',
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: '#012d1d',
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    marginRight: 10,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayerContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#000',
  },
  modalBody: {
    padding: SPACING.md,
    gap: 8,
  },
  modalSpeaker: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  modalDate: {
    color: COLORS.onPrimaryContainer,
    fontSize: 12,
  },
  audioFallbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    marginTop: 8,
  },
  audioFallbackText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
