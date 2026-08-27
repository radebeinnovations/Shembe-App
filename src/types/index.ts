export interface Hymn {
  id: string;
  number: number;
  title: string;
  category: 'Isihlabelelo' | 'Imthandazo' | 'Isiphetho' | 'Inhlokomo';
  verses: string[];
  isiZuluTitle: string;
  composer?: string;
  audioUrl?: string;
  youtubeId?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  duration?: string;
  isFavorite?: boolean;
}

export interface PilgrimageTrailPoint {
  id: string;
  title: string;
  description: string;
  distanceKm: number;
  elevationMeters: number;
  isRestStop: boolean;
}

export interface Pilgrimage {
  id: string;
  title: string;
  isiZuluName: string;
  location: string;
  dates: string;
  month: string;
  description: string;
  trailPoints: PilgrimageTrailPoint[];
  packingList: string[];
  safetyGuidelines: string[];
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Temple {
  id: string;
  name: string;
  isiZuluName: string;
  region: 'Ebuhleni' | 'Ekuphakameni' | 'Judea' | 'Khenani' | 'Gauteng' | 'Eastern Cape';
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  elderInCharge: string;
  contactNumber: string;
  serviceTimes: string[];
  imageUrl: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  audioUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  isLive?: boolean;
  category: 'Sabbath Service' | 'Holy Gathering' | 'Youth Address' | 'Historical Recording';
  thumbnailUrl: string;
}

export interface OfferingCategory {
  id: string;
  title: string;
  isiZuluTitle: string;
  description: string;
  iconName: string;
  recommendedAmounts: number[];
}

export interface Announcement {
  id: string;
  title: string;
  isiZuluTitle: string;
  content: string;
  date: string;
  author: string;
  isUrgent?: boolean;
  category: 'Church Council' | 'Sabbath Preparation' | 'Youth & Traditional Dance' | 'Holy Pilgrimage';
}
