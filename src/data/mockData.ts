import { Hymn, Pilgrimage, Temple, Sermon, OfferingCategory, Announcement } from '../types';

export const MOCK_HYMNS: Hymn[] = [
  {
    id: 'h1',
    number: 1,
    title: 'UNyazi',
    isiZuluTitle: 'UNyazi (Vusanani Youth Song)',
    category: 'Isihlabelelo',
    composer: 'Prophet Isaiah Shembe (1910)',
    duration: '04:15',
    youtubeId: 'lhix6F5Fahw',
    audioUrl: '',
    verses: [
      '1. Nkosi yami, woza kimina,\nUngamukele emseni wakho;\nMina ngingucezu lodwa,\nNginike amandla emoya.',
      '2. Ebuhleni bakho uThixo,\nUngigcine endleleni yakho;\nUngavumeli amaphutha ami,\nUkuthi angihlukanise nawe.',
      '3. Nazareth sekuyikhaya,\nEliphezulu ezintabeni;\nLapho umoya ufumana uthando,\nNokuthula okumphela.'
    ]
  },
  {
    id: 'h2',
    number: 24,
    title: 'Nanti Ilizwi Lomemo',
    isiZuluTitle: 'Nanti Ilizwi Lomemo (Original Mix)',
    category: 'Inhlokomo',
    composer: 'Prophet Isaiah Shembe',
    duration: '05:30',
    youtubeId: 'wmJs6fegC0Q',
    audioUrl: '',
    verses: [
      '1. Izintaba zaseNhlangakazi,\nZibona ubukhosi bukaThixo;\nLapho abantwana bamaNazaretha,\nBaphuza emthonjeni womphakathi.',
      '2. Khangela iSabatha eliNgcwele,\nLinomusa nesibusiso;\nSizokhuleka kuyo yonke imihla,\nSiphakamise igama likaJehova.',
      '3. Woza mhlaba uxole,\nUbone ukukhanya okusha;\nEkuphakameni naseBuhleni,\nNgeLanga likaThixo.'
    ]
  },
  {
    id: 'h3',
    number: 55,
    title: 'Baqonde Entabeni Eyingcwele',
    isiZuluTitle: 'Isihlabelelo 55 - Baqonde Entabeni Eyingcwele',
    category: 'Isihlabelelo',
    composer: 'Prophet J.G. Shembe (1940)',
    duration: '03:50',
    youtubeId: 'pSLsQkHaElI',
    audioUrl: '',
    verses: [
      '1. Baqonde entabeni eyingcwele,\nBahamba ngoxolo nangomthandazo;\nBangabantwana bakaShembe,\nAbafuna ukukhanya kweZulu.',
      '2. Lalelani izwi lomprofethi,\nLiletha impilo nomusa;\nMusani ukwesaba indlela,\nUThixo ugonqe nabasindisiwe.'
    ]
  },
  {
    id: 'h4',
    number: 89,
    title: 'Amaqhawe KaThixo',
    isiZuluTitle: 'Amaqhawe KaThixo',
    category: 'Imthandazo',
    composer: 'Prophet A.K. Shembe',
    duration: '06:10',
    youtubeId: 'qg4SZq6N7uM',
    audioUrl: '',
    verses: [
      '1. Thixo Somandla Simakade,\nSiza embelekweni yakho;\nSihlabelela imiyalezo eyingcwele,\nSiyabonga umusa nomvuzo.',
      '2. Ekuphakameni kwakho Thixo,\nSinike ingqondo nezwi;\nSibe ngofakazi bothando,\nKuyo yonke imindeni yakithi.'
    ]
  },
  {
    id: 'h5',
    number: 112,
    title: 'Amaqhawe KaThixo',
    isiZuluTitle: 'Amaqhawe KaThixo',
    category: 'Isiphetho',
    composer: 'Prophet V.V. Shembe',
    duration: '04:45',
    youtubeId: 'JN12GCRswsE',
    audioUrl: '',
    verses: [
      '1. Ameni khangela iSabatha,\nSekufike isikhathi semvuselelo;\nSibonisa ukuzithoba entandweni,\nKuyonke imiSebenzi yethu.',
      '2. Phakamisa izandla zakho,\nUkhuleke kuSimakade;\nUdumo kuye uShembe,\nOwasisiza ebumnyameni.'
    ]
  },
  {
    id: 'h6',
    number: 140,
    title: 'Amathalente',
    isiZuluTitle: 'Amathalente',
    category: 'Inhlokomo',
    composer: 'Prophet M.D. Shembe',
    duration: '05:05',
    youtubeId: 'N-BiyUGtXYI',
    audioUrl: '',
    verses: [
      '1. Ngiyakuthanda muzi waseBuhleni,\nNgentaba emhlophe nangomusa;\nLapho ibandla laseNazaretha,\nLihlangana ngomthandazo nomculo.',
      '2. Umphakathi uyavuma,\nIgama likaJehova limile;\nKuzo zonke izizukulwane,\nLiyadunyiswa ngenhliziyo yonke.'
    ]
  }
];

export const MOCK_PILGRIMAGES: Pilgrimage[] = [
  {
    id: 'p1',
    title: 'Nhlangakazi Mountain Pilgrimage',
    isiZuluName: 'Uhambo Lwasentabeni yaseNhlangakazi',
    location: 'Nhlangakazi Mountain, Inanda, KZN',
    dates: 'January 2 - January 26 Annually',
    month: 'January',
    description: 'The sacred holy walk established by Prophet Isaiah Shembe in 1913. Pilgrims walk bare-footed up the holy mountain of Nhlangakazi in deep devotion and prayer.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop',
    coordinates: {
      latitude: -29.6200,
      longitude: 30.9800
    },
    trailPoints: [
      { id: 't1', title: 'Starting Base (Ebuhleni / Inanda)', description: 'Assembly point for prayer and blessings before departure.', distanceKm: 0, elevationMeters: 120, isRestStop: true },
      { id: 't2', title: 'Umgeni River Crossing', description: 'Sacred water checkpoint where pilgrims pause for reflection.', distanceKm: 12, elevationMeters: 280, isRestStop: false },
      { id: 't3', title: 'Ozwathini Rest Ground', description: 'Major overnight rest camp and evening Sabbath praise.', distanceKm: 24, elevationMeters: 550, isRestStop: true },
      { id: 't4', title: 'Nhlangakazi Holy Peak Summit', description: 'Sacred peak prayer site and sermon circle.', distanceKm: 38, elevationMeters: 920, isRestStop: true }
    ],
    packingList: [
      'Traditional White Robes (Umhedlo / Amaphadikoti)',
      'Sacred Mat (Isithebe / Ukhalo)',
      'Comfortable bare-foot care / clean cloths',
      'Water flask and natural hydration',
      'Holy Hymnbook (Izihlabelelo zamaNazaretha)'
    ],
    safetyGuidelines: [
      'Walk in orderly branch groups led by designated Abaphathi elders.',
      'Maintain silence and sacred meditation during hill ascents.',
      'Always carry water and stay close to your designated assembly point.'
    ]
  },
  {
    id: 'p2',
    title: 'July Holy Gathering at Ebuhleni',
    isiZuluName: 'Umhlangano WaseBuhleni Wenyanga kaNtulikazi',
    location: 'Ebuhleni Holy Village, Inanda',
    dates: 'July 1 - July 31 Annually',
    month: 'July',
    description: 'The largest annual gathering of the Nazareth Baptist Church featuring daily Sabbath services, traditional dance (Ukusina), youth conventions, and divine healings.',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop',
    coordinates: {
      latitude: -29.6912,
      longitude: 30.9322
    },
    trailPoints: [
      { id: 'j1', title: 'Ebuhleni Entrance Gates', description: 'Welcome arch and traditional greeting protocols.', distanceKm: 0, elevationMeters: 180, isRestStop: true },
      { id: 'j2', title: 'Main Holy Arena (Inkundla)', description: 'Grand venue for Ukusina traditional dance and sermons.', distanceKm: 1, elevationMeters: 200, isRestStop: true }
    ],
    packingList: [
      'Full ceremonial attire (Umhedlo, Izidwaba, Amaphambili)',
      'Sacred Shembe Hymnbook app / book',
      'Blankets for evening outdoor sermon sessions',
      'Tithe & Offering receipts / envelopes'
    ],
    safetyGuidelines: [
      'Follow parking instructions provided by church traffic wardens.',
      'Keep children accompanied in the main arena.'
    ]
  },
  {
    id: 'p3',
    title: 'October Remembrance Month',
    isiZuluName: 'Inyanga yoMbandela nokuKhumbula kaMfumfu',
    location: 'Ekuphakameni & Ebuhleni',
    dates: 'October 1 - October 31',
    month: 'October',
    description: 'Commemoration of the founding prophets of Ibandla laseNazaretha with holy services, heritage lectures, and branch prayers across South Africa.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop',
    coordinates: {
      latitude: -29.7100,
      longitude: 30.9500
    },
    trailPoints: [
      { id: 'o1', title: 'Ekuphakameni Heritage Grounds', description: 'Historic home of Prophet Isaiah Shembe.', distanceKm: 0, elevationMeters: 150, isRestStop: true }
    ],
    packingList: ['White prayer shawls', 'Izihlabelelo app', 'Notebook for teachings'],
    safetyGuidelines: ['Respect quiet prayer hours around the holy shrine grounds.']
  }
];

export const MOCK_TEMPLES: Temple[] = [
  {
    id: 't1',
    name: 'Ebuhleni Holy Village & Main Temple',
    isiZuluName: 'Muzi WaseBuhleni',
    region: 'Ebuhleni',
    address: 'Inanda Main Road, Ebuhleni, Durban, KZN',
    coordinates: { latitude: -29.6912, longitude: 30.9322 },
    elderInCharge: 'Mfundisi N. Mdlalose',
    contactNumber: '+27 31 519 1000',
    serviceTimes: [
      'Sabatha Morning: 09:00 AM',
      'Sabatha Afternoon: 03:00 PM',
      'Wednesday Prayer: 05:00 PM'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1548625361-186e80b2a758?w=800&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Ekuphakameni Holy Shrine & Branch',
    isiZuluName: 'Muzi WaseKuphakameni',
    region: 'Ekuphakameni',
    address: 'Ekuphakameni Way, Phoenix / Inanda, Durban',
    coordinates: { latitude: -29.7100, longitude: 30.9500 },
    elderInCharge: 'Mfundisi S. Khumalo',
    contactNumber: '+27 31 500 2400',
    serviceTimes: ['Sabatha Service: 09:30 AM', 'Daily Sunset Devotion: 06:00 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Judea Holy Grounds',
    isiZuluName: 'Muzi WaseJudea',
    region: 'Judea',
    address: 'Eshowe Rural District, KZN',
    coordinates: { latitude: -28.8900, longitude: 31.4500 },
    elderInCharge: 'Mfundisi B. Bhengu',
    contactNumber: '+27 35 474 1212',
    serviceTimes: ['Sabatha Service: 10:00 AM'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop'
  },
  {
    id: 't4',
    name: 'Khenani Temple',
    isiZuluName: 'Muzi WaseKhenani',
    region: 'Khenani',
    address: 'Mtunzini Road, Khenani, KZN',
    coordinates: { latitude: -28.9500, longitude: 31.7000 },
    elderInCharge: 'Mfundisi T. Ntuli',
    contactNumber: '+27 35 340 9988',
    serviceTimes: ['Sabatha Service: 09:00 AM'],
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop'
  },
  {
    id: 't5',
    name: 'Gauteng Johannesburg Central Branch',
    isiZuluName: 'Igatsha laseGoli (Joburg Central)',
    region: 'Gauteng',
    address: 'Corner Albertina Sisulu & Troy St, Johannesburg',
    coordinates: { latitude: -26.2041, longitude: 28.0473 },
    elderInCharge: 'Mfundisi P. Zondi',
    contactNumber: '+27 11 333 4567',
    serviceTimes: ['Sabatha Morning: 09:00 AM', 'Friday Sunset Service: 05:30 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop'
  }
];

export const MOCK_SERMONS: Sermon[] = [
  {
    id: 's1',
    title: 'Inkonzo yoSabatha Ebuhleni - Inkulumo kaNkulunkulu (Sabbath Broadcast 1)',
    speaker: 'Unyazi LweZulu - Prophet Unyazi Shembe',
    date: 'Saturday, July 20, 2026',
    duration: '1:12:30',
    audioUrl: '',
    videoUrl: 'https://www.youtube.com/embed/P3SSIJTx50Y?autoplay=1',
    youtubeId: 'P3SSIJTx50Y',
    isLive: true,
    category: 'Sabbath Service',
    thumbnailUrl: 'https://img.youtube.com/vi/P3SSIJTx50Y/hqdefault.jpg'
  },
  {
    id: 's2',
    title: 'Uhambo Oluyingcwele LwaseNhlangakazi (Holy Mountain Broadcast 2)',
    speaker: 'Abaphathi beBandla lamaNazaretha',
    date: 'Saturday, January 18, 2026',
    duration: '45:15',
    audioUrl: '',
    videoUrl: 'https://www.youtube.com/embed/BiC8OFBIsJk?autoplay=1',
    youtubeId: 'BiC8OFBIsJk',
    category: 'Holy Gathering',
    thumbnailUrl: 'https://img.youtube.com/vi/BiC8OFBIsJk/hqdefault.jpg'
  },
  {
    id: 's3',
    title: 'Umhlanganiso Omkhulu waNtulikazi eBuhleni (July Gathering Service 3)',
    speaker: 'Unyazi LweZulu & AmaBhanti oQobo',
    date: 'Sunday, July 27, 2025',
    duration: '1:45:00',
    audioUrl: '',
    videoUrl: 'https://www.youtube.com/embed/ZLEItpK2p7g?autoplay=1',
    youtubeId: 'ZLEItpK2p7g',
    category: 'Holy Gathering',
    thumbnailUrl: 'https://img.youtube.com/vi/ZLEItpK2p7g/hqdefault.jpg'
  },
  {
    id: 's4',
    title: 'Izihlabelelo zamaNazaretha - Youth Choir & Brass Band Praise 4',
    speaker: 'AmaChoir namaBhanti eBandla lamaNazaretha',
    date: 'Saturday, June 14, 2026',
    duration: '38:20',
    audioUrl: '',
    videoUrl: 'https://www.youtube.com/embed/aoEmgMXPWsA?autoplay=1',
    youtubeId: 'aoEmgMXPWsA',
    category: 'Youth Address',
    thumbnailUrl: 'https://img.youtube.com/vi/aoEmgMXPWsA/hqdefault.jpg'
  }
];

export const MOCK_OFFERINGS: OfferingCategory[] = [
  {
    id: 'o1',
    title: 'Monthly Sabbath Tithe',
    isiZuluTitle: 'Ukundlondlobeza neNtekelo kaSabatha',
    description: 'Sacred monthly tithe contribution for church spiritual operations.',
    iconName: 'heart',
    recommendedAmounts: [50, 100, 250, 500, 1000]
  },
  {
    id: 'o2',
    title: 'Holy Gathering Offering',
    isiZuluTitle: 'Isinikelo Somhlangano Oyingcwele',
    description: 'Contribution toward July Gathering & Pilgrimage logistics.',
    iconName: 'gift',
    recommendedAmounts: [100, 200, 500, 1500]
  },
  {
    id: 'o3',
    title: 'Temple Building & Renovation Fund',
    isiZuluTitle: 'Isikhwama Sokwakha AmaThempele',
    description: 'Supporting the construction of local branch tabernacles & community halls.',
    iconName: 'home',
    recommendedAmounts: [100, 250, 500, 2000]
  },
  {
    id: 'o4',
    title: 'Youth & Traditional Dance (Ukusina) Support',
    isiZuluTitle: 'Ukubesezela Inhlangano Yentsha nyoKusina',
    description: 'Equipping youth groups with traditional attire, drums, and travel support.',
    iconName: 'star',
    recommendedAmounts: [50, 150, 300, 750]
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Official Dates for July 2026 Holy Gathering at Ebuhleni',
    isiZuluTitle: 'Izinsuku Ezingcwele Somhlangano WaseBuhleni kaNtulikazi',
    content: 'The Church Council announces that the annual July Holy Gathering at Ebuhleni village will commence on July 1st. All branch leaders (Abaphathi) are requested to verify their group registries.',
    date: 'August 24, 2026',
    author: 'Church General Secretariat',
    isUrgent: true,
    category: 'Holy Pilgrimage'
  },
  {
    id: 'a2',
    title: 'Sabbath Service Rehearsals & Ukusina Practice',
    isiZuluTitle: 'Imizamo kaSabatha neziFundo zoKusina Kwentsha',
    content: 'Local branch rehearsals for traditional dance (Ukusina) and choir hymns will take place every Wednesday evening at 17:00 at all main regional temples.',
    date: 'August 20, 2026',
    author: 'Youth Council (Inhlangano Yentsha)',
    category: 'Youth & Traditional Dance'
  },
  {
    id: 'a3',
    title: 'Preparation for Nhlangakazi Mountain Pilgrimage Trail Walk',
    isiZuluTitle: 'Amalungiselelo Uhambo Lwasentabeni yaseNhlangakazi',
    content: 'Pilgrims are encouraged to review safety guidelines and download the digital trail guide in the Shembe App for the upcoming mountain assembly.',
    date: 'August 15, 2026',
    author: 'Pilgrimage Security & Medical Team',
    category: 'Sabbath Preparation'
  }
];
