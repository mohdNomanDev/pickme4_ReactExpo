/**
 * Utility functions for location and distance calculations.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculates the distance between two coordinates using the Haversine formula.
 * @returns Distance in kilometers.
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export interface RestaurantWithDistance {
  id: number;
  name: string;
  coordinates?: Coordinates;
  distanceValue?: number;
  [key: string]: any;
}

/**
 * Determines the active location based on selected saved address or device location.
 */
export const getActiveLocation = (
  selectedAddress: { latitude?: number; longitude?: number } | null,
  deviceLocation: Coordinates | null
): { coordinates: Coordinates | null; type: "saved" | "device" | "none" } => {
  if (selectedAddress?.latitude !== undefined && selectedAddress?.longitude !== undefined) {
    return {
      coordinates: { lat: selectedAddress.latitude, lng: selectedAddress.longitude },
      type: "saved",
    };
  }

  if (deviceLocation) {
    return {
      coordinates: deviceLocation,
      type: "device",
    };
  }

  return {
    coordinates: null,
    type: "none",
  };
};

/**
 * Filters and sorts restaurants by distance from the user.
 */
export const filterNearbyRestaurants = <T extends RestaurantWithDistance>(
  userLocation: Coordinates | null,
  restaurants: T[],
  maxDistance: number = 5
): T[] => {
  if (!userLocation) {
    return restaurants;
  }

  const restaurantsWithDistance = restaurants.map((restaurant) => {
    if (!restaurant.coordinates) {
      return { ...restaurant, distanceValue: Infinity };
    }

    const dist = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurant.coordinates.lat,
      restaurant.coordinates.lng
    );

    return { ...restaurant, distanceValue: dist };
  });

  return restaurantsWithDistance
    .filter((r) => (r.distanceValue !== undefined ? r.distanceValue <= maxDistance : false))
    .sort((a, b) => (a.distanceValue || 0) - (b.distanceValue || 0));
};
