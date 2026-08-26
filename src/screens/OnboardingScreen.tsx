import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface OnboardingScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onNext,
  onSkip,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Find Your Church',
      badge: 'Nearby',
      description:
        'Discover Shembe congregations and holy sites close to you. Begin your spiritual journey with your local community.',
      image: require('../../assets/church_illustration.png'),
      hasLocationPin: true,
      buttonText: 'NEXT',
    },
    {
      title: 'Worship Anywhere',
      badge: '',
      description:
        'Access Shembe hymns, recordings, sermons and spiritual content wherever you are.',
      image: require('../../assets/onboarding2_worship.png'),
      hasLocationPin: false,
      buttonText: 'NEXT',
    },
    {
      title: 'Stay Connected',
      badge: '',
      description:
        'Stay connected to your church through services, events, announcements and notifications.',
      image: require('../../assets/onboarding3_connected.png'),
      hasLocationPin: false,
      buttonText: 'NEXT',
    },
    {
      title: 'Pray, Give & Support',
      badge: '',
      description:
        'Submit prayer requests, book prayer sessions, support community fundraisers and give to your church.',
      image: require('../../assets/onboarding4_pray_give.png'),
      hasLocationPin: false,
      buttonText: 'Get Started',
    },
  ];

  const current = steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      {/* Pattern Header Overlay */}
      <View style={styles.patternHeader} />

      {/* Top Skip Button */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.topSkipBtn} onPress={onSkip} activeOpacity={0.7}>
          <Text style={styles.topSkipText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Hero Card Container */}
        <View style={styles.illustrationCard}>
          <View style={styles.imageWrapper}>
            <Image
              source={current.image}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
            {current.hasLocationPin && (
              <View style={styles.locationPinCircle}>
                <Ionicons name="location" size={22} color={COLORS.white} />
              </View>
            )}
          </View>

          {/* Text Info */}
          <View style={styles.cardBody}>
            {!!current.badge && (
              <View style={styles.badgeRow}>
                <Ionicons name="navigate" size={12} color={COLORS.onPrimaryContainer} />
                <Text style={styles.badgeText}>{current.badge}</Text>
              </View>
            )}

            <Text style={styles.cardTitle}>{current.title}</Text>
            <Text style={styles.cardDescription}>{current.description}</Text>
          </View>
        </View>

        {/* Progress Indicator Bars */}
        <View style={styles.indicatorsRow}>
          {steps.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.indicatorBar,
                idx === activeStep ? styles.activeIndicatorBar : styles.inactiveIndicatorBar,
              ]}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Control Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, isLastStep && styles.fullWidthNextBtn]}
          onPress={handleNextStep}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>{current.buttonText}</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>

        {!isLastStep && (
          <TouchableOpacity style={styles.skipBtn} onPress={onSkip} activeOpacity={0.7}>
            <Text style={styles.skipBtnText}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  patternHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: COLORS.surfaceContainerLow,
    opacity: 0.6,
  },
  topBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    zIndex: 10,
  },
  topSkipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  topSkipText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  illustrationCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  imageWrapper: {
    width: '100%',
    height: 260,
    backgroundColor: COLORS.surfaceContainerLow,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  locationPinCircle: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  cardBody: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  badgeText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  cardDescription: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  indicatorsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 240,
    marginVertical: SPACING.sm,
  },
  indicatorBar: {
    height: 6,
    borderRadius: RADIUS.full,
    flex: 1,
  },
  activeIndicatorBar: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.card,
  },
  inactiveIndicatorBar: {
    backgroundColor: COLORS.surfaceVariant,
  },
  footer: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: COLORS.surface,
    gap: 8,
  },
  nextBtn: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    ...SHADOWS.card,
  },
  fullWidthNextBtn: {
    backgroundColor: COLORS.primary,
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  skipBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
  },
  skipBtnText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
