import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

interface CreateFundraiserScreenProps {
  onClose: () => void;
  onViewMyFundraisers: () => void;
}

export const CreateFundraiserScreen: React.FC<CreateFundraiserScreenProps> = ({
  onClose,
  onViewMyFundraisers,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [contact, setContact] = useState('');
  const [church, setChurch] = useState('');
  const [hasUploadedDoc, setHasUploadedDoc] = useState(false);
  const [coverPhotoSelected, setCoverPhotoSelected] = useState(true);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !targetAmount.trim() || !beneficiary.trim()) {
      Alert.alert('Required Fields', 'Please fill in all required fundraiser details.');
      return;
    }

    setIsSubmitted(true);
  };

  // STEP 2: Submission Confirmation Screen (matching image_3.png)
  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successBadgeCircle}>
            <Ionicons name="checkmark-circle-outline" size={48} color={COLORS.primary} />
          </View>

          <Text style={styles.successTitle}>Fundraiser Submitted</Text>

          <View style={styles.pendingBadge}>
            <Ionicons name="hourglass-outline" size={12} color={COLORS.white} />
            <Text style={styles.pendingBadgeText}>Pending Review</Text>
          </View>

          <Text style={styles.successBodyText}>
            Your fundraiser has been submitted to the review team. It will become visible to the community once approved.
          </Text>

          <View style={styles.successActions}>
            <TouchableOpacity
              style={styles.viewMyFundraisersBtn}
              onPress={onViewMyFundraisers}
              activeOpacity={0.85}
            >
              <Ionicons name="megaphone-outline" size={18} color={COLORS.white} />
              <Text style={styles.viewMyFundraisersText}>View My Fundraisers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToCommunityBtn}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={styles.backToCommunityText}>Back to Community Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // STEP 1: Create Fundraiser Form (matching image_1.png & image_2.png)
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Nazareth Baptist Church</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Create Fundraiser</Text>
          <Text style={styles.screenSubtitle}>
            Gather support from the community for a worthy cause.
          </Text>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoBannerText}>
            Fundraisers are reviewed before publication to ensure alignment with community values.
          </Text>
        </View>

        {/* 1. Fundraiser Title */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Fundraiser Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Medical Support for Baba Dlamini"
            placeholderTextColor={COLORS.outlineVariant}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* 2. Description */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the cause and how the funds will be used..."
            placeholderTextColor={COLORS.outlineVariant}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* 3. Category */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Category</Text>
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() =>
              Alert.alert('Select Category', 'Choose a category', [
                { text: 'Medical', onPress: () => setCategory('Medical') },
                { text: 'Education', onPress: () => setCategory('Education') },
                { text: 'Crisis Support', onPress: () => setCategory('Crisis Support') },
                { text: 'Community Project', onPress: () => setCategory('Community Project') },
              ])
            }
          >
            <Text style={[styles.selectBtnText, !category && { color: COLORS.outlineVariant }]}>
              {category || 'Select a category'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* 4. Target Amount */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Target Amount</Text>
          <View style={styles.amountInputWrapper}>
            <Text style={styles.currencyPrefix}>R</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={COLORS.outlineVariant}
              value={targetAmount}
              onChangeText={setTargetAmount}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* 5. Beneficiary Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Beneficiary Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of person or group"
            placeholderTextColor={COLORS.outlineVariant}
            value={beneficiary}
            onChangeText={setBeneficiary}
          />
        </View>

        {/* 6. Contact Number */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 082 123 4567"
            placeholderTextColor={COLORS.outlineVariant}
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        {/* 7. Preferred Church */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Preferred Church</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.outlineVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search or select church..."
              placeholderTextColor={COLORS.outlineVariant}
              value={church}
              onChangeText={setChurch}
            />
          </View>
        </View>

        {/* 8. Supporting Documents Box */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Supporting Documents</Text>
          <Text style={styles.fieldHelpText}>Upload quotes, letters, or proof of need.</Text>

          <TouchableOpacity
            style={[styles.uploadBox, hasUploadedDoc && styles.uploadBoxDone]}
            onPress={() => {
              setHasUploadedDoc(true);
              Alert.alert('Document Uploaded 📄', 'Medical_Quote.pdf attached successfully.');
            }}
          >
            <Ionicons
              name={hasUploadedDoc ? 'checkmark-circle' : 'cloud-upload-outline'}
              size={32}
              color={hasUploadedDoc ? COLORS.primaryContainer : COLORS.onSurfaceVariant}
            />
            <Text style={styles.uploadTitle}>
              {hasUploadedDoc ? 'Medical_Quote.pdf Attached' : 'Tap to upload documents'}
            </Text>
            <Text style={styles.uploadSubtitle}>PDF, DOC, JPG up to 5MB</Text>
          </TouchableOpacity>
        </View>

        {/* 9. Cover Images */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Cover Images</Text>
          <Text style={styles.fieldHelpText}>Add images to help tell your story.</Text>

          <View style={styles.imagesGrid}>
            <TouchableOpacity
              style={styles.addPhotoSquare}
              onPress={() => Alert.alert('Add Photo', 'Select image from device gallery.')}
            >
              <Ionicons name="add" size={24} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>

            {coverPhotoSelected && (
              <View style={styles.photoSquare}>
                <Image
                  source={require('../../assets/sipho_profile.png')}
                  style={styles.photoImage}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        </View>

        {/* Submit for Review CTA */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Submit for Review</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 60,
    backgroundColor: COLORS.surfaceContainerLowest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: 40,
  },
  titleSection: {
    gap: 4,
  },
  screenTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  screenSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  infoBannerText: {
    color: COLORS.onSurface,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  fieldHelpText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    color: COLORS.onSurface,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  selectBtn: {
    height: 48,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  selectBtnText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  currencyPrefix: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  uploadBox: {
    height: 120,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  uploadBoxDone: {
    borderColor: COLORS.primaryContainer,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  uploadTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  uploadSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  imagesGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  addPhotoSquare: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoSquare: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: RADIUS.full,
    marginTop: SPACING.md,
    ...SHADOWS.card,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  successBadgeCircle: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...SHADOWS.card,
  },
  successTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  pendingBadge: {
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pendingBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  successBodyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
  },
  successActions: {
    width: '100%',
    gap: 12,
    marginTop: SPACING.md,
  },
  viewMyFundraisersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADIUS.full,
    ...SHADOWS.card,
  },
  viewMyFundraisersText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  backToCommunityBtn: {
    backgroundColor: COLORS.surfaceContainerLowest,
    height: 50,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  backToCommunityText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
});
