export const COLORS = {
  // Stitch Material 3 Theme Palette
  primary: '#012d1d',               // Deep Forest Green
  primaryContainer: '#1b4332',      // Dark Emerald Container
  onPrimary: '#ffffff',
  onPrimaryContainer: '#86af99',

  secondary: '#735c00',             // Sacred Gold / Ocher
  secondaryContainer: '#fed65b',      // Golden Yellow
  secondaryFixed: '#ffe088',
  secondaryFixedDim: '#e9c349',
  onSecondaryContainer: '#745c00',

  surface: '#fbf9f5',               // Warm Cream Background
  surfaceContainerLow: '#f5f3ef',
  surfaceContainer: '#efeeea',      // Warm Card Background
  surfaceContainerHigh: '#eae8e4',
  surfaceContainerLowest: '#ffffff',
  surfaceVariant: '#e4e2de',

  onSurface: '#1b1c1a',             // Primary Dark Text
  onSurfaceVariant: '#414844',      // Secondary Text
  outline: '#717973',
  outlineVariant: '#c1c8c2',
  surfaceTint: '#3f6653',
  tertiaryContainer: '#48392d',

  // Status & Accents
  error: '#ba1a1a',
  white: '#ffffff',
  liveRed: '#e53e3e',

  // Backwards compatibility aliases
  gold: '#735c00',
  goldLight: '#745c00',
  goldDark: '#574500',
  goldGlow: 'rgba(115, 92, 0, 0.15)',
  emerald: '#012d1d',
  emeraldDark: '#1b4332',
  emeraldLight: '#1b4332',
  bgDark: '#fbf9f5',
  bgCardDark: '#ffffff',
  bgElevated: '#efeeea',
  borderDark: '#e4e2de',
  textMuted: '#414844',
  textDim: '#717973',
  whiteSubtle: '#414844',
  primaryFixed: '#c1ecd4',
  onPrimaryFixedVariant: '#274e3d',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  card: {
    shadowColor: '#012d1d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  goldGlow: {
    shadowColor: '#735c00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};
