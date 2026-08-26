import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
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

export const HymnsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSubScreen, setActiveSubScreen] = useState<'main' | 'search' | 'player' | 'downloaded'>('main');

  const { playHymn, activeTrack, isPlaying } = useAudio();
  const { isFavoriteHymn, toggleFavoriteHymn } = useBookmarks();

  const categories = ['All', 'Isihlabelelo', 'Imthandazo', 'Isiphetho', 'Inhlokomo', 'Favorites'];

  const filteredHymns = useMemo(() => {
    return MOCK_HYMNS.filter((hymn) => {
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Favorites'
          ? isFavoriteHymn(hymn.id)
          : hymn.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesNumber = hymn.number.toString().includes(query);
      const matchesTitle = hymn.title.toLowerCase().includes(query);
      const matchesVerses = hymn.verses.some((v) => v.toLowerCase().includes(query));

      return matchesCategory && (matchesNumber || matchesTitle || matchesVerses);
    });
  }, [searchQuery, selectedCategory, isFavoriteHymn]);

  const handleSelectHymn = (hymn: Hymn) => {
    playHymn(hymn);
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
        onClose={() => setActiveSubScreen('main')}
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
          <View style={{ flex: 1 }}>
            <Text style={styles.screenTitle}>Izihlabelelo zamaNazaretha</Text>
            <Text style={styles.screenSubtitle}>Digital Hymnbook & Audio Playback</Text>
          </View>

          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => setActiveSubScreen('downloaded')}
            activeOpacity={0.7}
          >
            <Ionicons name="cloud-download-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Input Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setActiveSubScreen('search')}
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={20} color={COLORS.primary} />
          <Text style={styles.searchPlaceholder}>Search by hymn #, title, or isiZulu words...</Text>
          <View style={styles.filterChip}>
            <Ionicons name="options-outline" size={16} color={COLORS.onSurfaceVariant} />
          </View>
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
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  screenSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
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
    height: 48,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchPlaceholder: {
    flex: 1,
    color: COLORS.outline,
    fontSize: 13,
    marginLeft: 8,
  },
  filterChip: {
    padding: 4,
  },
  pillsScroll: {
    marginVertical: SPACING.xs,
  },
  pillsContent: {
    gap: 8,
    paddingBottom: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  activePill: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  pillText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
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
