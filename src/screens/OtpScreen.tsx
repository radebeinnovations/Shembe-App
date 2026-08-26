import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface OtpScreenProps {
  phoneNumber?: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({
  phoneNumber = '+27 82 555 0192',
  onVerifySuccess,
  onBack,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChangeDigit = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    // Auto advance to next box
    if (text.length > 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    onVerifySuccess();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Main Content Card */}
      <View style={styles.card}>
        <View style={styles.lockIconCircle}>
          <Ionicons name="lock-closed" size={32} color={COLORS.onPrimaryContainer} />
        </View>

        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{'\n'}
          <Text style={styles.phoneText}>{phoneNumber}</Text>
        </Text>

        {/* 6 Digit Inputs */}
        <View style={styles.otpGrid}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeDigit(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Verify Now Button */}
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleVerify}
          activeOpacity={0.85}
        >
          <Text style={styles.verifyBtnText}>Verify Now</Text>
        </TouchableOpacity>

        {/* Resend & Change Phone */}
        <View style={styles.footerSection}>
          <Text style={styles.resendText}>
            Didn't receive a code?{' '}
            <Text style={styles.resendBtnText}>
              {timeLeft > 0
                ? `Resend in 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`
                : 'Resend Code'}
            </Text>
          </Text>

          <TouchableOpacity onPress={onBack} style={styles.changePhoneBtn}>
            <Text style={styles.changePhoneText}>Change phone number</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: SPACING.md,
    paddingBottom: 60,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
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
    ...SHADOWS.card,
  },
  lockIconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  phoneText: {
    color: COLORS.onSurface,
    fontWeight: '700',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.lg,
    gap: 6,
  },
  otpInput: {
    width: 46,
    height: 54,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    ...SHADOWS.card,
  },
  verifyBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  verifyBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  resendText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  resendBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  changePhoneBtn: {
    marginTop: 10,
  },
  changePhoneText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
});
