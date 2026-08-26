import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

export interface PrayerItem {
  id: string;
  title: string;
  details: string;
  category: string;
  dateSubmitted: string;
  location: string;
  status: 'Being Prayed For' | 'Received' | 'Answered' | 'Archived';
  privacy: 'Private' | 'Prayer Team' | 'Community';
}

const INITIAL_PRAYERS: PrayerItem[] = [
  {
    id: 'p1',
    title: 'Guidance for upcoming family decisions',
    details: 'Seeking clarity and peace as we consider relocating for work. Praying that the Lord\'s will be evident in our choices and that He provides a path that honors Him.',
    category: 'Guidance',
    dateSubmitted: 'Oct 12, 2023',
    location: 'Ebuhleni',
    status: 'Being Prayed For',
    privacy: 'Private',
  },
  {
    id: 'p2',
    title: 'Healing for Aunt Maria',
    details: 'She is undergoing surgery next week. Asking for the congregation to lift her up for a safe procedure and swift recovery.',
    category: 'Healing',
    dateSubmitted: 'Oct 10, 2023',
    location: 'Judea',
    status: 'Received',
    privacy: 'Prayer Team',
  },
];

const PRAYER_TYPES = [
  {
    id: 'personal',
    title: 'Personal Prayer',
    subtitle: 'Individual devotion and spiritual connection.',
    iconName: 'person',
  },
  {
    id: 'family',
    title: 'Family Prayer',
    subtitle: 'United intercession for loved ones and household peace.',
    iconName: 'group',
  },
  {
    id: 'thanksgiving',
    title: 'Thanksgiving',
    subtitle: 'Expressing gratitude for blessings and grace received.',
    iconName: 'favorite',
  },
  {
    id: 'guidance',
    title: 'Guidance',
    subtitle: 'Seeking direction and wisdom for life\'s journey.',
    iconName: 'explore',
  },
  {
    id: 'healing',
    title: 'Healing',
    subtitle: 'Prayers for physical, emotional, and spiritual restoration.',
    iconName: 'healing',
  },
  {
    id: 'other',
    title: 'Other',
    subtitle: 'Specific requests or general communion.',
    iconName: 'more-horiz',
  },
];

interface PrayerScreenProps {
  onNavigate?: (screen: string) => void;
}

export const PrayerScreen: React.FC<PrayerScreenProps> = () => {
  // Navigation Steps: 'dashboard' | 'step1_church' | 'step2_type' | 'step3_date' | 'step4_time' | 'step5_details' | 'step6_review' | 'submitted'
  const [step, setStep] = useState<
    | 'dashboard'
    | 'step1_church'
    | 'step2_type'
    | 'step3_date'
    | 'step4_time'
    | 'step5_details'
    | 'step6_review'
    | 'submitted'
  >('dashboard');

  const [activeTab, setActiveTab] = useState<'Active' | 'Completed' | 'Archived'>('Active');
  const [prayersList, setPrayersList] = useState<PrayerItem[]>(INITIAL_PRAYERS);

  // Wizard Selections
  const [selectedChurch, setSelectedChurch] = useState('Ebuhleni Main Temple');
  const [selectedChurchLocation, setSelectedChurchLocation] = useState('Inanda, KwaZulu-Natal');
  const [selectedType, setSelectedType] = useState('Personal Prayer');
  const [selectedDateDay, setSelectedDateDay] = useState(15); // Oct 15
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00');

  // Step 5 Form Fields
  const [fullName, setFullName] = useState('Sipho Ndlovu');
  const [contactNumber, setContactNumber] = useState('082 123 4567');
  const [prayerDetails, setPrayerDetails] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  // Search in Church selection
  const [churchSearch, setChurchSearch] = useState('');

  const churchesForBooking = [
    {
      id: '1',
      name: 'Ebuhleni Main Temple',
      location: 'Inanda, KwaZulu-Natal',
      distance: '1.2 km',
      badge: 'Official',
      availability: 'Prayer Available Now',
    },
    {
      id: '2',
      name: 'Umlazi Branch',
      location: 'Umlazi V Section, Durban',
      distance: '5.4 km',
      badge: 'Community',
      availability: 'Available Tomorrow',
    },
    {
      id: '3',
      name: 'KwaMashu Temple',
      location: 'KwaMashu, KwaZulu-Natal',
      distance: '8.1 km',
      badge: 'Official',
      availability: 'Prayer Available Now',
    },
  ];

  const handleConfirmBooking = () => {
    const newPrayer: PrayerItem = {
      id: Date.now().toString(),
      title: `${selectedType} for ${fullName}`,
      details: prayerDetails || `${selectedType} booking at ${selectedChurch}.`,
      category: selectedType.replace(' Prayer', ''),
      dateSubmitted: `Oct ${selectedDateDay}, 2023`,
      location: selectedChurch.split(' ')[0],
      status: 'Being Prayed For',
      privacy: isPrivate ? 'Private' : 'Community',
    };

    setPrayersList((prev) => [newPrayer, ...prev]);
    setStep('submitted');
  };

  // DASHBOARD: My Prayers (Home view for Prayer tab)
  if (step === 'dashboard') {
    const filtered = prayersList.filter((p) => {
      if (activeTab === 'Active') return p.status === 'Being Prayed For' || p.status === 'Received';
      if (activeTab === 'Completed') return p.status === 'Answered';
      if (activeTab === 'Archived') return p.status === 'Archived';
      return true;
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nazareth Baptist Church</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>My Prayers</Text>
            <Text style={styles.screenSubtitle}>A record of your spiritual requests and their journey.</Text>
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabsRow}>
            {(['Active', 'Completed', 'Archived'] as const).map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabItem, isSelected && styles.activeTabItem]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, isSelected && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Prayer Cards */}
          <View style={styles.prayersList}>
            {filtered.map((item) => (
              <View key={item.id} style={styles.prayerCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={[styles.statusBadge, item.status === 'Being Prayed For' && styles.prayedBadge]}>
                    <Ionicons name="sparkles" size={12} color={COLORS.white} />
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>
                </View>

                <Text style={styles.cardDetails} numberOfLines={3}>
                  {item.details}
                </Text>

                <View style={styles.cardMetaRow}>
                  <Text style={styles.metaSub}>Submitted: {item.dateSubmitted}</Text>
                  <Text style={styles.metaSub}>Location: 📍 {item.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() => setStep('step1_church')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.fabText}>Book / Request Prayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // STEP 1: Select Church for Prayer Booking
  if (step === 'step1_church') {
    const filteredChurches = churchesForBooking.filter(
      (c) =>
        c.name.toLowerCase().includes(churchSearch.toLowerCase()) ||
        c.location.toLowerCase().includes(churchSearch.toLowerCase())
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('dashboard')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Church</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>Select Church</Text>
            <Text style={styles.screenSubtitle}>Find a nearby congregation for your prayer booking.</Text>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.outlineVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or location"
              placeholderTextColor={COLORS.outlineVariant}
              value={churchSearch}
              onChangeText={setChurchSearch}
            />
          </View>

          <View style={styles.churchList}>
            {filteredChurches.map((c) => (
              <View key={c.id} style={styles.bookingChurchCard}>
                <View style={styles.bookingCardHeader}>
                  <Text style={styles.bookingChurchName}>{c.name}</Text>
                  <View style={styles.officialBadge}>
                    <Text style={styles.officialBadgeText}>{c.badge}</Text>
                  </View>
                </View>

                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color={COLORS.onSurfaceVariant} />
                  <Text style={styles.bookingChurchLoc}>{c.location}</Text>
                  <Text style={styles.distText}>{c.distance}</Text>
                </View>

                <View style={styles.availabilityRow}>
                  <Ionicons name="hand-left-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.availabilityText}>{c.availability}</Text>

                  <TouchableOpacity
                    style={styles.selectBtn}
                    onPress={() => {
                      setSelectedChurch(c.name);
                      setSelectedChurchLocation(c.location);
                      setStep('step2_type');
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.selectBtnText}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // STEP 2: Select Prayer Type (matching image_0.png)
  if (step === 'step2_type') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('step1_church')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Prayer Type</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>Select Prayer Type</Text>
            <Text style={styles.screenSubtitle}>
              Choose the focus for your prayer session to help us guide your experience.
            </Text>
          </View>

          <View style={styles.typesGrid}>
            {PRAYER_TYPES.map((type) => {
              const isSelected = selectedType === type.title;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeCard, isSelected && styles.selectedTypeCard]}
                  onPress={() => setSelectedType(type.title)}
                  activeOpacity={0.85}
                >
                  <View style={styles.typeTopRow}>
                    <View style={[styles.typeIconCircle, isSelected && styles.selectedTypeIconCircle]}>
                      {type.id === 'personal' && <Ionicons name="person" size={20} color={isSelected ? COLORS.white : COLORS.primary} />}
                      {type.id === 'family' && <Ionicons name="people" size={20} color={isSelected ? COLORS.white : COLORS.primary} />}
                      {type.id === 'thanksgiving' && <Ionicons name="heart" size={20} color={isSelected ? COLORS.white : COLORS.primary} />}
                      {type.id === 'guidance' && <Ionicons name="compass" size={20} color={isSelected ? COLORS.white : COLORS.primary} />}
                      {type.id === 'healing' && <MaterialCommunityIcons name="bandage" size={20} color={isSelected ? COLORS.white : COLORS.primary} />}
                      {type.id === 'other' && <Ionicons name="ellipsis-horizontal" size={20} color={isSelected ? COLORS.white : COLORS.primary} />}
                    </View>

                    <View style={[styles.radioOuterCircle, isSelected && styles.radioOuterSelected]}>
                      {isSelected && <View style={styles.radioInnerDot} />}
                    </View>
                  </View>

                  <View style={styles.typeTextGroup}>
                    <Text style={[styles.typeTitle, isSelected && styles.selectedTypeTitle]}>{type.title}</Text>
                    <Text style={styles.typeSubtitle}>{type.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Continue CTA Bar */}
        <View style={styles.bottomCtaBar}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => setStep('step3_date')}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // STEP 3: Select Date (matching image_1.png)
  if (step === 'step3_date') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('step2_type')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Date</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>When would you like to pray?</Text>
            <Text style={styles.screenSubtitle}>Select an available date for your session.</Text>
          </View>

          {/* Interactive Calendar Card */}
          <View style={styles.calendarCard}>
            <View style={styles.monthHeaderRow}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={20} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
              <Text style={styles.monthTitle}>October 2023</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            {/* Days of Week Header */}
            <View style={styles.weekHeaderRow}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <Text key={d} style={styles.weekHeaderCell}>{d}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarDaysGrid}>
              <View style={styles.emptyDayCell} />
              <View style={styles.emptyDayCell} />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <View key={num} style={styles.disabledDayCell}>
                  <Text style={styles.disabledDayText}>{num}</Text>
                </View>
              ))}
              {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((num) => {
                const isSelected = selectedDateDay === num;
                const isUnavailable = num === 22;
                return (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.dayCell,
                      isSelected && styles.selectedDayCell,
                      isUnavailable && styles.unavailableDayCell,
                    ]}
                    disabled={isUnavailable}
                    onPress={() => setSelectedDateDay(num)}
                  >
                    <Text
                      style={[
                        styles.dayCellText,
                        isSelected && styles.selectedDayCellText,
                        isUnavailable && styles.unavailableDayCellText,
                      ]}
                    >
                      {num}
                    </Text>
                    {isUnavailable && <View style={styles.dotUnavailable} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Calendar Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.legendText}>Selected</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.surfaceVariant }]} />
                <Text style={styles.legendText}>Available</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
                <Text style={styles.legendText}>Unavailable</Text>
              </View>
            </View>
          </View>

          {/* Selected Date Summary Box */}
          <View style={styles.selectedDateSummaryBox}>
            <View style={styles.calendarIconCircle}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.selectedDateLabel}>SELECTED DATE</Text>
              <Text style={styles.selectedDateValue}>Tuesday, Oct {selectedDateDay}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomCtaBar}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => setStep('step4_time')}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Next</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // STEP 4: Select Time (matching image_2.png)
  if (step === 'step4_time') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('step3_date')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Time</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>Choose Appointment</Text>
            <Text style={styles.screenSubtitle}>Select an available time slot for your prayer session.</Text>
          </View>

          {/* Date Chips Row */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionGroupLabel}>DATE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateChipsScroll}>
              {[
                { day: 'MON', date: 12 },
                { day: 'TUE', date: 13 },
                { day: 'WED', date: 14 },
                { day: 'THU', date: 15 },
              ].map((d) => {
                const isSelected = selectedDateDay === d.date;
                return (
                  <TouchableOpacity
                    key={d.date}
                    style={[styles.dateChip, isSelected && styles.selectedDateChip]}
                    onPress={() => setSelectedDateDay(d.date)}
                  >
                    <Text style={[styles.dateChipDay, isSelected && styles.selectedDateChipText]}>{d.day}</Text>
                    <Text style={[styles.dateChipNum, isSelected && styles.selectedDateChipText]}>{d.date}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Morning Slots */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionGroupLabel}>MORNING</Text>
            <View style={styles.timeGrid}>
              {['09:00', '09:30', '10:00', '10:30', '11:00'].map((time) => {
                const isBooked = time === '10:30';
                const isSelected = selectedTimeSlot === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeChip,
                      isSelected && styles.selectedTimeChip,
                      isBooked && styles.bookedTimeChip,
                    ]}
                    disabled={isBooked}
                    onPress={() => setSelectedTimeSlot(time)}
                  >
                    <Text
                      style={[
                        styles.timeChipText,
                        isSelected && styles.selectedTimeChipText,
                        isBooked && styles.bookedTimeChipText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Afternoon Slots */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionGroupLabel}>AFTERNOON</Text>
            <View style={styles.timeGrid}>
              {['13:00', '14:00', '15:00', '16:00'].map((time) => {
                const isBooked = time === '16:00';
                const isSelected = selectedTimeSlot === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeChip,
                      isSelected && styles.selectedTimeChip,
                      isBooked && styles.bookedTimeChip,
                    ]}
                    disabled={isBooked}
                    onPress={() => setSelectedTimeSlot(time)}
                  >
                    <Text
                      style={[
                        styles.timeChipText,
                        isSelected && styles.selectedTimeChipText,
                        isBooked && styles.bookedTimeChipText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomCtaBarRow}>
          <View>
            <Text style={styles.selectedLabelText}>SELECTED</Text>
            <Text style={styles.selectedTimeValueText}>{selectedTimeSlot} AM</Text>
          </View>

          <TouchableOpacity
            style={styles.continueBtnSmall}
            onPress={() => setStep('step5_details')}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // STEP 5: Enter Details (matching image_3.png)
  if (step === 'step5_details') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('step4_time')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Details</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoBanner}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoBannerText}>
              Please provide your details for the prayer session. Your information will be handled with reverence and confidentiality.
            </Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput
                style={styles.flexInput}
                placeholder="e.g. Sipho Ndlovu"
                placeholderTextColor={COLORS.outlineVariant}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contact Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={18} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput
                style={styles.flexInput}
                placeholder="e.g. 082 123 4567"
                placeholderTextColor={COLORS.outlineVariant}
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Prayer Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what you would like us to pray for..."
              placeholderTextColor={COLORS.outlineVariant}
              value={prayerDetails}
              onChangeText={setPrayerDetails}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Additional Notes (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Any specific instructions or preferences..."
              placeholderTextColor={COLORS.outlineVariant}
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsPrivate(!isPrivate)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkboxSquare, isPrivate && styles.checkboxSquareActive]}>
              {isPrivate && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <Text style={styles.checkboxLabelText}>Keep my booking private</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomCtaBar}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => setStep('step6_review')}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Submit Request</Text>
            <Ionicons name="paper-plane" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // STEP 6: Prayer Booking Review (matching image_4.png)
  if (step === 'step6_review') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setStep('step5_details')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review Booking</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>Almost there</Text>
            <Text style={styles.screenSubtitle}>Please review your prayer booking details below before confirming.</Text>
          </View>

          <View style={styles.reviewCard}>
            {/* Church Item */}
            <View style={styles.reviewItem}>
              <View style={styles.reviewIconCircle}>
                <MaterialCommunityIcons name="church" size={20} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.reviewItemLabel}>CHURCH</Text>
                <Text style={styles.reviewItemTitle}>{selectedChurch}</Text>
                <Text style={styles.reviewItemSub}>{selectedChurchLocation}</Text>
              </View>
            </View>

            {/* Prayer Type */}
            <View style={styles.reviewItem}>
              <View style={styles.reviewIconCircle}>
                <FontAwesome5 name="pray" size={18} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.reviewItemLabel}>PRAYER TYPE</Text>
                <Text style={styles.reviewItemTitle}>{selectedType}</Text>
                <Text style={styles.reviewItemSub}>One-on-one session</Text>
              </View>
            </View>

            {/* Date & Time */}
            <View style={styles.reviewItem}>
              <View style={styles.reviewIconCircle}>
                <Ionicons name="calendar" size={20} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.reviewItemLabel}>DATE & TIME</Text>
                <Text style={styles.reviewItemTitle}>Sunday, Oct {selectedDateDay}</Text>
                <Text style={styles.reviewItemSub}>{selectedTimeSlot} AM - 11:30 AM</Text>
              </View>
            </View>

            {/* Your Details */}
            <View style={styles.reviewItem}>
              <View style={styles.reviewIconCircle}>
                <Ionicons name="person" size={20} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.reviewItemLabel}>YOUR DETAILS</Text>
                <Text style={styles.reviewItemTitle}>{fullName}</Text>
                <Text style={styles.reviewItemSub}>{contactNumber}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomCtaBarColumn}>
          <TouchableOpacity
            style={styles.editDetailsBtn}
            onPress={() => setStep('step5_details')}
            activeOpacity={0.8}
          >
            <Text style={styles.editDetailsBtnText}>Edit Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmBookingBtn}
            onPress={handleConfirmBooking}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBookingText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // CONFIRMATION: Booking Successful
  return (
    <View style={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.successBadgeCircle}>
          <Ionicons name="sparkles" size={44} color={COLORS.primary} />
        </View>

        <Text style={styles.successTitle}>Prayer Booking Confirmed! 🙏</Text>
        <Text style={styles.successBodyText}>
          Your prayer booking for {selectedChurch} on Oct {selectedDateDay} at {selectedTimeSlot} AM is confirmed.
        </Text>

        <View style={styles.successActions}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => setStep('dashboard')}
            activeOpacity={0.85}
          >
            <Text style={styles.doneBtnText}>View My Prayers</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingBottom: 90,
  },
  titleSection: {
    gap: 4,
  },
  screenTitle: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: '900',
  },
  screenSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  prayersList: {
    gap: 12,
    marginTop: 4,
  },
  prayerCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 8,
    ...SHADOWS.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.secondary,
  },
  prayedBadge: {
    backgroundColor: COLORS.primaryContainer,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  cardDetails: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 18,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  metaSub: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  fabBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...SHADOWS.card,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
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
  },
  bookingChurchCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 8,
    ...SHADOWS.card,
  },
  bookingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingChurchName: {
    color: COLORS.onSurface,
    fontSize: 17,
    fontWeight: '800',
  },
  officialBadge: {
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  officialBadgeText: {
    color: COLORS.onSurface,
    fontSize: 10,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookingChurchLoc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    flex: 1,
  },
  distText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  availabilityText: {
    color: COLORS.primaryContainer,
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
    marginLeft: 4,
  },
  selectBtn: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
  },
  selectBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  typesGrid: {
    gap: 12,
  },
  typeCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 10,
    ...SHADOWS.card,
  },
  selectedTypeCard: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  typeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTypeIconCircle: {
    backgroundColor: COLORS.primary,
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.white,
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
  },
  typeTextGroup: {
    gap: 4,
  },
  typeTitle: {
    color: COLORS.onSurface,
    fontSize: 17,
    fontWeight: '800',
  },
  selectedTypeTitle: {
    color: COLORS.white,
  },
  typeSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 18,
  },
  bottomCtaBar: {
    padding: SPACING.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: RADIUS.full,
    ...SHADOWS.card,
  },
  continueBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  calendarCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: 12,
    ...SHADOWS.card,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthTitle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
  },
  weekHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekHeaderCell: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
    width: 32,
    textAlign: 'center',
  },
  calendarDaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  emptyDayCell: {
    width: '14.28%',
    height: 38,
  },
  disabledDayCell: {
    width: '14.28%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledDayText: {
    color: COLORS.outlineVariant,
    fontSize: 13,
  },
  dayCell: {
    width: '14.28%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.full,
    position: 'relative',
  },
  selectedDayCell: {
    backgroundColor: COLORS.primary,
  },
  unavailableDayCell: {
    opacity: 0.5,
  },
  dayCellText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDayCellText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  unavailableDayCellText: {
    color: COLORS.outlineVariant,
  },
  dotUnavailable: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.error,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
  },
  legendText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '600',
  },
  selectedDateSummaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  calendarIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  selectedDateValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  sectionGroup: {
    gap: 8,
  },
  sectionGroupLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  dateChipsScroll: {
    flexDirection: 'row',
  },
  dateChip: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDateChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateChipDay: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '700',
  },
  dateChipNum: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  selectedDateChipText: {
    color: COLORS.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeChip: {
    width: '31%',
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimeChip: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  bookedTimeChip: {
    backgroundColor: COLORS.surfaceContainerHigh,
    opacity: 0.5,
  },
  timeChipText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  selectedTimeChipText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  bookedTimeChipText: {
    color: COLORS.onSurfaceVariant,
    textDecorationLine: 'line-through',
  },
  bottomCtaBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
  },
  selectedLabelText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  selectedTimeValueText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  continueBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
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
  inputWrapper: {
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
  inputIcon: {
    marginRight: 8,
  },
  flexInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    color: COLORS.onSurface,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  textArea: {
    height: 90,
    paddingTop: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSquareActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabelText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    gap: SPACING.md,
    ...SHADOWS.card,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  reviewIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewItemLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  reviewItemTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  reviewItemSub: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 1,
  },
  bottomCtaBarColumn: {
    padding: SPACING.md,
    gap: 10,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
  },
  editDetailsBtn: {
    backgroundColor: COLORS.surfaceContainerLow,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editDetailsBtnText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBookingBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  confirmBookingText: {
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
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
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
  },
});
