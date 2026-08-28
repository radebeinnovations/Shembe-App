import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface Props { onBack: () => void; }
const TEACHINGS = [
  { id: 'faith', title: 'Faith and the Sacred Path', subtitle: 'Ukuhamba ngokukholwa', body: 'Faith is lived through humility, prayer, and care for one another. Let every step be taken with a clean heart and a commitment to peace.' },
  { id: 'community', title: 'The Strength of Community', subtitle: 'Umphakathi uyasiphakamisa', body: 'The congregation carries one another through worship, service, and fellowship. A shared song and a helping hand are both acts of devotion.' },
  { id: 'sabbath', title: 'Honouring the Sabbath', subtitle: 'Usuku olungcwele', body: 'Set aside time for worship, reflection, and renewal. Enter the Sabbath with gratitude and leave it with compassion for the wider community.' },
];

export const TeachingsScreen: React.FC<Props> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = TEACHINGS.find((item) => item.id === selectedId);
  return <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}><TouchableOpacity onPress={selected ? () => setSelectedId(null) : onBack} style={styles.backBtn}><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></TouchableOpacity><View><Text style={styles.headerTitle}>{selected ? 'Teaching Detail' : 'Shembe Teachings'}</Text><Text style={styles.headerSubtitle}>{selected ? selected.subtitle : 'Spiritual wisdom and guidance.'}</Text></View></View>
    <ScrollView contentContainerStyle={styles.content}>{selected ? <View style={styles.detailCard}><Text style={styles.detailTitle}>{selected.title}</Text><Text style={styles.detailBody}>{selected.body}</Text></View> : <>{TEACHINGS.map((item) => <TouchableOpacity key={item.id} style={styles.card} onPress={() => setSelectedId(item.id)}><View style={styles.icon}><Ionicons name="bulb-outline" size={22} color={COLORS.secondary} /></View><View style={styles.copy}><Text style={styles.title}>{item.title}</Text><Text style={styles.subtitle}>{item.subtitle}</Text></View><Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} /></TouchableOpacity>)}</>}</ScrollView>
  </SafeAreaView>;
};
const styles = StyleSheet.create({ safeArea:{flex:1,backgroundColor:COLORS.surface},header:{flexDirection:'row',alignItems:'center',gap:SPACING.sm,padding:SPACING.md,borderBottomWidth:1,borderBottomColor:COLORS.surfaceVariant},backBtn:{padding:6},headerTitle:{fontSize:20,fontWeight:'800',color:COLORS.primary},headerSubtitle:{fontSize:12,color:COLORS.onSurfaceVariant,marginTop:2},content:{padding:SPACING.md,gap:SPACING.md,paddingBottom:40},card:{flexDirection:'row',alignItems:'center',gap:12,padding:SPACING.md,backgroundColor:COLORS.surfaceContainerLowest,borderWidth:1,borderColor:COLORS.surfaceVariant,borderRadius:RADIUS.lg,...SHADOWS.card},icon:{width:44,height:44,borderRadius:RADIUS.md,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.secondaryFixed},copy:{flex:1},title:{fontSize:16,fontWeight:'700',color:COLORS.onSurface},subtitle:{fontSize:13,color:COLORS.onSurfaceVariant,marginTop:3},detailCard:{backgroundColor:COLORS.surfaceContainerLowest,borderRadius:RADIUS.xl,padding:SPACING.lg,borderWidth:1,borderColor:COLORS.surfaceVariant,...SHADOWS.card},detailTitle:{fontSize:26,fontWeight:'900',color:COLORS.primary,marginBottom:SPACING.md},detailBody:{fontSize:18,lineHeight:29,color:COLORS.onSurface} });
