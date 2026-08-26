import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { NoteItem } from './NotesScreen';

interface NewNoteScreenProps {
  onClose: () => void;
  onSaveNote: (note: Partial<NoteItem>) => void;
  initialNote?: NoteItem | null;
}

export const NewNoteScreen: React.FC<NewNoteScreenProps> = ({
  onClose,
  onSaveNote,
  initialNote,
}) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [body, setBody] = useState(initialNote?.body || '');
  const [tags, setTags] = useState(initialNote?.tags.join(', ') || '');
  const [linkedCategory, setLinkedCategory] = useState<'Sermons' | 'Scriptures' | 'Hymns'>('Sermons');
  const [showLinkPicker, setShowLinkPicker] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<{ title: string; subtitle: string } | null>(
    initialNote?.linkedReferences?.[0] || null
  );

  const availableLinks = {
    Scriptures: [
      { title: 'Psalm 24', subtitle: 'Who shall ascend into the hill of the Lord?' },
      { title: 'Psalm 23:1-6', subtitle: 'The Lord is My Shepherd' },
      { title: 'Isaiah 2:2-3', subtitle: 'The Holy Mountain' },
    ],
    Sermons: [
      { title: 'The Path to the Peak', subtitle: 'Sunday Sermon • Elder Mthembu' },
      { title: 'Faith & Purity', subtitle: 'Sabbath Service Address' },
      { title: 'Community & Endurance', subtitle: 'Youth Service' },
    ],
    Hymns: [
      { title: 'Hymn 125: Nkulunkulu Wethu', subtitle: 'Ebuhleni Choir' },
      { title: 'Hymn 250: Hamba Nathi', subtitle: 'Izihlabelelo' },
      { title: 'Hymn 217: Dumisani UNkulunkulu', subtitle: 'Holy Gathering' },
    ],
  };

  const handleSave = () => {
    // Smart title fallback if user didn't fill in title explicitly
    let noteTitle = title.trim();
    if (!noteTitle) {
      const firstBodyLine = body.trim().split('\n')[0];
      noteTitle = firstBodyLine ? firstBodyLine.slice(0, 30) : 'Untitled Reflection';
    }

    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSaveNote({
      id: initialNote?.id || Date.now().toString(),
      title: noteTitle,
      category: linkedCategory,
      date: 'October 24, 2023',
      time: '10:30 AM',
      preview: body.trim() ? body.trim().slice(0, 90) : 'Personal spiritual reflection...',
      body: body.trim() || 'No body text provided.',
      tags: tagArray.length > 0 ? tagArray : ['Personal'],
      linkedReferences: selectedLink
        ? [
            {
              type: linkedCategory === 'Scriptures' ? 'scripture' : linkedCategory === 'Sermons' ? 'sermon' : 'hymn',
              title: selectedLink.title,
              subtitle: selectedLink.subtitle,
            },
          ]
        : undefined,
    });

    onClose();
  };

  // Text Formatting Actions
  const applyFormat = (prefix: string, suffix: string = '') => {
    setBody((prev) => `${prev}${prefix}formatted text${suffix}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{initialNote ? 'Edit Note' : 'New Note'}</Text>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Metadata Date */}
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.onSurfaceVariant} />
          <Text style={styles.dateText}>October 24, 2023</Text>
        </View>

        {/* Note Title Input */}
        <TextInput
          style={styles.titleInput}
          placeholder="Note Title"
          placeholderTextColor={COLORS.outlineVariant}
          value={title}
          onChangeText={setTitle}
        />

        {/* Linking Section (Bento Chips) */}
        <View style={styles.chipsRow}>
          <TouchableOpacity
            style={[styles.linkChip, linkedCategory === 'Scriptures' && styles.linkChipActive]}
            onPress={() => {
              setLinkedCategory('Scriptures');
              setShowLinkPicker(true);
            }}
          >
            <Ionicons name="add" size={14} color={linkedCategory === 'Scriptures' ? COLORS.white : COLORS.onSurfaceVariant} />
            <Text style={[styles.linkChipText, linkedCategory === 'Scriptures' && styles.linkChipTextActive]}>
              {selectedLink && linkedCategory === 'Scriptures' ? selectedLink.title : '+ Link Scripture'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkChip, linkedCategory === 'Sermons' && styles.linkChipActive]}
            onPress={() => {
              setLinkedCategory('Sermons');
              setShowLinkPicker(true);
            }}
          >
            <Ionicons name="add" size={14} color={linkedCategory === 'Sermons' ? COLORS.white : COLORS.onSurfaceVariant} />
            <Text style={[styles.linkChipText, linkedCategory === 'Sermons' && styles.linkChipTextActive]}>
              {selectedLink && linkedCategory === 'Sermons' ? selectedLink.title : '+ Link Sermon'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkChip, linkedCategory === 'Hymns' && styles.linkChipActive]}
            onPress={() => {
              setLinkedCategory('Hymns');
              setShowLinkPicker(true);
            }}
          >
            <Ionicons name="add" size={14} color={linkedCategory === 'Hymns' ? COLORS.white : COLORS.onSurfaceVariant} />
            <Text style={[styles.linkChipText, linkedCategory === 'Hymns' && styles.linkChipTextActive]}>
              {selectedLink && linkedCategory === 'Hymns' ? selectedLink.title : '+ Link Hymn'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rich Formatting Toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolBtn} onPress={() => applyFormat('**', '**')}>
            <Text style={styles.toolBold}>B</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolBtn} onPress={() => applyFormat('*', '*')}>
            <Text style={styles.toolItalic}>I</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolBtn} onPress={() => applyFormat('<u>', '</u>')}>
            <Text style={styles.toolUnderline}>U</Text>
          </TouchableOpacity>

          <View style={styles.toolDivider} />

          <TouchableOpacity style={styles.toolBtn} onPress={() => applyFormat('\n• ')}>
            <Ionicons name="list" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Note Body Multiline Editor */}
        <TextInput
          style={styles.bodyInput}
          placeholder="Start writing your reflections..."
          placeholderTextColor={COLORS.outlineVariant}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        {/* Tags Section (Bottom Input) */}
        <View style={styles.tagsSection}>
          <Ionicons name="pricetag-outline" size={18} color={COLORS.onSurfaceVariant} />
          <TextInput
            style={styles.tagsInput}
            placeholder="Add tags (comma separated, e.g. Faith, Sabbath)"
            placeholderTextColor={COLORS.outlineVariant}
            value={tags}
            onChangeText={setTags}
          />
        </View>
      </ScrollView>

      {/* Link Picker Modal */}
      <Modal visible={showLinkPicker} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowLinkPicker(false)}
          activeOpacity={1}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Link {linkedCategory}</Text>

            <ScrollView style={{ maxHeight: 260 }}>
              {availableLinks[linkedCategory].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.linkOption}
                  onPress={() => {
                    setSelectedLink(item);
                    setShowLinkPicker(false);
                  }}
                >
                  <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.linkOptionTitle}>{item.title}</Text>
                    <Text style={styles.linkOptionSubtitle}>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
  closeBtn: {
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
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  titleInput: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.onSurface,
    paddingVertical: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  linkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  linkChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  linkChipText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  linkChipTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  toolBtn: {
    padding: 4,
  },
  toolBold: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.onSurface,
  },
  toolItalic: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.onSurface,
  },
  toolUnderline: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: COLORS.onSurface,
  },
  toolDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.outlineVariant,
  },
  bodyInput: {
    minHeight: 220,
    fontSize: 16,
    color: COLORS.onSurface,
    lineHeight: 26,
  },
  tagsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
  },
  tagsInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurface,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.surfaceVariant,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  linkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  linkOptionTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  linkOptionSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
});
