import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_PILGRIMAGES } from '../data/mockData';
import { Pilgrimage } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface PilgrimageScreenProps {
  onBack?: () => void;
}

export const PilgrimageScreen: React.FC<PilgrimageScreenProps> = ({ onBack }) => {
  const [selectedPilgrimage, setSelectedPilgrimage] = useState<Pilgrimage>(MOCK_PILGRIMAGES[0]);
  const [activeTab, setActiveTab] = useState<'trail' | 'packing' | 'safety'>('trail');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Screen Title */}
      <View style={styles.headerTitleRow}>
        {onBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>Sacred Pilgrimages & Holy Walks</Text>
          <Text style={styles.screenSubtitle}>Izinhlangano, Uhambo Lwasentabeni & Amabandla</Text>
        </View>
      </View>

      {/* Pilgrimage Selector Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pilgrimageSelector}
        contentContainerStyle={styles.pilgrimageSelectorContent}
      >
        {MOCK_PILGRIMAGES.map((p) => {
          const isSelected = selectedPilgrimage.id === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              style={[styles.pilgrimageCardBtn, isSelected && styles.selectedPilgrimageBtn]}
              onPress={() => setSelectedPilgrimage(p)}
            >
              <Text style={[styles.pilgrimageBtnTitle, isSelected && styles.selectedBtnTitle]}>
                {p.title}
              </Text>
              <Text style={styles.pilgrimageBtnMonth}>{p.month}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Main Selected Pilgrimage Banner */}
      <View style={styles.heroCard}>
        <Image source={{ uri: selectedPilgrimage.imageUrl }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <View style={styles.datesBadge}>
            <Ionicons name="calendar" size={14} color={COLORS.gold} />
            <Text style={styles.datesText}>{selectedPilgrimage.dates}</Text>
          </View>
          <Text style={styles.heroTitle}>{selectedPilgrimage.title}</Text>
          <Text style={styles.heroZuluName}>{selectedPilgrimage.isiZuluName}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={COLORS.goldLight} />
            <Text style={styles.locationText}>{selectedPilgrimage.location}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.descText}>{selectedPilgrimage.description}</Text>

      {/* Secondary Tab Switcher: Trail Checkpoints | Packing List | Safety */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'trail' && styles.activeTabBtn]}
          onPress={() => setActiveTab('trail')}
        >
          <Ionicons
            name="trail-sign"
            size={16}
            color={activeTab === 'trail' ? COLORS.bgDark : COLORS.gold}
          />
          <Text style={[styles.tabBtnText, activeTab === 'trail' && styles.activeTabBtnText]}>
            Trail Checkpoints
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'packing' && styles.activeTabBtn]}
          onPress={() => setActiveTab('packing')}
        >
          <Ionicons
            name="briefcase"
            size={16}
            color={activeTab === 'packing' ? COLORS.bgDark : COLORS.gold}
          />
          <Text style={[styles.tabBtnText, activeTab === 'packing' && styles.activeTabBtnText]}>
            Packing List
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'safety' && styles.activeTabBtn]}
          onPress={() => setActiveTab('safety')}
        >
          <Ionicons
            name="shield-checkmark"
            size={16}
            color={activeTab === 'safety' ? COLORS.bgDark : COLORS.gold}
          />
          <Text style={[styles.tabBtnText, activeTab === 'safety' && styles.activeTabBtnText]}>
            Safety & Rules
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Contents */}
      {activeTab === 'trail' && (
        <View style={styles.trailTimelineContainer}>
          <Text style={styles.sectionHeading}>Interactive Trail Checkpoints</Text>
          {selectedPilgrimage.trailPoints.map((tp, idx) => (
            <View key={tp.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.dot, tp.isRestStop && styles.restStopDot]}>
                  <Text style={styles.dotNumber}>{idx + 1}</Text>
                </View>
                {idx < selectedPilgrimage.trailPoints.length - 1 && (
                  <View style={styles.verticalLine} />
                )}
              </View>

              <View style={styles.timelineRightCard}>
                <View style={styles.tpHeaderRow}>
                  <Text style={styles.tpTitle}>{tp.title}</Text>
                  {tp.isRestStop && (
                    <View style={styles.restBadge}>
                      <Text style={styles.restBadgeText}>Rest Stop</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.tpDesc}>{tp.description}</Text>
                <View style={styles.tpStatsRow}>
                  <Text style={styles.tpStat}>Distance: {tp.distanceKm} km</Text>
                  <Text style={styles.tpStat}>Elevation: {tp.elevationMeters}m</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'packing' && (
        <View style={styles.infoCard}>
          <Text style={styles.sectionHeading}>Sacred Items & Traditional Packing</Text>
          {selectedPilgrimage.packingList.map((item, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.gold} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'safety' && (
        <View style={styles.infoCard}>
          <Text style={styles.sectionHeading}>Pilgrimage Guidelines & Instructions</Text>
          {selectedPilgrimage.safetyGuidelines.map((item, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Ionicons name="information-circle" size={20} color={COLORS.goldLight} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: 40,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: SPACING.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: '800',
  },
  screenSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: SPACING.md,
  },
  pilgrimageSelector: {
    marginBottom: SPACING.md,
  },
  pilgrimageSelectorContent: {
    gap: 10,
  },
  pilgrimageCardBtn: {
    backgroundColor: COLORS.bgCardDark,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  selectedPilgrimageBtn: {
    backgroundColor: COLORS.emeraldDark,
    borderColor: COLORS.gold,
  },
  pilgrimageBtnTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  selectedBtnTitle: {
    color: COLORS.gold,
  },
  pilgrimageBtnMonth: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  heroCard: {
    height: 200,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 39, 27, 0.75)',
    padding: SPACING.md,
    justifyContent: 'flex-end',
  },
  datesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  datesText: {
    color: COLORS.goldLight,
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
  heroZuluName: {
    color: COLORS.gold,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: COLORS.whiteSubtle,
    fontSize: 12,
  },
  descText: {
    color: COLORS.whiteSubtle,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCardDark,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  activeTabBtn: {
    backgroundColor: COLORS.gold,
  },
  tabBtnText: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '700',
  },
  activeTabBtnText: {
    color: COLORS.bgDark,
  },
  sectionHeading: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  trailTimelineContainer: {
    marginTop: SPACING.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restStopDot: {
    backgroundColor: COLORS.gold,
  },
  dotNumber: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.borderDark,
    marginTop: 4,
  },
  timelineRightCard: {
    flex: 1,
    backgroundColor: COLORS.bgCardDark,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  tpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tpTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  restBadge: {
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  restBadgeText: {
    color: COLORS.goldLight,
    fontSize: 10,
    fontWeight: '700',
  },
  tpDesc: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  tpStatsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  tpStat: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: COLORS.bgCardDark,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: SPACING.sm,
  },
  bulletText: {
    color: COLORS.whiteSubtle,
    fontSize: 13,
    flex: 1,
  },
});
