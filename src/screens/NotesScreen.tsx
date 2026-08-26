import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export interface NoteItem {
  id: string;
  title: string;
  category: 'Sermons' | 'Scriptures' | 'Hymns';
  date: string;
  time: string;
  preview: string;
  body: string;
  tags: string[];
  linkedReferences?: {
    type: 'scripture' | 'sermon' | 'hymn';
    title: string;
    subtitle: string;
  }[];
}

const INITIAL_NOTES: NoteItem[] = [
  {
    id: '1',
    title: 'Sermon Notes — Faith & Hope',
    category: 'Sermons',
    date: 'Sunday, 10 August',
    time: '10:30 AM',
    preview:
      'Reflecting on today\'s message about maintaining faith during difficult times. The mountain journey reminds us of endurance...',
    body: `The message today about the holy mountain deeply resonated with my current struggles. The idea that ascending the mountain isn't just a physical journey, but a spiritual shedding of worldly concerns.

I need to focus more on the purity aspect. The white garment represents a clean heart, not just outward appearance. When I felt overwhelmed last week, I lost sight of this simplicity.

Key takeaways:
• Patience in the ascent.
• Trusting the community during the pilgrimage.
• The silence at the peak is where God speaks clearest.

Must remember to read Psalm 24 tonight as suggested by the elder.`,
    tags: ['Faith', 'Sunday Service', 'Personal'],
    linkedReferences: [
      {
        type: 'scripture',
        title: 'Psalm 24',
        subtitle: 'Who shall ascend into the hill of the Lord?',
      },
      {
        type: 'sermon',
        title: 'The Path to the Peak',
        subtitle: 'Sunday Sermon • Elder Mthembu',
      },
    ],
  },
  {
    id: '2',
    title: 'Psalm 23 Reflection',
    category: 'Scriptures',
    date: 'Friday, 8 August',
    time: '07:15 AM',
    preview:
      'The Lord is my shepherd; I shall not want. Thinking about the deep peace this brings when walking the path.',
    body: `The Lord is my shepherd; I shall not want. He makes me lie down in green pastures, He leads me beside still waters.

Reflecting on the guidance of the Lord during Sabbath walks. Finding quiet peace amidst busy weekly responsibilities.`,
    tags: ['Scriptures', 'Peace', 'Sabbath'],
    linkedReferences: [
      {
        type: 'scripture',
        title: 'Psalm 23:1-6',
        subtitle: 'The Lord is My Shepherd',
      },
    ],
  },
  {
    id: '3',
    title: 'Hymn 45 Practice',
    category: 'Hymns',
    date: 'Wednesday, 6 August',
    time: '06:00 PM',
    preview:
      'Focusing on the harmonization of the third verse. The melody carries such a profound sense of communal joy.',
    body: `Practicing Hymn 45 for the upcoming Holy Gathering. The third verse harmonization requires controlled tempo and reverence.

The harmony in choir singing builds a shared sanctuary of spirit.`,
    tags: ['Hymns', 'Choir', 'Rehearsal'],
    linkedReferences: [
      {
        type: 'hymn',
        title: 'Hymn 45 - Izihlabelelo',
        subtitle: 'Ebuhleni Choir Practice',
      },
    ],
  },
];

interface NotesScreenProps {
  onBack?: () => void;
  onSelectNote: (note: NoteItem) => void;
  onNewNote: () => void;
  customNotes?: NoteItem[];
}

export const NotesScreen: React.FC<NotesScreenProps> = ({
  onBack,
  onSelectNote,
  onNewNote,
  customNotes,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<'All' | 'Sermons' | 'Scriptures' | 'Hymns'>('All');

  const notes = customNotes || INITIAL_NOTES;

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesFolder = selectedFolder === 'All' ? true : note.category === selectedFolder;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesFolder;

      const matchesTitle = note.title.toLowerCase().includes(q);
      const matchesPreview = note.preview.toLowerCase().includes(q);
      const matchesTags = note.tags.some((t) => t.toLowerCase().includes(q));

      return matchesFolder && (matchesTitle || matchesPreview || matchesTags);
    });
  }, [searchQuery, selectedFolder, notes]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.avatarBtn} onPress={onBack}>
            <Image
              source={require('../../assets/sipho_profile.png')}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Notes</Text>
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Section Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>My Notes</Text>
          <Text style={styles.screenSubtitle}>Spiritual reflections and spiritual journey.</Text>

          {/* Search Input */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search notes..."
              placeholderTextColor={COLORS.outline}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Bento Style Folders Grid */}
        <View style={styles.bentoGrid}>
          {/* ALL NOTES */}
          <TouchableOpacity
            style={[styles.bentoCard, selectedFolder === 'All' && styles.bentoCardActive]}
            onPress={() => setSelectedFolder('All')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="folder"
              size={22}
              color={selectedFolder === 'All' ? COLORS.white : COLORS.primary}
            />
            <Text style={[styles.bentoText, selectedFolder === 'All' && styles.bentoTextActive]}>
              ALL NOTES
            </Text>
          </TouchableOpacity>

          {/* SERMONS */}
          <TouchableOpacity
            style={[styles.bentoCard, selectedFolder === 'Sermons' && styles.bentoCardActive]}
            onPress={() => setSelectedFolder('Sermons')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="church"
              size={22}
              color={selectedFolder === 'Sermons' ? COLORS.white : COLORS.surfaceTint}
            />
            <Text style={[styles.bentoText, selectedFolder === 'Sermons' && styles.bentoTextActive]}>
              SERMONS
            </Text>
          </TouchableOpacity>

          {/* SCRIPTURES */}
          <TouchableOpacity
            style={[styles.bentoCard, selectedFolder === 'Scriptures' && styles.bentoCardActive]}
            onPress={() => setSelectedFolder('Scriptures')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="book"
              size={22}
              color={selectedFolder === 'Scriptures' ? COLORS.white : COLORS.surfaceTint}
            />
            <Text style={[styles.bentoText, selectedFolder === 'Scriptures' && styles.bentoTextActive]}>
              SCRIPTURES
            </Text>
          </TouchableOpacity>

          {/* HYMNS */}
          <TouchableOpacity
            style={[styles.bentoCard, selectedFolder === 'Hymns' && styles.bentoCardActive]}
            onPress={() => setSelectedFolder('Hymns')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="musical-notes"
              size={22}
              color={selectedFolder === 'Hymns' ? COLORS.white : COLORS.surfaceTint}
            />
            <Text style={[styles.bentoText, selectedFolder === 'Hymns' && styles.bentoTextActive]}>
              HYMNS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notes List */}
        <View style={styles.notesList}>
          {filteredNotes.map((note) => (
            <TouchableOpacity
              key={note.id}
              style={styles.noteCard}
              onPress={() => onSelectNote(note)}
              activeOpacity={0.85}
            >
              {/* Primary Green Stripe on top note */}
              {note.id === '1' && <View style={styles.leftStripe} />}

              <View style={styles.cardHeader}>
                <Text style={styles.noteCardTitle}>{note.title}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{note.category}</Text>
                </View>
              </View>

              <Text style={styles.noteCardPreview} numberOfLines={2}>
                {note.preview}
              </Text>

              <View style={styles.cardFooter}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.onSurfaceVariant} />
                <Text style={styles.cardDateText}>{note.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating FAB Action Button */}
      <TouchableOpacity
        style={styles.fabBtn}
        onPress={onNewNote}
        activeOpacity={0.85}
      >
        <Ionicons name="pencil" size={24} color={COLORS.white} />
      </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.lg,
    paddingBottom: 80,
  },
  titleSection: {
    gap: 4,
  },
  screenTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  screenSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    marginBottom: SPACING.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: COLORS.surfaceContainerLow,
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
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  bentoCard: {
    width: '48%',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.card,
  },
  bentoCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  bentoText: {
    color: COLORS.onSurface,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bentoTextActive: {
    color: COLORS.white,
  },
  notesList: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    position: 'relative',
    overflow: 'hidden',
    gap: 8,
    ...SHADOWS.card,
  },
  leftStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: COLORS.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noteCardTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  categoryBadgeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '700',
  },
  noteCardPreview: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  cardDateText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  fabBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.goldGlow,
  },
});
