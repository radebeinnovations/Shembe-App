import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { NoteItem } from './NotesScreen';

interface NoteDetailScreenProps {
  note: NoteItem;
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({
  note,
  onBack,
  onEdit,
  onDelete,
}) => {
  const handleDeleteConfirm = () => {
    Alert.alert(
      'Delete Note',
      `Are you sure you want to delete "${note.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDelete(note.id);
            onBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Note Detail</Text>

        <View style={styles.headerRightGroup}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={onEdit}>
            <Ionicons name="pencil" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => Alert.alert('Share Note', `Sharing note "${note.title}"`)}
          >
            <Ionicons name="share-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Tactile Note Paper Card */}
        <View style={styles.notePaper}>
          <View style={styles.paperStripe} />

          {/* Title & Metadata */}
          <Text style={styles.paperTitle}>{note.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.onSurfaceVariant} />
              <Text style={styles.metaText}>{note.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
              <Text style={styles.metaText}>{note.time}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {note.tags.map((tag, idx) => (
              <View key={idx} style={styles.tagChip}>
                <Text style={styles.tagChipText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Note Body Text */}
          <Text style={styles.paperBodyText}>{note.body}</Text>
        </View>

        {/* Related References Section */}
        <View style={styles.referencesSection}>
          <View style={styles.referencesHeader}>
            <Ionicons name="link" size={18} color={COLORS.primary} />
            <Text style={styles.referencesTitle}>Related References</Text>
          </View>

          <View style={styles.referencesGrid}>
            {note.linkedReferences && note.linkedReferences.length > 0 ? (
              note.linkedReferences.map((ref, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.referenceCard}
                  onPress={() => Alert.alert('Reference', `Viewing ${ref.title}`)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.refIconCircle,
                      ref.type === 'scripture'
                        ? { backgroundColor: COLORS.primaryContainer }
                        : { backgroundColor: COLORS.tertiaryContainer },
                    ]}
                  >
                    <Ionicons
                      name={ref.type === 'scripture' ? 'book' : 'mic'}
                      size={18}
                      color={COLORS.white}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.refCardTitle}>{ref.title}</Text>
                    <Text style={styles.refCardSubtitle} numberOfLines={1}>
                      {ref.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity
                style={styles.referenceCard}
                onPress={() => Alert.alert('Scriptures', 'Opening Psalm 24')}
                activeOpacity={0.8}
              >
                <View style={[styles.refIconCircle, { backgroundColor: COLORS.primaryContainer }]}>
                  <Ionicons name="book" size={18} color={COLORS.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.refCardTitle}>Psalm 24</Text>
                  <Text style={styles.refCardSubtitle}>Who shall ascend into the hill of the Lord?</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Bottom Actions (Delete Note) */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDeleteConfirm}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
            <Text style={styles.deleteBtnText}>Delete Note</Text>
          </TouchableOpacity>
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
  headerRightGroup: {
    flexDirection: 'row',
    gap: 4,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
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
  },
  notePaper: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    paddingLeft: 24,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    position: 'relative',
    gap: 10,
    ...SHADOWS.card,
  },
  paperStripe: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: COLORS.surfaceVariant,
    opacity: 0.6,
  },
  paperTitle: {
    color: COLORS.onSurface,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tagChip: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  tagChipText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginVertical: 4,
  },
  paperBodyText: {
    color: COLORS.onSurface,
    fontSize: 16,
    lineHeight: 26,
  },
  referencesSection: {
    gap: 10,
  },
  referencesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  referencesTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  referencesGrid: {
    gap: 10,
  },
  referenceCard: {
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
  refIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refCardTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '800',
  },
  refCardSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
  bottomActions: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  deleteBtnText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '700',
  },
});
