import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HymnCard } from '../components/HymnCard';
import { MOCK_HYMNS } from '../data/mockData';
import { useAudio } from '../context/AudioContext';
import { useBookmarks } from '../context/BookmarkContext';
import { Hymn } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { HymnSearchScreen } from './HymnSearchScreen';
import { HymnPlayerScreen } from './HymnPlayerScreen';
import { DownloadedHymnsScreen } from './DownloadedHymnsScreen';

interface HymnsScreenProps {
  onBack?: () => void;
}

export const HymnsScreen: React.FC<HymnsScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSubScreen, setActiveSubScreen] = useState<'main' | 'search' | 'player' | 'downloaded'>('main');

  const { playHymn, activeTrack, isPlaying, setModalVisible } = useAudio();
  const { isFavoriteHymn, toggleFavoriteHymn } = useBookmarks();

  const categories = ['All', 'Recent', 'Favourites', 'Offline'];

  const filteredHymns = useMemo(() => {
    return MOCK_HYMNS.filter((hymn) => {
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Favourites'
          ? isFavoriteHymn(hymn.id)
          : selectedCategory === 'Recent'
          ? activeTrack?.id === hymn.id
          : selectedCategory === 'Offline'
          ? false
          : hymn.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesNumber = hymn.number.toString().includes(query);
      const matchesTitle = hymn.title.toLowerCase().includes(query);
      const matchesVerses = hymn.verses.some((v) => v.toLowerCase().includes(query));

      return matchesCategory && (matchesNumber || matchesTitle || matchesVerses);
    });
  }, [searchQuery, selectedCategory, isFavoriteHymn]);

  const handleSelectHymn = async (hymn: Hymn) => {
    await playHymn(hymn);
    // This screen is the initial full player. Closing it reveals the persistent
    // mini-player instead of presenting a second full-screen player on top.
    setModalVisible(false);
    setActiveSubScreen('player');
  };

  if (activeSubScreen === 'search') {
    return (
      <HymnSearchScreen
        onBack={() => setActiveSubScreen('main')}
        onSelectHymn={handleSelectHymn}
        onOpenDownloaded={() => setActiveSubScreen('downloaded')}
      />
    );
  }

  if (activeSubScreen === 'player') {
    return (
      <HymnPlayerScreen
        onClose={() => {
          setModalVisible(false);
          setActiveSubScreen('main');
        }}
        onOpenDownloaded={() => setActiveSubScreen('downloaded')}
      />
    );
  }

  if (activeSubScreen === 'downloaded') {
    return (
      <DownloadedHymnsScreen
        onBack={() => setActiveSubScreen('main')}
        onPlayHymn={handleSelectHymn}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.headerSection}>
        <View style={styles.titleRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.screenTitle}>Hymn Library</Text>
            <Text style={styles.screenSubtitle}>Search by number, title, or lyrics to find your hymn.</Text>
          </View>
        </View>

        {/* Search Input Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setActiveSubScreen('search')}
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={20} color={COLORS.onSurfaceVariant} />
          <Text style={styles.searchPlaceholder}>e.g., 142 or 'Amazing Grace'</Text>
        </TouchableOpacity>

        {/* Category Pills */}
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

      {/* Hymn List */}
      <FlatList
        data={filteredHymns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isCurrentActive = activeTrack?.id === item.id;
          const isFav = isFavoriteHymn(item.id);

          return (
            <HymnCard
              hymn={item}
              isPlaying={isCurrentActive && isPlaying}
              isFavorite={isFav}
              onPress={() => handleSelectHymn(item)}
              onPlayPress={() => handleSelectHymn(item)}
              onFavoritePress={() => toggleFavoriteHymn(item.id)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  headerSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === 'ios' ? 60 : SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  backBtn: {
    marginRight: SPACING.sm,
    padding: SPACING.xs,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E293B',
  },
  screenSubtitle: {
    fontSize: 15,
    color: '#475569',
    marginTop: 6,
    lineHeight: 22,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchPlaceholder: {
    flex: 1,
    color: '#64748B',
    fontSize: 14,
    marginLeft: 8,
  },
  filterChip: {
    padding: 4,
  },
  pillsScroll: {
    marginVertical: SPACING.xs,
  },
  pillsContent: {
    gap: 10,
    paddingBottom: 4,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: '#EAE8E4',
  },
  activePill: {
    backgroundColor: '#06402B',
  },
  pillText: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '700',
  },
  activePillText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  listContent: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
});
