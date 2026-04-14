import { useState, useEffect, useMemo } from 'react';
import * as Location from 'expo-location';
import { filterNearbyRestaurants, Coordinates } from '../utils/locationUtils';

interface UseNearbyRestaurantsResult<T> {
  nearbyRestaurants: T[];
  loading: boolean;
  error: string | null;
  userLocation: Coordinates | null;
  permissionStatus: Location.PermissionStatus | null;
}

/**
 * Hook to get user location and filter nearby restaurants.
 */
export const useNearbyRestaurants = <T extends { id: number; name: string; coordinates?: { lat: number; lng: number } }>(
  restaurants: T[],
  maxDistance: number = 5
): UseNearbyRestaurantsResult<T> => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to get location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const nearbyRestaurants = useMemo(() => {
    // If we have an error or haven't loaded location yet, we might want to return all restaurants as fallback
    // The utility function handle null userLocation by returning original list
    return filterNearbyRestaurants(userLocation, restaurants, maxDistance);
  }, [userLocation, restaurants, maxDistance]);

  return {
    nearbyRestaurants,
    loading,
    error,
    userLocation,
    permissionStatus,
  };
};
