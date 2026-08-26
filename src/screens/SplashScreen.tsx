import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onFinish}
    >
      {/* Upper Content Section */}
      <View style={styles.upperContent}>
        {/* White Card Container for Shembe Portrait */}
        <View style={styles.cardContainer}>
          <Image
            source={require('../../assets/shembe_portrait.png')}
            style={styles.portraitImage}
            resizeMode="cover"
          />
        </View>

        {/* Typography */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>SHEMBE</Text>
          <Text style={styles.subtitle}>FAITH. HERITAGE. COMMUNITY.</Text>
        </View>
      </View>

      {/* Lower Zulu Geometric Pattern Section */}
      <View style={styles.lowerPatternSection}>
        <View style={styles.patternBox}>
          <View style={styles.zuluPatternLine} />
        </View>

        {/* Bouncing Yellow/Gold Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.lg,
  },
  cardContainer: {
    width: 240,
    height: 240,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  portraitImage: {
    width: 190,
    height: 210,
    borderRadius: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  lowerPatternSection: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: COLORS.surfaceContainerLow,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  patternBox: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zuluPatternLine: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondaryContainer,
  },
  dot1: { opacity: 1 },
  dot2: { opacity: 0.7 },
  dot3: { opacity: 0.4 },
});
