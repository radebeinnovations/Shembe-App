import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export interface ChurchOption {
  id: string;
  name: string;
  location: string;
  distance: string;
  isHeadquarters?: boolean;
  image: any;
}

const CHURCH_OPTIONS: ChurchOption[] = [
  {
    id: '1',
    name: 'Ebuhleni Main Temple',
    location: 'Inanda, KwaZulu-Natal, South Africa',
    distance: '2.4 km',
    isHeadquarters: true,
    image: require('../../assets/church1_ebuhleni.png'),
  },
  {
    id: '2',
    name: 'Buhleni Branch',
    location: 'Kwamashu, KwaZulu-Natal',
    distance: '8.1 km',
    image: require('../../assets/church2_umlazi.png'),
  },
  {
    id: '3',
    name: 'Umlazi Branch',
    location: 'Umlazi V Section, Durban',
    distance: '5.4 km',
    image: require('../../assets/church2_umlazi.png'),
  },
  {
    id: '4',
    name: 'KwaMashu Temple',
    location: 'KwaMashu, KwaZulu-Natal',
    distance: '8.1 km',
    image: require('../../assets/church3_pietermaritzburg.png'),
  },
  {
    id: '5',
    name: 'General Church Central Fund',
    location: 'Central Synod Fund',
    distance: 'Global',
    image: require('../../assets/onboarding4_pray_give.png'),
  },
];

interface OfferingsScreenProps {
  onBack?: () => void;
}

export const OfferingsScreen: React.FC<OfferingsScreenProps> = ({ onBack }) => {
  // Navigation Flow Steps: 'landing' | 'select_church' | 'amount' | 'payment' | 'review' | 'success'
  const [step, setStep] = useState<'landing' | 'select_church' | 'amount' | 'payment' | 'review' | 'success'>('landing');

  // Selected State
  const [selectedChurch, setSelectedChurch] = useState<ChurchOption>(CHURCH_OPTIONS[0]);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [paymentOption, setPaymentOption] = useState<'saved_card' | 'new_card' | 'eft' | 'mobile'>('saved_card');
  const [receiptData, setReceiptData] = useState<any>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // STEP 1: Give Landing Screen (Option menu)
  if (step === 'landing') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>Nazareth Baptist Church</Text>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('select_church')}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroSection}>
            <View style={styles.giveIconCircle}>
              <Ionicons name="hand-left" size={32} color={COLORS.white} />
            </View>
            <Text style={styles.giveTitle}>Give</Text>
            <Text style={styles.giveSubtitle}>
              Support the work of the church through a contribution to your local or selected church.
            </Text>
          </View>

          <View style={styles.optionsList}>
            {/* Give to My Church */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => {
                setSelectedChurch(CHURCH_OPTIONS[0]);
                setStep('amount');
              }}
              activeOpacity={0.85}
            >
              <View style={styles.optionIconBox}>
                <Ionicons name="business-outline" size={22} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>Give to My Church</Text>
                <Text style={styles.optionSubtitle}>
                  Contribute to your default congregation: Ebuhleni.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>

            {/* Give to Another Church */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setStep('select_church')}
              activeOpacity={0.85}
            >
              <View style={styles.optionIconBox}>
                <Ionicons name="search-outline" size={22} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>Give to Another Church</Text>
                <Text style={styles.optionSubtitle}>
                  Search and select a specific branch to support.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>

            {/* General Church Donation */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => {
                setSelectedChurch(CHURCH_OPTIONS[4]);
                setStep('amount');
              }}
              activeOpacity={0.85}
            >
              <View style={styles.optionIconBox}>
                <Ionicons name="globe-outline" size={22} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>General Church Donation</Text>
                <Text style={styles.optionSubtitle}>
                  Contribute to the central fund for wider church needs.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <View style={styles.secureFooter}>
            <Ionicons name="lock-closed-outline" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={styles.secureText}>Secure Transaction</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // STEP 2: Select Church Screen
  if (step === 'select_church') {
    const filtered = CHURCH_OPTIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('landing')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nazareth Baptist Church</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>Donate</Text>
            <Text style={styles.screenSubtitle}>Select a church or region to support.</Text>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search churches, regions..."
              placeholderTextColor={COLORS.outlineVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.churchList}>
            {filtered.map((church) => (
              <View key={church.id} style={styles.selectChurchCard}>
                <Image source={church.image} style={styles.selectChurchImage} resizeMode="cover" />

                <View style={styles.selectChurchInfo}>
                  <Text style={styles.selectChurchName}>{church.name}</Text>
                  <Text style={styles.selectChurchLoc}>{church.location} • {church.distance}</Text>

                  <TouchableOpacity
                    style={styles.selectActionBtn}
                    onPress={() => {
                      setSelectedChurch(church);
                      setStep('amount');
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.selectActionText}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // STEP 3: Donation Amount Screen (matching image_0.png)
  if (step === 'amount') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('landing')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Give</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Target Church Header Banner */}
          <View style={styles.targetChurchBanner}>
            <Image source={selectedChurch.image} style={styles.bannerImageThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.givingToLabel}>Giving to</Text>
              <Text style={styles.givingToChurchName}>{selectedChurch.name}</Text>
            </View>
          </View>

          {/* Inspirational Verse */}
          <Text style={styles.verseQuote}>
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </Text>

          {/* Select Amount Title */}
          <Text style={styles.stepSectionTitle}>Select Amount</Text>

          {/* Amount Grid (R50, R100, R250, R500, R1,000, R Other) */}
          <View style={styles.amountGrid}>
            {[50, 100, 250, 500, 1000].map((amt) => {
              const isSelected = selectedAmount === amt && !customAmount;
              return (
                <TouchableOpacity
                  key={amt}
                  style={[styles.gridAmtBtn, isSelected && styles.selectedGridAmtBtn]}
                  onPress={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.gridAmtText, isSelected && styles.selectedGridAmtText]}>
                    R{amt.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Custom Amount Field */}
            <View style={[styles.gridCustomWrapper, customAmount.length > 0 && styles.selectedGridAmtBtn]}>
              <Text style={[styles.customPrefix, customAmount.length > 0 && styles.selectedGridAmtText]}>R</Text>
              <TextInput
                style={[styles.customInputText, customAmount.length > 0 && styles.selectedGridAmtText]}
                placeholder="Other"
                placeholderTextColor={COLORS.outlineVariant}
                keyboardType="numeric"
                value={customAmount}
                onChangeText={setCustomAmount}
              />
            </View>
          </View>

          {/* Recurring Donation Switch Card */}
          <View style={styles.recurringCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.recurringTitle}>Make this a recurring donation</Text>
              <Text style={styles.recurringSubtitle}>Support the church consistently</Text>
            </View>
            <Switch
              value={isRecurring}
              onValueChange={setIsRecurring}
              trackColor={{ false: COLORS.surfaceContainerHigh, true: COLORS.primaryContainer }}
              thumbColor={COLORS.white}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => {
              if (finalAmount <= 0) {
                Alert.alert('Invalid Amount', 'Please select or enter a valid donation amount.');
                return;
              }
              setStep('payment');
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // STEP 4: Donation Payment Method Screen (matching image_1.png)
  if (step === 'payment') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('amount')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Method</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Encrypted Banner */}
          <View style={styles.encryptedBanner}>
            <Ionicons name="lock-closed" size={16} color={COLORS.primary} />
            <Text style={styles.encryptedText}>Secure, encrypted transaction</Text>
          </View>

          <Text style={styles.stepSectionTitle}>Select a payment option for your giving:</Text>

          {/* Payment Method Radio Cards */}
          <View style={styles.methodsGroup}>
            {/* Visa Card ending in 4321 */}
            <TouchableOpacity
              style={[styles.radioCard, paymentOption === 'saved_card' && styles.selectedRadioCard]}
              onPress={() => setPaymentOption('saved_card')}
              activeOpacity={0.8}
            >
              <View style={styles.radioOutline}>
                {paymentOption === 'saved_card' && <View style={styles.radioDot} />}
              </View>
              <View style={styles.visaBadge}>
                <Text style={styles.visaBadgeText}>VISA</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.radioCardTitle}>Visa ending in 4321</Text>
                <Text style={styles.radioCardSubtitle}>EXPIRES 12/25</Text>
              </View>
            </TouchableOpacity>

            {/* New Credit/Debit Card */}
            <TouchableOpacity
              style={[styles.radioCard, paymentOption === 'new_card' && styles.selectedRadioCard]}
              onPress={() => setPaymentOption('new_card')}
              activeOpacity={0.8}
            >
              <View style={styles.radioOutline}>
                {paymentOption === 'new_card' && <View style={styles.radioDot} />}
              </View>
              <Ionicons name="card-outline" size={20} color={COLORS.primary} />
              <Text style={styles.radioCardTitle}>New Credit/Debit Card</Text>
            </TouchableOpacity>

            {/* Instant EFT */}
            <TouchableOpacity
              style={[styles.radioCard, paymentOption === 'eft' && styles.selectedRadioCard]}
              onPress={() => setPaymentOption('eft')}
              activeOpacity={0.8}
            >
              <View style={styles.radioOutline}>
                {paymentOption === 'eft' && <View style={styles.radioDot} />}
              </View>
              <Ionicons name="business-outline" size={20} color={COLORS.primary} />
              <Text style={styles.radioCardTitle}>Instant EFT</Text>
            </TouchableOpacity>

            {/* Mobile Money */}
            <TouchableOpacity
              style={[styles.radioCard, paymentOption === 'mobile' && styles.selectedRadioCard]}
              onPress={() => setPaymentOption('mobile')}
              activeOpacity={0.8}
            >
              <View style={styles.radioOutline}>
                {paymentOption === 'mobile' && <View style={styles.radioDot} />}
              </View>
              <Ionicons name="phone-portrait-outline" size={20} color={COLORS.primary} />
              <Text style={styles.radioCardTitle}>Mobile Money</Text>
            </TouchableOpacity>
          </View>

          {/* Inspirational Image Quote Card */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteCardText}>"God loves a cheerful giver."</Text>
          </View>

          {/* Continue to Review CTA */}
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => setStep('review')}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Continue to Review</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // STEP 5: Donation Review Screen (matching image_2.png)
  if (step === 'review') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('payment')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Review Card */}
          <View style={styles.reviewCard}>
            <Text style={styles.reviewSubhead}>YOU ARE DONATING TO</Text>
            <Text style={styles.reviewChurchTitle}>{selectedChurch.name}</Text>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Donation Type</Text>
              <Text style={styles.reviewValue}>{isRecurring ? 'Monthly Recurring' : 'One-time'}</Text>
            </View>

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Amount</Text>
              <Text style={styles.reviewValue}>R{finalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Payment Method</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="card" size={16} color={COLORS.primary} />
                <Text style={styles.reviewValue}>•••• 4321</Text>
              </View>
            </View>

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Processing Fee</Text>
              <Text style={styles.reviewValue}>R0.00 <Text style={styles.feeSub}>(Covered by church)</Text></Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R{finalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Confirm Donation Button */}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              const receipt = {
                referenceNo: `#DON-${Math.floor(10000 + Math.random() * 90000)}B`,
                church: selectedChurch.name,
                amount: finalAmount,
                date: new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              };
              setReceiptData(receipt);
              setStep('success');
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>Confirm Donation</Text>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.secureFooter}>
            <Ionicons name="lock-closed-outline" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={styles.secureText}>Your donation is handled with reverence and secure encryption.</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // STEP 6: Donation Successful Screen (matching image_3.png)
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.successHeader}>
          <View style={styles.successBadgeCircle}>
            <Ionicons name="hand-left" size={36} color={COLORS.primary} />
          </View>
          <Text style={styles.successTitle}>Donation Successful</Text>
          <Text style={styles.successSubtitle}>May your offering be blessed.</Text>
        </View>

        {receiptData && (
          <View style={styles.successTableCard}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>CHURCH</Text>
              <Text style={styles.tableValBold} numberOfLines={1}>{receiptData.church}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>AMOUNT</Text>
              <Text style={styles.tableAmountVal}>R{receiptData.amount}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>DATE</Text>
              <Text style={styles.tableVal}>{receiptData.date}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>TRANSACTION REF</Text>
              <Text style={styles.tableValMono}>{receiptData.referenceNo}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>STATUS</Text>
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={12} color={COLORS.white} />
                <Text style={styles.completedText}>COMPLETED</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.successActions}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => setStep('landing')}
            activeOpacity={0.85}
          >
            <Text style={styles.doneBtnText}>DONE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewReceiptBtn}
            onPress={() =>
              Alert.alert(
                'Official Receipt 🧾',
                `Nazareth Baptist Church\nRef: ${receiptData?.referenceNo}\nAmount: R${receiptData?.amount}\nDate: ${receiptData?.date}\nStatus: Verified Completed`
              )
            }
            activeOpacity={0.85}
          >
            <Ionicons name="receipt-outline" size={18} color={COLORS.onSurface} />
            <Text style={styles.viewReceiptText}>VIEW RECEIPT</Text>
          </TouchableOpacity>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: 8,
  },
  giveIconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...SHADOWS.card,
  },
  giveTitle: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: '900',
  },
  giveSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.md,
  },
  optionsList: {
    gap: 12,
    marginTop: SPACING.xs,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 14,
    ...SHADOWS.card,
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  optionSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
  secureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  secureText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 46,
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
  churchList: {
    gap: 12,
    marginTop: SPACING.xs,
  },
  selectChurchCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  selectChurchImage: {
    width: '100%',
    height: 120,
  },
  selectChurchInfo: {
    padding: SPACING.md,
    gap: 4,
  },
  selectChurchName: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  selectChurchLoc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  selectActionBtn: {
    backgroundColor: COLORS.primary,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  selectActionText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  targetChurchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  bannerImageThumb: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
  },
  givingToLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '600',
  },
  givingToChurchName: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  verseQuote: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.sm,
    marginVertical: 4,
  },
  stepSectionTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridAmtBtn: {
    width: '31%',
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGridAmtBtn: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  gridAmtText: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '800',
  },
  selectedGridAmtText: {
    color: COLORS.white,
  },
  gridCustomWrapper: {
    width: '31%',
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  customPrefix: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '800',
    marginRight: 4,
  },
  customInputText: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  recurringCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    marginTop: 6,
    ...SHADOWS.card,
  },
  recurringTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '800',
  },
  recurringSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
  continueBtn: {
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
  continueBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  encryptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceContainerLow,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    marginBottom: 6,
  },
  encryptedText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  methodsGroup: {
    gap: 12,
    marginTop: 6,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  selectedRadioCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  visaBadge: {
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  visaBadgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '900',
  },
  radioCardTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '700',
  },
  radioCardSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },
  quoteCard: {
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: 6,
  },
  quoteCardText: {
    color: COLORS.primary,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  reviewSubhead: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  reviewChurchTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
    marginVertical: 4,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  reviewValue: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  feeSub: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '400',
  },
  totalLabel: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: '900',
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  confirmBtn: {
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
  confirmBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  successHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: 8,
  },
  successBadgeCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...SHADOWS.card,
  },
  successTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  successSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  successTableCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 14,
    ...SHADOWS.card,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  tableValBold: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '800',
  },
  tableAmountVal: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  tableVal: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  tableValMono: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Platform',
  },
  completedBadge: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  successActions: {
    gap: 12,
    marginTop: SPACING.md,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  doneBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  viewReceiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceContainerLowest,
    height: 50,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  viewReceiptText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
