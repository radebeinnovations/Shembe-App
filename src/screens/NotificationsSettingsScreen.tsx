import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';

interface Props {
  onBack: () => void;
}

export const NotificationsSettingsScreen: React.FC<Props> = ({ onBack }) => {
  const [sermonPush, setSermonPush] = useState(true);
  const [pilgrimageAlerts, setPilgrimageAlerts] = useState(true);
  const [announcements, setAnnouncements] = useState(true);
  const [emailNews, setEmailNews] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>Manage how the Shembe App communicates with you.</Text>
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Live Sermons</Text>
              <Text style={styles.settingDesc}>Notify me when a live Sabbath service or sermon begins.</Text>
            </View>
            <Switch
              value={sermonPush}
              onValueChange={setSermonPush}
              trackColor={{ false: '#E2E8F0', true: COLORS.primary + '80' }}
              thumbColor={sermonPush ? COLORS.primary : '#f4f3f4'}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Pilgrimage Alerts</Text>
              <Text style={styles.settingDesc}>Important updates during holy month gatherings.</Text>
            </View>
            <Switch
              value={pilgrimageAlerts}
              onValueChange={setPilgrimageAlerts}
              trackColor={{ false: '#E2E8F0', true: COLORS.primary + '80' }}
              thumbColor={pilgrimageAlerts ? COLORS.primary : '#f4f3f4'}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Church Announcements</Text>
              <Text style={styles.settingDesc}>General news and circulars from the leadership.</Text>
            </View>
            <Switch
              value={announcements}
              onValueChange={setAnnouncements}
              trackColor={{ false: '#E2E8F0', true: COLORS.primary + '80' }}
              thumbColor={announcements ? COLORS.primary : '#f4f3f4'}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Email Newsletter</Text>
              <Text style={styles.settingDesc}>Receive a monthly summary of church activities via email.</Text>
            </View>
            <Switch
              value={emailNews}
              onValueChange={setEmailNews}
              trackColor={{ false: '#E2E8F0', true: COLORS.primary + '80' }}
              thumbColor={emailNews ? COLORS.primary : '#f4f3f4'}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
  },
  backBtn: {
    marginRight: SPACING.md,
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  settingsGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  settingText: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: SPACING.lg,
  },
});
