import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { MOCK_HYMNS } from '../data/mockData';
import { useAudio } from '../context/AudioContext';
import { Hymn } from '../types';

interface DownloadedHymnsScreenProps {
  onBack: () => void;
  onPlayHymn: (hymn: Hymn) => void;
}

export const DownloadedHymnsScreen: React.FC<DownloadedHymnsScreenProps> = ({
  onBack,
  onPlayHymn,
}) => {
  const offlineHymns = MOCK_HYMNS.slice(0, 4).map((hymn, idx) => ({
    ...hymn,
    fileSize: `${(12.4 + idx * 1.8).toFixed(1)} MB`,
  }));

  const handlePlayAll = () => {
    if (offlineHymns.length > 0) {
      onPlayHymn(offlineHymns[0]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Downloaded Hymns</Text>
        <TouchableOpacity style={styles.backBtn} onPress={handlePlayAll}>
          <Ionicons name="play-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Offline Storage Card */}
        <View style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <Ionicons name="cloud-done-outline" size={24} color={COLORS.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.storageTitle}>Offline Audio Storage</Text>
              <Text style={styles.storageSubtitle}>4 Hymns Saved • 52.8 MB Total</Text>
            </View>
          </View>
          <View style={styles.storageBarBg}>
            <View style={[styles.storageBarFill, { width: '38%' }]} />
          </View>
        </View>

        {/* Hymn List */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>SAVED HYMNS (READY FOR OFFLINE WORSHIP)</Text>

          <View style={styles.hymnsList}>
            {offlineHymns.map((item) => (
              <View key={item.id} style={styles.hymnCard}>
                <TouchableOpacity
                  style={styles.playIconBox}
                  onPress={() => onPlayHymn(item)}
                >
                  <Ionicons name="play" size={20} color={COLORS.white} />
                </TouchableOpacity>

                <View style={styles.cardInfo}>
                  <Text style={styles.hymnTitle}>
                    Hymn {item.number}: {item.title}
                  </Text>
                  <Text style={styles.hymnMeta}>
                    {item.category} • {item.fileSize} • Offline Ready
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => Alert.alert('Remove Download', `Remove Hymn ${item.number} from offline storage?`)}
                >
                  <Ionicons name="trash-outline" size={18} color={COLORS.onSurfaceVariant} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  storageCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storageTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  storageSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
  storageBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  storageBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  listSection: {
    gap: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hymnsList: {
    gap: 10,
  },
  hymnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  playIconBox: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  hymnTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '800',
  },
  hymnMeta: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
});
