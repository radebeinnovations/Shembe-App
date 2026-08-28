import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
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
import { MyContributionsScreen } from './src/screens/MyContributionsScreen';
import { MyFundraisersScreen } from './src/screens/MyFundraisersScreen';
import { CreateFundraiserScreen } from './src/screens/CreateFundraiserScreen';
import { PersonalInfoScreen } from './src/screens/PersonalInfoScreen';
import { NotificationsSettingsScreen } from './src/screens/NotificationsSettingsScreen';
import { HelpSupportScreen } from './src/screens/HelpSupportScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { TeachingsScreen } from './src/screens/TeachingsScreen';
import { BibleScreen } from './src/screens/BibleScreen';
import { InspirationScreen } from './src/screens/InspirationScreen';

import { COLORS, RADIUS, SHADOWS } from './src/theme/theme';

export default function App() {
  const { width } = useWindowDimensions();

  const [appState, setAppState] = useState<
    | 'splash'
    | 'welcome'
    | 'onboarding'
    | 'location_permission'
    | 'signin'
    | 'signup'
    | 'otp'
    | 'forgot_password'
    | 'main'
  >('splash');

  const [currentTab, setCurrentTab] = useState<
    | 'Home'
    | 'Explore'
    | 'Explore_Community'
    | 'Churches'
    | 'Prayer'
    | 'Profile'
    | 'Hymns'
    | 'Offerings'
    | 'Sermons'
    | 'Pilgrimage'
    | 'MyContributions'
    | 'MyFundraisers'
    | 'CreateFundraiser'
    | 'PersonalInfo'
    | 'NotificationsSettings'
    | 'HelpSupport'
    | 'Events'
    | 'Teachings'
    | 'Bible'
    | 'Inspiration'
  >('Home');

  // Navigation History Stack for top-left Back button
  const [navHistory, setNavHistory] = useState<string[]>(['Home']);

  const navigateTo = (screen: string) => {
    setNavHistory((prev) => [...prev, screen]);
    setCurrentTab(screen as any);
  };

  const popScreen = () => {
    if (navHistory.length > 1) {
      const newHistory = [...navHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setNavHistory(newHistory);
      setCurrentTab(prevScreen as any);
    } else {
      setCurrentTab('Home');
    }
  };

  // Only enable desktop frame container when viewing on a wide desktop screen (>768px)
  const isDesktop = width > 768;
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  const renderMainTab = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'Explore':
        return <ExploreScreen onNavigate={navigateTo} initialSubScreen="explore" />;
      case 'Explore_Community':
        return <ExploreScreen onNavigate={navigateTo} initialSubScreen="community" />;
      case 'Churches':
        return <TemplesScreen onBack={popScreen} />;
      case 'Prayer':
        return <PrayerScreen onNavigate={navigateTo} />;
      case 'Hymns':
        return <HymnsScreen onBack={popScreen} />;
      case 'Profile':
        return (
          <ProfileScreen
            onSignOut={() => setAppState('welcome')}
            onNavigate={navigateTo}
          />
        );
      case 'Offerings':
        return <OfferingsScreen onBack={popScreen} />;
      case 'Sermons':
        return <SermonsScreen onBack={popScreen} />;
      case 'Pilgrimage':
        return <PilgrimageScreen onBack={popScreen} />;
      case 'MyContributions':
        return <MyContributionsScreen onBack={popScreen} />;
      case 'MyFundraisers':
        return (
          <MyFundraisersScreen
            onBack={popScreen}
            onCreateNew={() => navigateTo('CreateFundraiser')}
          />
        );
      case 'CreateFundraiser':
        return (
          <CreateFundraiserScreen
            onClose={popScreen}
            onViewMyFundraisers={() => navigateTo('MyFundraisers')}
          />
        );
      case 'PersonalInfo':
        return <PersonalInfoScreen onBack={popScreen} />;
      case 'NotificationsSettings':
        return <NotificationsSettingsScreen onBack={popScreen} />;
      case 'HelpSupport':
        return <HelpSupportScreen onBack={popScreen} />;
      case 'Events':
        return <EventsScreen onBack={popScreen} />;
      case 'Teachings':
        return <TeachingsScreen onBack={popScreen} />;
      case 'Bible':
        return <BibleScreen onBack={popScreen} />;
      case 'Inspiration':
        return <InspirationScreen onBack={popScreen} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
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
            onLocationSelected={() => {
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
            onVerifySuccess={() => setAppState('main')}
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
            <View style={styles.body}>{renderMainTab()}</View>

            {/* Bottom Navigation Bar */}
            <View style={styles.tabBar}>
              {/* 1. Home */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Home' && styles.activeTabItem]}
                onPress={() => navigateTo('Home')}
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
                style={[styles.tabItem, currentTab.startsWith('Explore') && styles.activeTabItem]}
                onPress={() => navigateTo('Explore')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={currentTab.startsWith('Explore') ? 'compass' : 'compass-outline'}
                  size={22}
                  color={currentTab.startsWith('Explore') ? COLORS.white : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    currentTab.startsWith('Explore') && styles.activeTabLabel,
                  ]}
                >
                  Explore
                </Text>
              </TouchableOpacity>

              {/* 3. Churches */}
              <TouchableOpacity
                style={[styles.tabItem, currentTab === 'Churches' && styles.activeTabItem]}
                onPress={() => navigateTo('Churches')}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name="church"
                  size={18}
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
                onPress={() => navigateTo('Prayer')}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name="praying-hands"
                  size={18}
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
                onPress={() => navigateTo('Profile')}
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

  const showMobileFrameOnDesktop = isDesktop && isMobileFrame && Platform.OS === 'web';

  return (
    <AudioProvider>
      <BookmarkProvider>
        <SafeAreaView style={styles.rootBackground}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

          {/* Web View Mode Toggle Header ONLY shown on Desktop Laptop browsers */}
          {isDesktop && Platform.OS === 'web' && (
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

          {/* Render Area - Full screen on Mobile Phones! */}
          <View style={[styles.rootContainer, showMobileFrameOnDesktop && styles.mobilePhoneFrame]}>
            {renderScreenContent()}
            {/* Keeps the playing hymn available while the user browses other screens. */}
            <AudioPlayerModal />
          </View>
        </SafeAreaView>
      </BookmarkProvider>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  rootBackground: {
    flex: 1,
    backgroundColor: COLORS.surface,
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
