import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface Props { onBack: () => void; onOpenSermons: () => void; }
const SERVICES = [
  { date: 'SAT 07', month: 'SEP', title: 'Sabbath Service', place: 'Ebuhleni Main Church', time: '09:00' },
  { date: 'SUN 08', month: 'SEP', title: 'Youth Choir Practice', place: 'Umlazi Branch', time: '14:00' },
  { date: 'SAT 14', month: 'SEP', title: 'Community Prayer Gathering', place: 'KwaMashu Temple', time: '10:00' },
];

export const EventsScreen: React.FC<Props> = ({ onBack, onOpenSermons }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}><TouchableOpacity onPress={onBack} style={styles.backBtn}><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></TouchableOpacity><View><Text style={styles.headerTitle}>Upcoming Services</Text><Text style={styles.headerSubtitle}>Gatherings, worship, and key dates.</Text></View></View>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.liveCard}><View style={styles.liveDot}/><View style={styles.liveCopy}><Text style={styles.liveTitle}>Latest sermons and broadcasts</Text><Text style={styles.liveSubtitle}>Watch available recordings from the congregation.</Text></View><TouchableOpacity style={styles.watchButton} onPress={onOpenSermons}><Text style={styles.watchText}>Watch</Text></TouchableOpacity></View>
      <Text style={styles.sectionLabel}>SEPTEMBER</Text>
      {SERVICES.map((service) => <View key={service.date} style={styles.serviceCard}><View style={styles.dateBox}><Text style={styles.date}>{service.date}</Text><Text style={styles.month}>{service.month}</Text></View><View style={styles.serviceCopy}><Text style={styles.serviceTitle}>{service.title}</Text><Text style={styles.serviceDetail}><Ionicons name="location-outline" size={13}/> {service.place}</Text><Text style={styles.serviceDetail}><Ionicons name="time-outline" size={13}/> {service.time}</Text></View></View>)}
    </ScrollView>
  </SafeAreaView>
);
const styles = StyleSheet.create({ safeArea:{flex:1,backgroundColor:COLORS.surface},header:{flexDirection:'row',alignItems:'center',gap:SPACING.sm,padding:SPACING.md,borderBottomWidth:1,borderBottomColor:COLORS.surfaceVariant},backBtn:{padding:6},headerTitle:{fontSize:20,fontWeight:'800',color:COLORS.primary},headerSubtitle:{fontSize:12,color:COLORS.onSurfaceVariant,marginTop:2},content:{padding:SPACING.md,gap:SPACING.md,paddingBottom:40},liveCard:{flexDirection:'row',alignItems:'center',gap:10,padding:SPACING.md,backgroundColor:COLORS.primaryContainer,borderRadius:RADIUS.lg,...SHADOWS.card},liveDot:{width:8,height:8,borderRadius:4,backgroundColor:COLORS.secondaryContainer},liveCopy:{flex:1},liveTitle:{color:COLORS.white,fontWeight:'800',fontSize:15},liveSubtitle:{color:COLORS.primaryFixed,fontSize:12,marginTop:3},watchButton:{backgroundColor:COLORS.white,paddingHorizontal:12,paddingVertical:7,borderRadius:RADIUS.full},watchText:{color:COLORS.primary,fontWeight:'800',fontSize:12},sectionLabel:{fontSize:11,fontWeight:'800',letterSpacing:1,color:COLORS.onSurfaceVariant,marginTop:4},serviceCard:{flexDirection:'row',gap:12,padding:SPACING.md,backgroundColor:COLORS.surfaceContainerLowest,borderRadius:RADIUS.lg,borderWidth:1,borderColor:COLORS.surfaceVariant,...SHADOWS.card},dateBox:{width:52,alignItems:'center',justifyContent:'center',borderRadius:RADIUS.md,backgroundColor:COLORS.primaryFixed,paddingVertical:8},date:{fontSize:14,fontWeight:'900',color:COLORS.primary},month:{fontSize:10,fontWeight:'800',color:COLORS.primary,marginTop:2},serviceCopy:{flex:1,gap:3},serviceTitle:{fontSize:16,fontWeight:'800',color:COLORS.onSurface},serviceDetail:{fontSize:12,color:COLORS.onSurfaceVariant} });
