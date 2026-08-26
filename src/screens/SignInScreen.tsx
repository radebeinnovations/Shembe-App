import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface SignInScreenProps {
  onSignInSuccess: () => void;
  onNavigateToSignUp: () => void;
  onForgotPassword?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignInSuccess,
  onNavigateToSignUp,
  onForgotPassword,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (!identifier || !password) {
      Alert.alert('Required Fields', 'Please enter your mobile number/email and password.');
      return;
    }
    onSignInSuccess();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.churchIconCircle}>
          <Ionicons name="business" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Welcome back. Enter your details to continue.</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Mobile / Email Input */}
        <View style={styles.field}>
          <Text style={styles.label}>MOBILE NUMBER OR EMAIL</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="person-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
            <TextInput
              style={styles.iconInput}
              placeholder="e.g. +27 82 000 0000"
              placeholderTextColor={COLORS.outline}
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input with Visibility Toggle */}
        <View style={styles.field}>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
            <TextInput
              style={styles.iconInput}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.outline}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.outline}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity
          style={styles.forgotBtn}
          onPress={onForgotPassword || (() => Alert.alert('Reset Password', 'Forgot Password Recovery Flow'))}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Primary Action */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSignIn}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Sign In</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialStack}>
          {/* Google Button */}
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={onSignInSuccess}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-google" size={20} color="#4285F4" />
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={onSignInSuccess}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-apple" size={20} color={COLORS.onSurface} />
            <Text style={styles.socialBtnText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Link */}
        <TouchableOpacity style={styles.signUpLink} onPress={onNavigateToSignUp}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    width: '100%',
    maxWidth: 380,
  },
  churchIconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  title: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 380,
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.card,
  },
  inputIcon: {
    marginRight: 10,
  },
  iconInput: {
    flex: 1,
    height: '100%',
    color: COLORS.onSurface,
    fontSize: 15,
  },
  eyeBtn: {
    padding: 6,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.md,
    paddingVertical: 2,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...SHADOWS.card,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
  },
  dividerText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    paddingHorizontal: SPACING.md,
  },
  socialStack: {
    gap: 10,
    marginBottom: SPACING.lg,
  },
  socialBtn: {
    height: 48,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...SHADOWS.card,
  },
  socialBtnText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  signUpLink: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  signUpText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
