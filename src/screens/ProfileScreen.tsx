import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { NotesScreen, NoteItem } from './NotesScreen';
import { NewNoteScreen } from './NewNoteScreen';
import { NoteDetailScreen } from './NoteDetailScreen';

interface ProfileScreenProps {
  onSignOut: () => void;
  onNavigate?: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onSignOut,
  onNavigate,
}) => {
  const [subScreen, setSubScreen] = useState<'profile' | 'notes' | 'new_note' | 'note_detail'>('profile');
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [notesList, setNotesList] = useState<NoteItem[]>([
    {
      id: '1',
      title: 'Sermon Notes — Faith & Hope',
      category: 'Sermons',
      date: 'Sunday, 10 August',
      time: '10:30 AM',
      preview:
        "Reflecting on today's message about maintaining faith during difficult times. The mountain journey reminds us of endurance...",
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
  ]);

  if (subScreen === 'notes') {
    return (
      <NotesScreen
        customNotes={notesList}
        onBack={() => setSubScreen('profile')}
        onSelectNote={(note) => {
          setSelectedNote(note);
          setSubScreen('note_detail');
        }}
        onNewNote={() => {
          setSelectedNote(null);
          setSubScreen('new_note');
        }}
      />
    );
  }

  if (subScreen === 'new_note') {
    return (
      <NewNoteScreen
        initialNote={selectedNote}
        onClose={() => setSubScreen('notes')}
        onSaveNote={(newNote) => {
          const fullNote: NoteItem = {
            id: newNote.id || Date.now().toString(),
            title: newNote.title || 'Untitled Reflection',
            category: newNote.category || 'Sermons',
            date: newNote.date || 'October 24, 2023',
            time: newNote.time || '10:30 AM',
            preview: newNote.preview || 'Spiritual reflection...',
            body: newNote.body || '',
            tags: newNote.tags || ['Personal'],
            linkedReferences: newNote.linkedReferences,
          };

          setNotesList((prev) => {
            const exists = prev.some((n) => n.id === fullNote.id);
            if (exists) {
              return prev.map((n) => (n.id === fullNote.id ? fullNote : n));
            }
            return [fullNote, ...prev];
          });

          setSubScreen('notes');
        }}
      />
    );
  }

  if (subScreen === 'note_detail' && selectedNote) {
    return (
      <NoteDetailScreen
        note={selectedNote}
        onBack={() => setSubScreen('notes')}
        onEdit={() => setSubScreen('new_note')}
        onDelete={(id) => {
          setNotesList((prev) => prev.filter((n) => n.id !== id));
          setSubScreen('notes');
        }}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top App Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarHeaderBtn} activeOpacity={0.8}>
          <Image
            source={require('../../assets/sipho_profile.png')}
            style={styles.avatarHeaderImage}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => Alert.alert('Settings', 'App preferences & settings')}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Profile Header Area */}
      <View style={styles.profileHeaderSection}>
        <View style={styles.largeAvatarCircle}>
          <Image
            source={require('../../assets/sipho_profile.png')}
            style={styles.largeAvatarImage}
            resizeMode="cover"
          />
          <View style={styles.editBadge}>
            <Ionicons name="pencil" size={12} color={COLORS.white} />
          </View>
        </View>

        <Text style={styles.memberName}>Sipho Mkhize</Text>

        <View style={styles.churchBadge}>
          <Ionicons name="location-outline" size={14} color={COLORS.onSurfaceVariant} />
          <Text style={styles.churchBadgeText}>Ebuhleni Main Church</Text>
        </View>
      </View>

      {/* MY CONTENT Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>MY CONTENT</Text>
        <View style={styles.contentGrid}>
          {/* Notes Card */}
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => setSubScreen('notes')}
            activeOpacity={0.85}
          >
            <View style={[styles.cardIconCircle, { backgroundColor: '#c1ecd4' }]}>
              <Ionicons name="document-text" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.cardTitle}>My Notes</Text>
            <Text style={styles.cardSubtitle}>3 Reflections</Text>
          </TouchableOpacity>

          {/* Prayers Card */}
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => Alert.alert('Active Prayers', 'You have 5 active prayer requests.')}
            activeOpacity={0.85}
          >
            <View style={[styles.cardIconCircle, { backgroundColor: '#ffe088' }]}>
              <Ionicons name="sparkles" size={20} color={COLORS.secondary} />
            </View>
            <Text style={styles.cardTitle}>Prayers</Text>
            <Text style={styles.cardSubtitle}>5 Active</Text>
          </TouchableOpacity>

          {/* Contributions Card - Full Width */}
          <TouchableOpacity
            style={styles.fullWidthCard}
            onPress={() => (onNavigate ? onNavigate('MyContributions') : Alert.alert('Contributions', 'Viewing giving history'))}
            activeOpacity={0.85}
          >
            <View style={styles.fullWidthLeft}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#f6decd' }]}>
                <Ionicons name="heart" size={20} color="#312419" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Contributions</Text>
                <Text style={styles.cardSubtitle}>View history</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ACCOUNT Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.accountCardGroup}>
          {/* Personal Info */}
          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => onNavigate && onNavigate('PersonalInfo')}
            activeOpacity={0.85}
          >
            <View style={styles.accountRowLeft}>
              <Ionicons name="person-outline" size={20} color={COLORS.onSurfaceVariant} style={styles.rowIcon} />
              <Text style={styles.rowText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Notifications */}
          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => onNavigate && onNavigate('NotificationsSettings')}
            activeOpacity={0.85}
          >
            <View style={styles.accountRowLeft}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.onSurfaceVariant} style={styles.rowIcon} />
              <Text style={styles.rowText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Help & Support */}
          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => onNavigate && onNavigate('HelpSupport')}
            activeOpacity={0.85}
          >
            <View style={styles.accountRowLeft}>
              <Ionicons name="help-circle-outline" size={20} color={COLORS.onSurfaceVariant} style={styles.rowIcon} />
              <Text style={styles.rowText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SIGN OUT BUTTON */}
      <TouchableOpacity
        style={styles.signOutBtn}
        onPress={onSignOut}
        activeOpacity={0.85}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.lg,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  avatarHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  avatarHeaderImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeaderSection: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  largeAvatarCircle: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  largeAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.full,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    width: 26,
    height: 26,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  memberName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.onSurface,
  },
  churchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginTop: 6,
  },
  churchBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  section: {
    gap: SPACING.xs,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    gap: 6,
    ...SHADOWS.card,
  },
  fullWidthCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.card,
  },
  fullWidthLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.onSurface,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  accountCardGroup: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  accountRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIcon: {
    width: 24,
  },
  rowText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginLeft: 48,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: COLORS.surfaceContainerLowest,
    marginTop: SPACING.sm,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.error,
  },
});
