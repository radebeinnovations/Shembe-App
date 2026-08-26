import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export const SabbathCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeUntilSabbath = () => {
      const now = new Date();
      const nextSabbath = new Date();
      const currentDay = now.getDay();
      let daysUntilSaturday = (6 - currentDay + 7) % 7;
      if (daysUntilSaturday === 0 && now.getHours() >= 13) {
        daysUntilSaturday = 7;
      }
      nextSabbath.setDate(now.getDate() + daysUntilSaturday);
      nextSabbath.setHours(9, 0, 0, 0);

      const diff = nextSabbath.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeUntilSabbath();
    const interval = setInterval(calculateTimeUntilSabbath, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.liveIndicator}>
          <Ionicons name="time" size={16} color={COLORS.secondaryFixed} />
          <Text style={styles.liveText}>UMHLANGANO WESABATHA</Text>
        </View>
        <Text style={styles.statusBadge}>Umgqibelo 09:00 AM</Text>
      </View>

      <Text style={styles.countdownTitle}>Countdown to Holy Sabbath Service</Text>

      <View style={styles.timerRow}>
        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>{String(timeLeft.days).padStart(2, '0')}</Text>
          <Text style={styles.timeLabel}>Izinsuku</Text>
        </View>
        <Text style={styles.colon}>:</Text>

        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>{String(timeLeft.hours).padStart(2, '0')}</Text>
          <Text style={styles.timeLabel}>Amashora</Text>
        </View>
        <Text style={styles.colon}>:</Text>

        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>{String(timeLeft.minutes).padStart(2, '0')}</Text>
          <Text style={styles.timeLabel}>Imizuzu</Text>
        </View>
        <Text style={styles.colon}>:</Text>

        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>{String(timeLeft.seconds).padStart(2, '0')}</Text>
          <Text style={styles.timeLabel}>Imisekhonda</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    ...SHADOWS.card,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveText: {
    color: COLORS.secondaryFixed,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusBadge: {
    color: COLORS.white,
    fontSize: 11,
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  countdownTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timeBox: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: RADIUS.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 62,
  },
  timeNumber: {
    color: COLORS.secondaryContainer,
    fontSize: 22,
    fontWeight: '800',
  },
  timeLabel: {
    color: COLORS.onPrimaryContainer,
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  colon: {
    color: COLORS.secondaryContainer,
    fontSize: 22,
    fontWeight: '700',
  },
});
