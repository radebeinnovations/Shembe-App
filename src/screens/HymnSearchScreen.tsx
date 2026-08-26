import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { MOCK_HYMNS } from '../data/mockData';
import { Hymn } from '../types';

interface HymnSearchScreenProps {
  onBack: () => void;
  onSelectHymn: (hymn: Hymn) => void;
  onOpenDownloaded?: () => void;
}

export const HymnSearchScreen: React.FC<HymnSearchScreenProps> = ({
  onBack,
  onSelectHymn,
  onOpenDownloaded,
}) => {
  const [query, setQuery] = useState('Nkulunkulu');
  const [activeScope, setActiveScope] = useState<'Number' | 'Title' | 'Lyrics' | 'Keywords'>('Title');
  const [recentSearches, setRecentSearches] = useState(['Sabbath', '144', 'Uthando']);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return MOCK_HYMNS.filter((hymn) => {
      if (activeScope === 'Number') {
        return hymn.number.toString().includes(q);
      }
      if (activeScope === 'Title') {
        return hymn.title.toLowerCase().includes(q);
      }
      if (activeScope === 'Lyrics') {
        return hymn.verses.some((v) => v.toLowerCase().includes(q));
      }
      // Keywords search across title, number, and verses
      return (
        hymn.number.toString().includes(q) ||
        hymn.title.toLowerCase().includes(q) ||
        hymn.verses.some((v) => v.toLowerCase().includes(q))
      );
    });
  }, [query, activeScope]);

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  return (
    <View style={styles.container}>
      {/* Top Header & Search Bar */}
      <View style={styles.header}>
        {/* Top Search Input Row */}
        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={18} color={COLORS.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search hymns..."
              placeholderTextColor={COLORS.outline}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClearQuery}>
                <Ionicons name="close-circle" size={18} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.filterBtn} onPress={onOpenDownloaded}>
            <Ionicons name="cloud-download-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Scopes / Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scopeScroll}
          contentContainerStyle={styles.scopeContent}
        >
          {(['Number', 'Title', 'Lyrics', 'Keywords'] as const).map((scope) => {
            const isSelected = activeScope === scope;
            return (
              <TouchableOpacity
                key={scope}
                style={[styles.scopeChip, isSelected && styles.activeScopeChip]}
                onPress={() => setActiveScope(scope)}
              >
                {isSelected && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                <Text style={[styles.scopeChipText, isSelected && styles.activeScopeChipText]}>
                  {scope}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>RECENT SEARCHES</Text>
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.historyChipsRow}>
              {recentSearches.map((term, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.historyChip}
                  onPress={() => handleRecentClick(term)}
                >
                  <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
                  <Text style={styles.historyChipText}>{term}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Search Results Section */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>
            {query.length > 0 ? `Results for "${query}"` : 'All Hymns'}
          </Text>

          <View style={styles.resultsList}>
            {searchResults.length > 0 ? (
              searchResults.map((hymn) => (
                <TouchableOpacity
                  key={hymn.id}
                  style={styles.resultCard}
                  onPress={() => onSelectHymn(hymn)}
                  activeOpacity={0.8}
                >
                  {/* Hymn Number Badge */}
                  <View style={styles.badgeBox}>
                    <Text style={styles.badgeLabel}>HYMN</Text>
                    <Text style={styles.badgeNumber}>{hymn.number}</Text>
                  </View>

                  {/* Hymn Title & Verse Preview */}
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{hymn.title}</Text>
                    <Text style={styles.cardPreview} numberOfLines={2}>
                      {hymn.verses[0] || 'Nkulunkulu wethu osezulwini, siyakudumisa ngawo onke amandla ethu...'}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color={COLORS.outlineVariant} />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={COLORS.outlineVariant} />
                <Text style={styles.emptyTitle}>No hymns found</Text>
                <Text style={styles.emptySubtitle}>Try searching for titles like "Nkulunkulu" or hymn numbers like 125.</Text>
              </View>
            )}
          </View>

          {query.length > 0 && (
            <Text style={styles.resultsCounter}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found for "{query}"
            </Text>
          )}
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
    backgroundColor: COLORS.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
    paddingTop: SPACING.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.onSurface,
    fontSize: 15,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scopeScroll: {
    marginVertical: SPACING.xs,
  },
  scopeContent: {
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  scopeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  activeScopeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  scopeChipText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
  },
  activeScopeChipText: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  recentSection: {
    gap: SPACING.xs,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentTitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  clearText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  historyChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  historyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  historyChipText: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  resultsSection: {
    gap: SPACING.sm,
  },
  resultsTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
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
  badgeBox: {
    width: 54,
    height: 54,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  badgeLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 9,
    fontWeight: '800',
  },
  badgeNumber: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '800',
  },
  cardPreview: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  resultsCounter: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  emptySubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: 'center',
  },
});
