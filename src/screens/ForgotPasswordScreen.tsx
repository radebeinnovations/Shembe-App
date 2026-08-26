import React, { useState, useEffect, useRef } from 'react';
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

interface ForgotPasswordScreenProps {
  onBackToSignIn: () => void;
  onResetSuccess: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToSignIn,
  onResetSuccess,
}) => {
  // Steps: 'request' | 'otp' | 'new_password' | 'success'
  const [step, setStep] = useState<'request' | 'otp' | 'new_password' | 'success'>('request');

  // Request state
  const [identifier, setIdentifier] = useState('');

  // OTP state
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // New Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Timer for OTP
  useEffect(() => {
    if (step !== 'otp' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Requirements check
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const handleSendRequest = () => {
    if (!identifier) {
      Alert.alert('Required', 'Please enter your mobile number or email address.');
      return;
    }
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    setStep('new_password');
  };

  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Required', 'Please enter and confirm your new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'New password and confirm password do not match.');
      return;
    }
    setStep('success');
  };

  const handleChangeDigit = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);
    if (text.length > 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Step 1: Request Email / Phone */}
      {step === 'request' && (
        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number or email address, and we'll send you instructions to reset your password.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>MOBILE NUMBER OR EMAIL</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="mail-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="e.g. 082 123 4567 or user@example.com"
                placeholderTextColor={COLORS.outline}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSendRequest}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backLink} onPress={onBackToSignIn}>
            <Ionicons name="arrow-back" size={16} color={COLORS.primary} />
            <Text style={styles.backLinkText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 2: Verify OTP */}
      {step === 'otp' && (
        <View style={styles.card}>
          <TouchableOpacity style={styles.stepBackBtn} onPress={() => setStep('request')}>
            <Ionicons name="arrow-back" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.iconCircle}>
            <Ionicons name="mail-open" size={32} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>Verify Your Identity</Text>
          <Text style={styles.subtitle}>We've sent a 6-digit code to your email address.</Text>
          <Text style={styles.emailHighlight}>{identifier || 'user@example.com'}</Text>

          <View style={styles.otpGrid}>
            {digits.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={(ref) => (inputRefs.current[idx] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(t) => handleChangeDigit(t, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleVerifyOtp} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Verify Code</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.resendSection}>
            <Text style={styles.resendText}>Didn't receive the code?</Text>
            <TouchableOpacity onPress={() => setTimeLeft(45)}>
              <Text style={styles.resendBtnText}>
                {timeLeft > 0 ? `Resend Code (00:${timeLeft < 10 ? '0' : ''}${timeLeft})` : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.editEmailBtn} onPress={() => setStep('request')}>
            <Ionicons name="pencil" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={styles.editEmailText}>Change email address</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 3: Create New Password */}
      {step === 'new_password' && (
        <View style={styles.card}>
          <TouchableOpacity style={styles.stepBackBtn} onPress={() => setStep('otp')}>
            <Ionicons name="arrow-back" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.iconCircle}>
            <Ionicons name="key" size={32} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.subtitle}>
            Your new password must be different from previously used passwords to ensure the security of your account.
          </Text>

          {/* New Password */}
          <View style={styles.field}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Enter new password"
                placeholderTextColor={COLORS.outline}
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons
                  name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={COLORS.outline}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements Bento Card */}
          <View style={styles.requirementsCard}>
            <Text style={styles.requirementsTitle}>PASSWORD REQUIREMENTS</Text>
            <View style={styles.requirementsGrid}>
              <View style={styles.reqItem}>
                <Ionicons
                  name={hasMinLength ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasMinLength ? '#3f6653' : COLORS.outline}
                />
                <Text style={styles.reqText}>At least 8 characters</Text>
              </View>

              <View style={styles.reqItem}>
                <Ionicons
                  name={hasNumber ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasNumber ? '#3f6653' : COLORS.outline}
                />
                <Text style={styles.reqText}>Contains a number</Text>
              </View>

              <View style={styles.reqItem}>
                <Ionicons
                  name={hasUppercase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasUppercase ? '#3f6653' : COLORS.outline}
                />
                <Text style={styles.reqText}>Contains an uppercase letter</Text>
              </View>

              <View style={styles.reqItem}>
                <Ionicons
                  name={hasSpecialChar ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasSpecialChar ? '#3f6653' : COLORS.outline}
                />
                <Text style={styles.reqText}>Contains a special character</Text>
              </View>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Confirm new password"
                placeholderTextColor={COLORS.outline}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={COLORS.outline}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleUpdatePassword} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Update Password</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* Step 4: Success */}
      {step === 'success' && (
        <View style={styles.card}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={36} color={COLORS.white} />
          </View>

          <Text style={styles.title}>Password Reset</Text>
          <Text style={styles.subtitle}>
            Your password has been reset successfully. You can now use your new password to access your account.
          </Text>

          <TouchableOpacity style={styles.submitBtn} onPress={onResetSuccess} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
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
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    position: 'relative',
    ...SHADOWS.card,
  },
  stepBackBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  emailHighlight: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: -12,
    marginBottom: SPACING.md,
  },
  field: {
    width: '100%',
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
    height: 48,
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
    fontSize: 14,
  },
  submitBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: SPACING.xs,
    ...SHADOWS.card,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: SPACING.lg,
  },
  backLinkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.md,
    gap: 6,
  },
  otpInput: {
    width: 44,
    height: 50,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  resendSection: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  resendText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  resendBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginVertical: SPACING.md,
  },
  editEmailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editEmailText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  requirementsCard: {
    width: '100%',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginBottom: SPACING.md,
  },
  requirementsTitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  requirementsGrid: {
    gap: 8,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reqText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
});
