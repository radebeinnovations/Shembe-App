import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface WelcomeScreenProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onGuest: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSignIn,
  onSignUp,
  onGuest,
}) => {
  return (
    <View style={styles.container}>
      {/* Background Cultural Zulu Pattern Header */}
      <View style={styles.headerPatternBg} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          {/* Portrait Image in White Elevated Card */}
          <View style={styles.portraitCard}>
            <Image
              source={require('../../assets/shembe_portrait.png')}
              style={styles.portraitImage}
              resizeMode="cover"
            />
          </View>

          {/* Logo & Church Name */}
          <Text style={styles.appTitle}>SHEMBE CHURCH</Text>
          <Text style={styles.appTagline}>COMMUNITY</Text>

          {/* Welcome Greeting */}
          <View style={styles.messageSection}>
            <Text style={styles.welcomeTitle}>Siyakwamukela</Text>
            <Text style={styles.welcomeText}>
              Welcome to our digital congregation. A place for peace, prayer, and community.
            </Text>
          </View>

          {/* Action Buttons Stack */}
          <View style={styles.actionsSection}>
            {/* Primary Ngena / Sign In */}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={onSignIn}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>Ngena / Sign In</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>

            {/* Secondary Dala i-Akhawunti / Create Account */}
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={onSignUp}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryBtnText}>
                Dala i-Akhawunti / Create Account
              </Text>
            </TouchableOpacity>

            {/* Tertiary Qhubeka njengesivakashi / Continue as Guest */}
            <TouchableOpacity
              style={styles.tertiaryBtn}
              onPress={onGuest}
              activeOpacity={0.7}
            >
              <Text style={styles.tertiaryBtnText}>
                Qhubeka njengesivakashi / Continue as Guest
              </Text>
            </TouchableOpacity>
          </View>
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
  headerPatternBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: COLORS.surfaceContainerLow,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  contentCard: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  portraitCard: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  portraitImage: {
    width: 175,
    height: 185,
    borderRadius: 90,
  },
  appTitle: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  appTagline: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    opacity: 0.8,
    marginTop: 2,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  welcomeTitle: {
    color: COLORS.onSurface,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  welcomeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionsSection: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...SHADOWS.card,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.onSurface,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '700',
  },
  tertiaryBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  tertiaryBtnText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
