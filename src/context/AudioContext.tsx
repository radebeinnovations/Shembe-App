import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Hymn, Sermon } from '../types';

interface AudioContextType {
  activeTrack: {
    type: 'hymn' | 'sermon';
    id: string;
    title: string;
    subtitle: string;
    number?: number;
    audioUrl: string;
    verses?: string[];
  } | null;
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  isModalVisible: boolean;
  playHymn: (hymn: Hymn) => Promise<void>;
  playSermon: (sermon: Sermon) => Promise<void>;
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
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

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
    hymnNumber?: number
  ) => {
    try {
      if (sound) {
        await sound.unloadAsync();
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
      setActiveTrack({ type, id, title, subtitle, audioUrl, verses, number: hymnNumber });
      setIsPlaying(true);
      setModalVisible(true);
    } catch (e) {
      console.log('Error loading audio:', e);
      setActiveTrack({ type, id, title, subtitle, audioUrl, verses, number: hymnNumber });
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
      hymn.number
    );
  };

  const playSermon = async (sermon: Sermon) => {
    await loadAndPlayTrack(
      'sermon',
      sermon.id,
      sermon.title,
      sermon.speaker,
      sermon.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
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
