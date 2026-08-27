import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { Hymn, Sermon } from '../types';
import { MOCK_HYMNS, MOCK_SERMONS } from '../data/mockData';

// ── TypeScript stubs for YouTube IFrame API ──────────────────────────────────
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    _ytApiLoading: boolean;
  }
}

interface AudioContextType {
  activeTrack: {
    type: 'hymn' | 'sermon';
    id: string;
    title: string;
    subtitle: string;
    number?: number;
    audioUrl: string;
    youtubeId?: string;
    verses?: string[];
  } | null;
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  isModalVisible: boolean;
  playHymn: (hymn: Hymn) => Promise<void>;
  playSermon: (sermon: Sermon) => Promise<void>;
  playNextTrack: () => Promise<void>;
  playPrevTrack: () => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seekTo: (positionMs: number) => Promise<void>;
  stopAudio: () => Promise<void>;
  setModalVisible: (visible: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// ── Singleton YouTube player div id ─────────────────────────────────────────
const YT_PLAYER_DIV_ID = 'yt-global-player';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [activeTrack, setActiveTrack] = useState<AudioContextType['activeTrack']>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  // YouTube IFrame API player reference
  const ytPlayerRef = useRef<any>(null);
  const positionTimerRef = useRef<any>(null);

  // ── Bootstrap the YouTube IFrame API once (web only) ─────────────────────
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Create the hidden div for the YouTube player if not already present
    if (!document.getElementById(YT_PLAYER_DIV_ID)) {
      const div = document.createElement('div');
      div.id = YT_PLAYER_DIV_ID;
      div.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
      document.body.appendChild(div);
    }

    // Load the YT IFrame API script only once
    if (!window._ytApiLoading && !window.YT) {
      window._ytApiLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
  }, []);

  // ── Position polling for YouTube player ──────────────────────────────────
  const startPositionPolling = () => {
    stopPositionPolling();
    positionTimerRef.current = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
        const currentSec = ytPlayerRef.current.getCurrentTime();
        const durationSec = ytPlayerRef.current.getDuration();
        setPositionMillis(Math.floor(currentSec * 1000));
        if (durationSec > 0) setDurationMillis(Math.floor(durationSec * 1000));
      }
    }, 500);
  };

  const stopPositionPolling = () => {
    if (positionTimerRef.current) {
      clearInterval(positionTimerRef.current);
      positionTimerRef.current = null;
    }
  };

  // ── Load a YouTube video into the singleton player ────────────────────────
  const loadYouTubeVideo = (videoId: string) => {
    if (Platform.OS !== 'web') return;

    const doLoad = () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
        // Player already exists – just swap the video
        ytPlayerRef.current.loadVideoById({ videoId, startSeconds: 0 });
      } else {
        // Create a fresh player
        ytPlayerRef.current = new window.YT.Player(YT_PLAYER_DIV_ID, {
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: () => {
              ytPlayerRef.current.playVideo();
              startPositionPolling();
            },
            onStateChange: (event: any) => {
              // YT.PlayerState: PLAYING=1, PAUSED=2, ENDED=0
              if (event.data === 1) {
                setIsPlaying(true);
                startPositionPolling();
              } else if (event.data === 2) {
                setIsPlaying(false);
                stopPositionPolling();
              } else if (event.data === 0) {
                // ended
                setIsPlaying(false);
                setPositionMillis(0);
                stopPositionPolling();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      doLoad();
    } else {
      // Queue initialization for when the API is ready
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousReady) previousReady();
        doLoad();
      };
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPositionMillis(status.positionMillis || 0);
      setDurationMillis(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPositionMillis(0);
      }
    }
  };

  // ── Load & play any track ─────────────────────────────────────────────────
  const loadAndPlayTrack = async (
    type: 'hymn' | 'sermon',
    id: string,
    title: string,
    subtitle: string,
    audioUrl: string,
    verses?: string[],
    hymnNumber?: number,
    youtubeId?: string
  ) => {
    // Stop any existing expo-av sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    // Stop YouTube if switching away
    if (ytPlayerRef.current && typeof ytPlayerRef.current.stopVideo === 'function') {
      ytPlayerRef.current.stopVideo();
    }
    stopPositionPolling();
    setPositionMillis(0);
    setDurationMillis(0);

    setActiveTrack({ type, id, title, subtitle, audioUrl: '', verses, number: hymnNumber, youtubeId });
    setIsPlaying(true);
    setModalVisible(true);

    if (youtubeId && Platform.OS === 'web') {
      // ── YouTube path ──────────────────────────────────────────────────────
      loadYouTubeVideo(youtubeId);
    } else if (audioUrl && !audioUrl.includes('soundhelix.com')) {
      // ── expo-av path ──────────────────────────────────────────────────────
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
      } catch (e) {
        console.log('Error loading audio:', e);
      }
    }
  };

  const playHymn = async (hymn: Hymn) => {
    await loadAndPlayTrack(
      'hymn', hymn.id, hymn.title,
      `Hymn ${hymn.number} • Ebuhleni Choir`,
      hymn.audioUrl || '',
      hymn.verses, hymn.number, hymn.youtubeId
    );
  };

  const playSermon = async (sermon: Sermon) => {
    await loadAndPlayTrack(
      'sermon', sermon.id, sermon.title, sermon.speaker,
      sermon.audioUrl || '',
      undefined, undefined, sermon.youtubeId
    );
  };

  const togglePlayPause = async () => {
    if (ytPlayerRef.current && activeTrack?.youtubeId) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
      return;
    }
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const seekTo = async (positionMs: number) => {
    const targetSecs = positionMs / 1000;
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(targetSecs, true);
      setPositionMillis(positionMs);
      return;
    }
    if (sound) {
      await sound.setPositionAsync(positionMs);
    }
    setPositionMillis(positionMs);
  };

  const stopAudio = async () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.stopVideo === 'function') {
      ytPlayerRef.current.stopVideo();
    }
    stopPositionPolling();
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setActiveTrack(null);
    setIsPlaying(false);
    setModalVisible(false);
    setPositionMillis(0);
    setDurationMillis(0);
  };

  const playNextTrack = async () => {
    if (!activeTrack) return;
    if (activeTrack.type === 'hymn') {
      const currentIndex = MOCK_HYMNS.findIndex((h) => h.id === activeTrack.id);
      const nextIndex = (currentIndex + 1) % MOCK_HYMNS.length;
      await playHymn(MOCK_HYMNS[nextIndex]);
    } else {
      const currentIndex = MOCK_SERMONS.findIndex((s) => s.id === activeTrack.id);
      const nextIndex = (currentIndex + 1) % MOCK_SERMONS.length;
      await playSermon(MOCK_SERMONS[nextIndex]);
    }
  };

  const playPrevTrack = async () => {
    if (!activeTrack) return;
    if (activeTrack.type === 'hymn') {
      const currentIndex = MOCK_HYMNS.findIndex((h) => h.id === activeTrack.id);
      const prevIndex = (currentIndex - 1 + MOCK_HYMNS.length) % MOCK_HYMNS.length;
      await playHymn(MOCK_HYMNS[prevIndex]);
    } else {
      const currentIndex = MOCK_SERMONS.findIndex((s) => s.id === activeTrack.id);
      const prevIndex = (currentIndex - 1 + MOCK_SERMONS.length) % MOCK_SERMONS.length;
      await playSermon(MOCK_SERMONS[prevIndex]);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        isPlaying,
        positionMillis,
        durationMillis,
        isModalVisible,
        playHymn,
        playSermon,
        playNextTrack,
        playPrevTrack,
        togglePlayPause,
        seekTo,
        stopAudio,
        setModalVisible,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
