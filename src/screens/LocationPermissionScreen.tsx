import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { PRESET_LOCATIONS, LocationCoords } from '../utils/location';

interface LocationPermissionScreenProps {
  onLocationSelected: (location: LocationCoords) => void;
}

export const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({
  onLocationSelected,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleAllowLocation = () => {
    setIsDetecting(true);

    // Try web browser HTML5 Geolocation API
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsDetecting(false);
          const { latitude, longitude } = position.coords;
          const userLoc: LocationCoords = {
            name: `Device GPS (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
            latitude,
            longitude,
          };
          // Immediately invoke selection callback so React state advances cleanly on Web & Mobile!
          onLocationSelected(userLoc);
        },
        (error) => {
          setIsDetecting(false);
          // Fallback to default preset location (Durban Central)
          onLocationSelected(PRESET_LOCATIONS[0]);
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setIsDetecting(false);
      onLocationSelected(PRESET_LOCATIONS[0]);
    }
  };

  const handleSelectManual = (loc: LocationCoords) => {
    setShowManualModal(false);
    onLocationSelected(loc);
  };

  return (
    <View style={styles.container}>
      {/* Pattern Overlay Background */}
      <View style={styles.patternHeader} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Concentric Location Circle Badge */}
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Ionicons name="location" size={32} color={COLORS.white} />
          </View>
        </View>

        {/* Content Section */}
        <Text style={styles.title}>Discover the Journey</Text>
        <Text style={styles.subtitle}>
          Find the nearest Shembe church and discover services near you to join the congregation.
        </Text>
      </ScrollView>

      {/* Bottom Action Area */}
      <View style={styles.footer}>
        {/* Allow Location Primary Button */}
        <TouchableOpacity
          style={styles.allowBtn}
          onPress={handleAllowLocation}
          disabled={isDetecting}
          activeOpacity={0.85}
        >
          {isDetecting ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <>
              <Ionicons name="locate" size={18} color={COLORS.white} />
              <Text style={styles.allowBtnText}>ALLOW LOCATION</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Choose Location Manually Secondary Button */}
        <TouchableOpacity
          style={styles.manualBtn}
          onPress={() => setShowManualModal(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.manualBtnText}>CHOOSE LOCATION MANUALLY</Text>
        </TouchableOpacity>
      </View>

      {/* Manual Location Selection Modal */}
      <Modal visible={showManualModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowManualModal(false)}
          activeOpacity={1}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Congregation Region</Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {PRESET_LOCATIONS.map((loc, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.locationOption}
                  onPress={() => handleSelectManual(loc)}
                >
                  <Ionicons name="business-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.locationOptionText}>{loc.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    height: 200,
    backgroundColor: COLORS.surfaceContainerLow,
    opacity: 0.6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  outerCircle: {
    width: 104,
    height: 104,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: 'rgba(1, 45, 29, 0.15)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  innerCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  title: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
  footer: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    gap: 12,
  },
  allowBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...SHADOWS.card,
  },
  allowBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  manualBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  manualBtnText: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    borderTopWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.surfaceVariant,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  locationOptionText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
});
