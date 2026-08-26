// Haversine formula to calculate distance between two coordinates in kilometers
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // 1 decimal place
}

export function estimateDriveTime(distanceKm: number): string {
  // Realistic South African driving speeds (Highways N2/N3 vs Urban Arterial roads)
  let speedKmH = 45;

  if (distanceKm > 40) {
    // Highway travel (N3 / N1 / N2 expressways ~ 85-95 km/h)
    speedKmH = 88;
  } else if (distanceKm > 10) {
    // Urban arterial expressways (M4, M19, N2 ring roads ~ 65-75 km/h)
    speedKmH = 68;
  } else {
    // City streets & local roads (~ 40-50 km/h)
    speedKmH = 42;
  }

  const minutes = Math.round((distanceKm / speedKmH) * 60);

  if (minutes < 1) return '1 min';
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) return `${hours} hr`;
  return `${hours}h ${remainingMins}m`;
}

export interface LocationCoords {
  name: string;
  latitude: number;
  longitude: number;
}

export const PRESET_LOCATIONS: LocationCoords[] = [
  { name: 'Durban Central, KZN', latitude: -29.8587, longitude: 31.0218 },
  { name: 'Inanda, KwaZulu-Natal', latitude: -29.6974, longitude: 30.9348 },
  { name: 'Umlazi, Durban', latitude: -29.9723, longitude: 30.8841 },
  { name: 'Pietermaritzburg, KZN', latitude: -29.6353, longitude: 30.3421 },
  { name: 'Johannesburg, Gauteng', latitude: -26.2041, longitude: 28.0473 },
  { name: 'Pretoria, Gauteng', latitude: -25.7479, longitude: 28.2293 },
];
