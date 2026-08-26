import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface SignUpScreenProps {
  onSignUpSuccess: () => void;
  onNavigateToSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUpSuccess,
  onNavigateToSignIn,
}) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [church, setChurch] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Modals for selects
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [showChurchModal, setShowChurchModal] = useState(false);

  const provinces = ['KwaZulu-Natal', 'Gauteng', 'Eastern Cape', 'Western Cape'];
  const congregations = ['Ebuhleni', 'Ekuphakameni', 'Ginyezinye', 'Thembezinhle'];

  const handleCreateAccount = () => {
    if (!firstName || !surname || !mobile || !password) {
      Alert.alert('Required Fields', 'Please fill in your first name, surname, mobile number, and password.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and Confirm Password do not match.');
      return;
    }
    onSignUpSuccess();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.churchIconCircle}>
          <Ionicons name="business" size={28} color={COLORS.onPrimaryContainer} />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our community and begin your journey.</Text>
      </View>

      {/* Form Card Container */}
      <View style={styles.formCard}>
        {/* 1. First Name */}
        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            placeholderTextColor={COLORS.outline}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* 2. Surname */}
        <View style={styles.field}>
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter surname"
            placeholderTextColor={COLORS.outline}
            value={surname}
            onChangeText={setSurname}
          />
        </View>

        {/* 3. Mobile Number */}
        <View style={styles.field}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="phone-portrait-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
            <TextInput
              style={styles.iconInput}
              placeholder="Enter mobile number"
              placeholderTextColor={COLORS.outline}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
        </View>

        {/* 4. Email Address */}
        <View style={styles.field}>
          <Text style={styles.label}>Email Address (Optional)</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="mail-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
            <TextInput
              style={styles.iconInput}
              placeholder="Enter email address"
              placeholderTextColor={COLORS.outline}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* 5. Province Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Province</Text>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowProvinceModal(true)}
            activeOpacity={0.8}
          >
            <Text style={province ? styles.selectText : styles.placeholderText}>
              {province || 'Select province'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* 6. City / Town */}
        <View style={styles.field}>
          <Text style={styles.label}>City/Town</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor={COLORS.outline}
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* 7. Nearest Church Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Nearest Church</Text>
          <TouchableOpacity
            style={styles.inputWithIcon}
            onPress={() => setShowChurchModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="business-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
            <Text style={[styles.iconInputText, church ? styles.selectText : styles.placeholderText]}>
              {church || 'Select nearest congregation'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* 8. Password */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
            <TextInput
              style={styles.iconInput}
              placeholder="Create password"
              placeholderTextColor={COLORS.outline}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* 9. Confirm Password */}
        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="refresh-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
            <TextInput
              style={styles.iconInput}
              placeholder="Confirm password"
              placeholderTextColor={COLORS.outline}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        {/* 10. Terms Checkbox */}
        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAgreeTerms(!agreeTerms)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </TouchableOpacity>

        {/* 11. Create Account Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleCreateAccount}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Create Account</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>

        {/* 12. Sign In Link */}
        <TouchableOpacity style={styles.signInLink} onPress={onNavigateToSignIn}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.linkText}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Province Picker Modal */}
      <Modal visible={showProvinceModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowProvinceModal(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Province</Text>
            {provinces.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setProvince(item);
                  setShowProvinceModal(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
                {province === item && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Congregation Picker Modal */}
      <Modal visible={showChurchModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowChurchModal(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Nearest Congregation</Text>
            {congregations.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setChurch(item);
                  setShowChurchModal(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
                {church === item && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingTop: SPACING.lg,
    paddingBottom: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  churchIconCircle: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: SPACING.md,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: SPACING.md,
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
  iconInputText: {
    flex: 1,
    fontSize: 14,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: SPACING.md,
  },
  selectText: {
    color: COLORS.onSurface,
    fontSize: 14,
  },
  placeholderText: {
    color: COLORS.outline,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginVertical: SPACING.sm,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: SPACING.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  submitBtn: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: SPACING.md,
    ...SHADOWS.card,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  signInLink: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  signInText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  optionText: {
    color: COLORS.onSurface,
    fontSize: 14,
  },
});
