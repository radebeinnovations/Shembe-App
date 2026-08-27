import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Hymn, Sermon } from '../types';
import { MOCK_HYMNS, MOCK_SERMONS } from '../data/mockData';

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

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [activeTrack, setActiveTrack] = useState<AudioContextType['activeTrack']>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && activeTrack?.youtubeId) {
      interval = setInterval(() => {
        setPositionMillis((prev) => {
          if (prev >= 255000) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1000;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeTrack?.youtubeId]);

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
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // If item has a YouTube video ID or audioUrl is empty/placeholder, play ONLY the YouTube video stream
      const isPlaceholderAudio = !audioUrl || audioUrl.includes('soundhelix.com');

      if (youtubeId || isPlaceholderAudio) {
        setActiveTrack({ type, id, title, subtitle, audioUrl: '', verses, number: hymnNumber, youtubeId });
        setIsPlaying(true);
        setModalVisible(true);
        return;
      }

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
      setActiveTrack({ type, id, title, subtitle, audioUrl, verses, number: hymnNumber, youtubeId });
      setIsPlaying(true);
      setModalVisible(true);
    } catch (e) {
      console.log('Error loading audio:', e);
      setActiveTrack({ type, id, title, subtitle, audioUrl: '', verses, number: hymnNumber, youtubeId });
      setIsPlaying(true);
      setModalVisible(true);
    }
  };

  const playHymn = async (hymn: Hymn) => {
    await loadAndPlayTrack(
      'hymn',
      hymn.id,
      hymn.title,
      `Hymn ${hymn.number} • Ebuhleni Choir`,
      hymn.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      hymn.verses,
      hymn.number,
      hymn.youtubeId
    );
  };

  const playSermon = async (sermon: Sermon) => {
    await loadAndPlayTrack(
      'sermon',
      sermon.id,
      sermon.title,
      sermon.speaker,
      sermon.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      undefined,
      undefined,
      sermon.youtubeId
    );
  };

  const togglePlayPause = async () => {
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
    if (sound) {
      await sound.setPositionAsync(positionMs);
    }
    setPositionMillis(positionMs);
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setActiveTrack(null);
    setIsPlaying(false);
    setModalVisible(false);
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
