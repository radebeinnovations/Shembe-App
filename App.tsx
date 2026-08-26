import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { AudioPlayerModal } from './src/components/AudioPlayerModal';
import { AudioProvider } from './src/context/AudioContext';
import { BookmarkProvider } from './src/context/BookmarkContext';

import { SplashScreen } from './src/screens/SplashScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LocationPermissionScreen } from './src/screens/LocationPermissionScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { OtpScreen } from './src/screens/OtpScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';

import { HomeScreen } from './src/screens/HomeScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { TemplesScreen } from './src/screens/TemplesScreen';
import { HymnsScreen } from './src/screens/HymnsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { PilgrimageScreen } from './src/screens/PilgrimageScreen';
import { OfferingsScreen } from './src/screens/OfferingsScreen';
import { SermonsScreen } from './src/screens/SermonsScreen';
import { PrayerScreen } from './src/screens/PrayerScreen';

import { COLORS, RADIUS, SHADOWS } from './src/theme/theme';

export default function App() {
  const [appState, setAppState] = useState<'splash' | 'welcome' | 'onboarding' | 'location_permission' | 'signin' | 'signup' | 'otp' | 'forgot_password' | 'main'>('splash');
  const [currentTab, setCurrentTab] = useState<'Home' | 'Explore' | 'Churches' | 'Prayer' | 'Profile' | 'Hymns' | 'Offerings' | 'Sermons' | 'Pilgrimage'>('Home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<string>('Durban Central, KZN');

  const renderMainTab = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen onNavigate={(screen) => setCurrentTab(screen as any)} />;
      case 'Explore':
        return <ExploreScreen onNavigate={(screen) => setCurrentTab(screen as any)} />;
      case 'Churches':
        return <TemplesScreen />;
      case 'Prayer':
        return <PrayerScreen onNavigate={(screen) => setCurrentTab(screen as any)} />;
      case 'Hymns':
        return <HymnsScreen />;
      case 'Profile':
        return (
          <ProfileScreen
            onSignOut={() => setAppState('welcome')}
            onNavigate={(screen) => setCurrentTab(screen as any)}
          />
        );
      case 'Offerings':
        return <OfferingsScreen onBack={() => setCurrentTab('Explore')} />;
      case 'Sermons':
        return <SermonsScreen onBack={() => setCurrentTab('Explore')} />;
      case 'Pilgrimage':
        return <PilgrimageScreen onBack={() => setCurrentTab('Explore')} />;
      default:
        return <HomeScreen onNavigate={(screen) => setCurrentTab(screen as any)} />;
    }
  };

  const renderScreenContent = () => {
    switch (appState) {
      case 'splash':
        return <SplashScreen onFinish={() => setAppState('welcome')} />;
      case 'welcome':
        return (
          <WelcomeScreen
            onSignIn={() => setAppState('signin')}
            onSignUp={() => setAppState('signup')}
            onGuest={() => setAppState('onboarding')}
          />
        );
      case 'onboarding':
        return (
          <OnboardingScreen
            onNext={() => setAppState('location_permission')}
            onSkip={() => setAppState('location_permission')}
          />
        );
      case 'location_permission':
        return (
          <LocationPermissionScreen
            onLocationSelected={(loc) => {
              setUserLocation(loc.name);
              setAppState('main');
            }}
          />
        );
      case 'signin':
        return (
          <SignInScreen
            onSignInSuccess={() => setAppState('otp')}
            onNavigateToSignUp={() => setAppState('signup')}
            onForgotPassword={() => setAppState('forgot_password')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onSignUpSuccess={() => setAppState('otp')}
            onNavigateToSignIn={() => setAppState('signin')}
          />
        );
      case 'otp':
        return (
          <OtpScreen
            phoneNumber="+27 82 555 0192"
            onVerifySuccess={() => setAppState('location_permission')}
            onBack={() => setAppState('signin')}
          />
        );
      case 'forgot_password':
        return (
          <ForgotPasswordScreen
            onBackToSignIn={() => setAppState('signin')}
            onResetSuccess={() => setAppState('signin')}
          />
        );
      case 'main':
      default:
        return (
          <View style={styles.mainContainer}>
            {/* Screen Body */}
            <View style={styles.body}>{renderMainTab()}</View>

            {/* Floating Audio Player & Hymn Reader */}
            <AudioPlayerModal />

            {/* Stitch Bottom Navigation Dock (5 Tabs matching image_0.png) */}
            <View style={styles.tabBar}>
              {/* 1. Home */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Home' && styles.activeTabItem]}
                onPress={() => setCurrentTab('Home')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={currentTab === 'Home' ? 'home' : 'home-outline'}
                  size={22}
                  color={currentTab === 'Home' ? COLORS.white : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    currentTab === 'Home' && styles.activeTabLabel,
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>

              {/* 2. Explore */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Explore' && styles.activeTabItem]}
                onPress={() => setCurrentTab('Explore')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={currentTab === 'Explore' ? 'compass' : 'compass-outline'}
                  size={22}
                  color={currentTab === 'Explore' ? COLORS.white : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    currentTab === 'Explore' && styles.activeTabLabel,
                  ]}
                >
                  Explore
                </Text>
              </TouchableOpacity>

              {/* 3. Churches */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Churches' && styles.activeTabItem]}
                onPress={() => setCurrentTab('Churches')}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="church"
                  size={22}
                  color={currentTab === 'Churches' ? COLORS.white : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    currentTab === 'Churches' && styles.activeTabLabel,
                  ]}
                >
                  Churches
                </Text>
              </TouchableOpacity>

              {/* 4. Prayer */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Prayer' && styles.activeTabItem]}
                onPress={() => setCurrentTab('Prayer')}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name="praying-hands"
                  size={20}
                  color={currentTab === 'Prayer' ? COLORS.white : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    currentTab === 'Prayer' && styles.activeTabLabel,
                  ]}
                >
                  Prayer
                </Text>
              </TouchableOpacity>

              {/* 5. Profile */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Profile' && styles.activeTabItem]}
                onPress={() => setCurrentTab('Profile')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={currentTab === 'Profile' ? 'person' : 'person-outline'}
                  size={22}
                  color={currentTab === 'Profile' ? COLORS.white : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    currentTab === 'Profile' && styles.activeTabLabel,
                  ]}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <AudioProvider>
      <BookmarkProvider>
        <SafeAreaView style={styles.rootBackground}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

          {/* Web View Mode Toggle Header */}
          {Platform.OS === 'web' && (
            <View style={styles.viewModeHeader}>
              <Text style={styles.viewModeTitle}>📱 Shembe App Mobile Preview</Text>
              <TouchableOpacity
                style={styles.viewModeBtn}
                onPress={() => setIsMobileFrame(!isMobileFrame)}
              >
                <Ionicons
                  name={isMobileFrame ? 'phone-portrait' : 'desktop'}
                  size={16}
                  color={COLORS.primary}
                />
                <Text style={styles.viewModeBtnText}>
                  {isMobileFrame ? 'Mobile Frame (390px)' : 'Full Width Web'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Render Area */}
          <View style={[styles.rootContainer, isMobileFrame && Platform.OS === 'web' && styles.mobilePhoneFrame]}>
            {renderScreenContent()}
          </View>
        </SafeAreaView>
      </BookmarkProvider>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  rootBackground: {
    flex: 1,
    backgroundColor: '#e6e4df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewModeHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
  },
  viewModeTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  viewModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  viewModeBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  rootContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.surface,
  },
  mobilePhoneFrame: {
    maxWidth: 410,
    maxHeight: 840,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: '#1b1c1a',
    marginVertical: 12,
    ...SHADOWS.goldGlow,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  activeTabItem: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 14,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    fontWeight: '600',
  },
  activeTabLabel: {
    color: COLORS.white,
    fontWeight: '800',
  },
});
