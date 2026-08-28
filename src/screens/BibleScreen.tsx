import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface Props { onBack: () => void; }

const READINGS = [
  { id: 'psalm-23', reference: 'IHUBO 23:1–6', title: 'INkosi ingumalusi wami', text: 'INkosi ingumalusi wami; angiyikuswela. Ingilalisa emadlelweni aluhlaza, ingiyisa emanzini okuphumula.' },
  { id: 'proverbs-3', reference: 'IZAGA 3:5–6', title: 'Themba kuJehova', text: 'Kholwa kuJehova ngayo yonke inhliziyo yakho, ungenciki kokwakho ukuqonda. Mazi yena ezindleleni zakho zonke.' },
  { id: 'matthew-5', reference: 'MATHEWU 5:9', title: 'Abaletha ukuthula', text: 'Babusisiwe abaletha ukuthula, ngokuba bayakuthiwa abantwana bakaNkulunkulu.' },
];

export const BibleScreen: React.FC<Props> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const readings = useMemo(() => READINGS.filter((reading) => {
    const value = query.trim().toLowerCase();
    return !value || `${reading.reference} ${reading.title} ${reading.text}`.toLowerCase().includes(value);
  }), [query]);
  const selected = READINGS.find((reading) => reading.id === selectedId);

  if (selected) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedId(null)} style={styles.backBtn} accessibilityLabel="Back to scripture search">
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View><Text style={styles.headerTitle}>Scripture Reader</Text><Text style={styles.headerSubtitle}>{selected.reference}</Text></View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.readerCard}>
            <Text style={styles.readerReference}>{selected.reference}</Text>
            <Text style={styles.readerTitle}>{selected.title}</Text>
            <Text style={styles.readerText}>{selected.text}</Text>
          </View>
          <Text style={styles.readerHint}>Save this reading in a note or share it with your congregation.</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityLabel="Back"><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></TouchableOpacity>
        <View><Text style={styles.headerTitle}>Scriptures & Teachings</Text><Text style={styles.headerSubtitle}>Search and read the Word.</Text></View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={19} color={COLORS.onSurfaceVariant} />
          <TextInput value={query} onChangeText={setQuery} placeholder="Search scripture, topic, or reference" placeholderTextColor={COLORS.outline} style={styles.searchInput} />
          {query ? <TouchableOpacity onPress={() => setQuery('')}><Ionicons name="close-circle" size={18} color={COLORS.onSurfaceVariant} /></TouchableOpacity> : null}
        </View>
        <Text style={styles.sectionLabel}>{query ? 'SEARCH RESULTS' : 'DAILY READINGS'}</Text>
        {readings.map((reading) => (
          <TouchableOpacity key={reading.id} style={styles.readingCard} onPress={() => setSelectedId(reading.id)} activeOpacity={0.8}>
            <View style={styles.readingIcon}><Ionicons name="book-outline" size={20} color={COLORS.primary} /></View>
            <View style={styles.readingCopy}><Text style={styles.reference}>{reading.reference}</Text><Text style={styles.readingTitle}>{reading.title}</Text><Text style={styles.preview} numberOfLines={2}>{reading.text}</Text></View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        ))}
        {!readings.length ? <Text style={styles.empty}>No scriptures match “{query}”. Try a book, verse, or theme.</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.surface }, header: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, gap: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceVariant }, backBtn: { padding: 6 }, headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.primary }, headerSubtitle: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 }, content: { padding: SPACING.md, gap: SPACING.md, paddingBottom: 40 }, searchBox: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 48, paddingHorizontal: SPACING.md, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.surfaceVariant }, searchInput: { flex: 1, fontSize: 14, color: COLORS.onSurface }, sectionLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1, color: COLORS.onSurfaceVariant, marginTop: 4 }, readingCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: SPACING.md, borderRadius: RADIUS.lg, backgroundColor: COLORS.surfaceContainerLowest, borderWidth: 1, borderColor: COLORS.surfaceVariant, ...SHADOWS.card }, readingIcon: { width: 40, height: 40, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primaryFixed }, readingCopy: { flex: 1 }, reference: { color: COLORS.secondary, fontSize: 11, fontWeight: '800', letterSpacing: .6 }, readingTitle: { color: COLORS.onSurface, fontSize: 16, fontWeight: '700', marginTop: 2 }, preview: { color: COLORS.onSurfaceVariant, fontSize: 13, lineHeight: 18, marginTop: 4 }, empty: { color: COLORS.onSurfaceVariant, textAlign: 'center', padding: SPACING.xl }, readerCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: RADIUS.xl, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.surfaceVariant, ...SHADOWS.card }, readerReference: { color: COLORS.secondary, fontSize: 12, fontWeight: '800', letterSpacing: 1 }, readerTitle: { color: COLORS.primary, fontSize: 26, fontWeight: '900', marginTop: 8, marginBottom: SPACING.lg }, readerText: { color: COLORS.onSurface, fontSize: 19, lineHeight: 31 }, readerHint: { color: COLORS.onSurfaceVariant, fontSize: 13, lineHeight: 19, textAlign: 'center', paddingHorizontal: SPACING.md },
});
