import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { ChurchDetailsScreen } from './ChurchDetailsScreen';
import { ChurchDirectionsScreen } from './ChurchDirectionsScreen';
import {
  calculateDistance,
  estimateDriveTime,
  PRESET_LOCATIONS,
  LocationCoords,
} from '../utils/location';

export interface ChurchItem {
  id: string;
  name: string;
  location: string;
  province: string;
  latitude: number;
  longitude: number;
  distance: string;
  eta: string;
  nextService: string;
  badge: string;
  phone: string;
  email: string;
  about: string;
  image: any;
}

interface TemplesScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export const TemplesScreen: React.FC<TemplesScreenProps> = ({ onBack, onNavigate }) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [userLocation, setUserLocation] = useState<LocationCoords>(PRESET_LOCATIONS[0]);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);

  const [selectedChurch, setSelectedChurch] = useState<ChurchItem | null>(null);
  const [navigatingChurch, setNavigatingChurch] = useState<ChurchItem | null>(null);
  const [activeMapChurchId, setActiveMapChurchId] = useState<string | null>(null);

  // Raw list of Shembe churches categorized by Province
  const rawChurches = [
    {
      id: '1',
      name: 'Ebuhleni Headquarters',
      location: 'Inanda, KwaZulu-Natal',
      province: 'KwaZulu-Natal',
      latitude: -29.6974,
      longitude: 30.9348,
      nextService: 'Sat 09:00 AM',
      badge: 'Headquarters',
      phone: '+27 31 519 1000',
      email: 'info@ebuhleni.org.za',
      about:
        'Ebuhleni, meaning the Place of Grace, serves as the central spiritual headquarters of the Nazareth Baptist Church.',
      image: require('../../assets/church1_ebuhleni.png'),
    },
    {
      id: '2',
      name: 'Umlazi Branch',
      location: 'Umlazi V Section, Durban, KwaZulu-Natal',
      province: 'KwaZulu-Natal',
      latitude: -29.9723,
      longitude: 30.8841,
      nextService: 'Sat 10:00 AM',
      badge: 'Branch Congregation',
      phone: '+27 31 908 2000',
      email: 'umlazi@shembechurch.org',
      about:
        'Umlazi V Section Branch is a vibrant gathering place offering weekly Sabbath prayer services and community outreach.',
      image: require('../../assets/church2_umlazi.png'),
    },
    {
      id: '3',
      name: 'KwaMashu Temple',
      location: 'KwaMashu, KwaZulu-Natal',
      province: 'KwaZulu-Natal',
      latitude: -29.7421,
      longitude: 30.9852,
      nextService: 'Sat 09:30 AM',
      badge: 'Official',
      phone: '+27 31 504 3000',
      email: 'kwamashu@shembechurch.org',
      about:
        'KwaMashu Temple serves the local community with weekly Sabbath prayer services and spiritual council.',
      image: require('../../assets/church3_pietermaritzburg.png'),
    },
    {
      id: '4',
      name: 'Pietermaritzburg Temple',
      location: 'Edendale, Pietermaritzburg, KwaZulu-Natal',
      province: 'KwaZulu-Natal',
      latitude: -29.6353,
      longitude: 30.3421,
      nextService: 'Sat 09:30 AM',
      badge: 'Regional Temple',
      phone: '+27 33 398 4000',
      email: 'pmb@shembechurch.org',
      about:
        'Serving the KwaZulu-Natal midlands, the Edendale congregation welcomes worshippers for Sabbath services and sacred gatherings.',
      image: require('../../assets/church3_pietermaritzburg.png'),
    },
    {
      id: '5',
      name: 'Ekuphakameni Mission',
      location: 'Inanda, KwaZulu-Natal',
      province: 'KwaZulu-Natal',
      latitude: -29.7011,
      longitude: 30.9385,
      nextService: 'Sat 09:00 AM',
      badge: 'Historic Sacred Site',
      phone: '+27 31 519 2000',
      email: 'ekuphakameni@shembechurch.org',
      about:
        'Founded by Prophet Isaiah Shembe in 1910, Ekuphakameni represents the elevated place of prayer, healing, and reflection.',
      image: require('../../assets/ekuphakameni_hero.png'),
    },
    // GAUTENG CHURCHES
    {
      id: '6',
      name: 'Johannesburg Soweto Branch',
      location: 'Soweto, Johannesburg, Gauteng',
      province: 'Gauteng',
      latitude: -26.2485,
      longitude: 27.8540,
      nextService: 'Sat 09:30 AM',
      badge: 'Regional Temple',
      phone: '+27 11 984 1000',
      email: 'soweto@shembechurch.org',
      about: 'Serving the congregation across Johannesburg and Soweto for Sabbath prayer services.',
      image: require('../../assets/church2_umlazi.png'),
    },
    {
      id: '7',
      name: 'Germiston Temple',
      location: 'Germiston, Ekurhuleni, Gauteng',
      province: 'Gauteng',
      latitude: -26.2257,
      longitude: 28.1708,
      nextService: 'Sat 09:00 AM',
      badge: 'Official Branch',
      phone: '+27 11 873 2000',
      email: 'germiston@shembechurch.org',
      about: 'Serving worshippers in Ekurhuleni and Greater Johannesburg with weekly Sabbath prayer services.',
      image: require('../../assets/church1_ebuhleni.png'),
    },
    {
      id: '8',
      name: 'Pretoria Sanctuary',
      location: 'Tshwane, Pretoria, Gauteng',
      province: 'Gauteng',
      latitude: -25.7479,
      longitude: 28.2293,
      nextService: 'Sat 10:00 AM',
      badge: 'Regional Branch',
      phone: '+27 12 321 4000',
      email: 'pretoria@shembechurch.org',
      about: 'Pretoria Sanctuary provides spiritual guidance and weekly Sabbath prayer gatherings for northern Gauteng.',
      image: require('../../assets/church3_pietermaritzburg.png'),
    },
    // EASTERN CAPE CHURCHES
    {
      id: '9',
      name: 'Gqeberha Assembly',
      location: 'Gqeberha (Port Elizabeth), Eastern Cape',
      province: 'Eastern Cape',
      latitude: -33.9608,
      longitude: 25.6022,
      nextService: 'Sat 09:30 AM',
      badge: 'Regional Temple',
      phone: '+27 41 581 1000',
      email: 'gqeberha@shembechurch.org',
      about: 'Welcoming worshippers from across Nelson Mandela Bay and the Eastern Cape.',
      image: require('../../assets/church2_umlazi.png'),
    },
  ];

  // Dynamically calculate distance & drive time based on userLocation
  const calculatedChurches: ChurchItem[] = rawChurches
    .map((item) => {
      const dist = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        item.latitude,
        item.longitude
      );
      const driveTime = estimateDriveTime(dist);
      return {
        ...item,
        distance: `${dist} km`,
        eta: driveTime,
      };
    })
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  // FILTER LOGIC
  const filteredChurches = calculatedChurches.filter((item) => {
    // Search query filter
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Region chip filter
    let matchesRegion = true;
    if (selectedRegion === 'KZN' || selectedRegion === 'KwaZulu-Natal') {
      matchesRegion = item.province === 'KwaZulu-Natal';
    } else if (selectedRegion === 'Gauteng') {
      matchesRegion = item.province === 'Gauteng';
    } else if (selectedRegion === 'Eastern Cape') {
      matchesRegion = item.province === 'Eastern Cape';
    }

    return matchesSearch && matchesRegion;
  });

  // Active Map Church selection
  const activeMapChurch =
    filteredChurches.find((c) => c.id === activeMapChurchId) || filteredChurches[0] || calculatedChurches[0];

  // Detect real device GPS location
  const handleDetectDeviceGPS = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({
            name: `Device GPS (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
            latitude,
            longitude,
          });
          setShowLocationPicker(false);
        },
        () => {
          setShowLocationPicker(false);
        },
        { timeout: 5000 }
      );
    } else {
      setShowLocationPicker(false);
    }
  };

  // Render Navigation Screen if navigating
  if (navigatingChurch) {
    return (
      <ChurchDirectionsScreen
        onBack={() => setNavigatingChurch(null)}
        churchName={navigatingChurch.name}
        location={navigatingChurch.location}
        distance={navigatingChurch.distance}
        eta={navigatingChurch.eta}
      />
    );
  }

  // Render Details Screen if selected
  if (selectedChurch) {
    return (
      <ChurchDetailsScreen
        onBack={() => setSelectedChurch(null)}
        onDirections={() => {
          const churchToNav = selectedChurch;
          setSelectedChurch(null);
          setNavigatingChurch(churchToNav);
        }}
        onGive={() => onNavigate?.('Offerings')}
        onRequestPrayer={() => onNavigate?.('Prayer')}
        church={selectedChurch}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}

        <Text style={styles.headerTitle}>Churches</Text>

        <TouchableOpacity
          style={styles.viewToggleBtn}
          onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          activeOpacity={0.7}
        >
          <Ionicons
            name={viewMode === 'map' ? 'list' : 'map'}
            size={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Dynamic User Location Banner Bar */}
      <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
        <TouchableOpacity
          style={styles.userLocationBar}
          onPress={() => setShowLocationPicker(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="location" size={24} color={COLORS.primary} />
          <View style={styles.userLocationTextContainer}>
            <Text style={styles.userLocationLabel}>CURRENT LOCATION</Text>
            <Text style={styles.userLocationValue}>{userLocation.name}</Text>
          </View>
          <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.primary }}>Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search & Filter Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.outlineVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search churches, regions..."
              placeholderTextColor={COLORS.outlineVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <TouchableOpacity
              style={styles.filterChip}
              onPress={() => setShowLocationPicker(true)}
            >
              <Ionicons name="options-outline" size={14} color={COLORS.onSurfaceVariant} />
              <Text style={styles.filterChipText}>Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterChip, selectedRegion === 'All' && styles.activeFilterChip]}
              onPress={() => setSelectedRegion('All')}
            >
              <Text style={[styles.filterChipText, selectedRegion === 'All' && styles.activeFilterChipText]}>
                All
              </Text>
              {selectedRegion === 'All' && (
                <Ionicons name="checkmark" size={14} color={COLORS.white} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterChip, (selectedRegion === 'KZN' || selectedRegion === 'KwaZulu-Natal') && styles.activeFilterChip]}
              onPress={() => setSelectedRegion('KwaZulu-Natal')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  (selectedRegion === 'KZN' || selectedRegion === 'KwaZulu-Natal') && styles.activeFilterChipText,
                ]}
              >
                KwaZulu-Natal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterChip, selectedRegion === 'Gauteng' && styles.activeFilterChip]}
              onPress={() => setSelectedRegion('Gauteng')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedRegion === 'Gauteng' && styles.activeFilterChipText,
                ]}
              >
                Gauteng
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterChip, selectedRegion === 'Eastern Cape' && styles.activeFilterChip]}
              onPress={() => setSelectedRegion('Eastern Cape')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedRegion === 'Eastern Cape' && styles.activeFilterChipText,
                ]}
              >
                Eastern Cape
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* View Mode: Map or List */}
        {viewMode === 'map' ? (
          <View style={styles.mapContainer}>
            {Platform.OS === 'web' ? (
              <iframe
                title="Church Interactive Map"
                src={`https://maps.google.com/maps?q=${activeMapChurch.latitude},${activeMapChurch.longitude}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                style={{
                  width: '100%',
                  height: 380,
                  border: 0,
                  borderRadius: RADIUS.lg,
                }}
                loading="lazy"
              />
            ) : (
              <Image
                source={require('../../assets/church_map.png')}
                style={styles.mapImage}
                resizeMode="cover"
              />
            )}

            {/* Toggle back to List View floating button */}
            <TouchableOpacity
              style={styles.listViewFloatingBtn}
              onPress={() => setViewMode('list')}
              activeOpacity={0.85}
            >
              <Ionicons name="list" size={16} color={COLORS.primary} />
              <Text style={styles.listViewFloatingText}>List View</Text>
            </TouchableOpacity>

            {/* Active Pin Overlay Card matching Stitch design */}
            {activeMapChurch && (
              <TouchableOpacity
                style={styles.mapPinCard}
                onPress={() => setSelectedChurch(activeMapChurch)}
                activeOpacity={0.9}
              >
                <Ionicons name="location" size={24} color={COLORS.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.mapPinTitle}>{activeMapChurch.name}</Text>
                  <Text style={styles.mapPinSubtitle}>
                    {activeMapChurch.distance} ({activeMapChurch.eta} drive) • Next: {activeMapChurch.nextService}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.directNavBtn}
                  onPress={() => setNavigatingChurch(activeMapChurch)}
                >
                  <Ionicons name="navigate" size={16} color={COLORS.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {filteredChurches.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Ionicons name="search-outline" size={40} color={COLORS.onSurfaceVariant} />
                <Text style={styles.emptyStateTitle}>No Churches Found</Text>
                <Text style={styles.emptyStateSub}>
                  No congregations match "{searchQuery || selectedRegion}". Try clearing filters.
                </Text>
              </View>
            ) : (
              filteredChurches.map((item) => (
                <View key={item.id} style={styles.churchCard}>
                  <Image source={item.image} style={styles.churchImage} resizeMode="cover" />

                  <View style={styles.cardInfo}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.churchName}>{item.name}</Text>
                      <View style={styles.distanceBadge}>
                        <Text style={styles.distanceBadgeText}>{item.distance} • {item.eta}</Text>
                      </View>
                    </View>

                    <Text style={styles.churchLocation}>{item.location}</Text>

                    {/* Next Service Time Row */}
                    <View style={styles.timeRow}>
                      <Ionicons name="time-outline" size={14} color={COLORS.primary} />
                      <Text style={styles.timeText}>Next: {item.nextService}</Text>
                    </View>

                    <View style={styles.cardFooterRow}>
                      <TouchableOpacity
                        style={styles.cardNavBtn}
                        onPress={() => setNavigatingChurch(item)}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="navigate" size={13} color={COLORS.white} />
                        <Text style={styles.cardNavBtnText}>Start Nav ({item.eta})</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.viewDetailsBtn}
                        onPress={() => setSelectedChurch(item)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.detailsBtnText}>View Details</Text>
                        <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Location Picker Modal */}
      <Modal visible={showLocationPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Your Location</Text>
            <Text style={styles.modalSub}>
              Recalculates accurate drive times & distance to all Shembe temples.
            </Text>

            <TouchableOpacity style={styles.gpsDetectBtn} onPress={handleDetectDeviceGPS}>
              <Ionicons name="location" size={18} color={COLORS.white} />
              <Text style={styles.gpsDetectText}>Use Device Current GPS</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            {PRESET_LOCATIONS.map((loc) => (
              <TouchableOpacity
                key={loc.name}
                style={[
                  styles.presetItem,
                  userLocation.name === loc.name && styles.presetItemActive,
                ]}
                onPress={() => {
                  setUserLocation(loc);
                  setShowLocationPicker(false);
                }}
              >
                <Ionicons
                  name={userLocation.name === loc.name ? 'checkmark-circle' : 'location-outline'}
                  size={18}
                  color={userLocation.name === loc.name ? COLORS.primary : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.presetText,
                    userLocation.name === loc.name && styles.presetTextActive,
                  ]}
                >
                  {loc.name}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowLocationPicker(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backBtn: {
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
  viewToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLocationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  userLocationTextContainer: {
    flex: 1,
  },
  userLocationLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  userLocationValue: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  searchSection: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.full,
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
  filterScroll: {
    flexDirection: 'row',
    marginTop: 4,
  },
  filterChip: {
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterChipText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  mapContainer: {
    position: 'relative',
    height: 420,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  listViewFloatingBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...SHADOWS.card,
  },
  listViewFloatingText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  mapPinCard: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.card,
  },
  mapPinTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '800',
  },
  mapPinSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
  directNavBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    paddingBottom: 40,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    gap: 8,
  },
  emptyStateTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  emptyStateSub: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: 'center',
  },
  churchCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
    ...SHADOWS.card,
  },
  churchImage: {
    width: '100%',
    height: 140,
  },
  cardInfo: {
    padding: SPACING.md,
    gap: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  churchName: {
    color: COLORS.onSurface,
    fontSize: 17,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  distanceBadge: {
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  distanceBadgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  churchLocation: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    flexShrink: 1,
  },
  cardNavBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexShrink: 0,
  },
  detailsBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    flexShrink: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  modalSub: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },
  gpsDetectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  gpsDetectText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.surfaceVariant,
  },
  presetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  presetItemActive: {
    backgroundColor: COLORS.surfaceContainerLow,
  },
  presetText: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '600',
  },
  presetTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  modalCloseBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalCloseText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '700',
  },
});
