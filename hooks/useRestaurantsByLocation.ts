import { useState, useEffect, useMemo, useRef } from 'react';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { filterNearbyRestaurants, getActiveLocation, Coordinates } from '../utils/locationUtils';

interface UseRestaurantsByLocationResult<T> {
  restaurants: T[];
  activeLocationType: "saved" | "device" | "none";
  activeLocationName: string | null;
  loading: boolean;
  error: string | null;
  userLocation: Coordinates | null;
}

/**
 * Hook to get restaurants based on selected saved address or device location.
 * Prioritizes saved address if selected.
 */
export const useRestaurantsByLocation = <T extends { id: number; name: string; coordinates?: { lat: number; lng: number } }>(
  allRestaurants: T[],
  maxDistance: number = 5
): UseRestaurantsByLocationResult<T> => {
  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get selected address from Redux store
  const selectedAddress = useSelector((state: RootState) => state.selectedAddress.selectedAddress);
  
  // Track device location
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // Get initial position
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setDeviceLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });

        // Watch for changes if no saved address is selected
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 10000, // 10 seconds
            distanceInterval: 100, // 100 meters
          },
          (location) => {
            setDeviceLocation({
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            });
          }
        );
      } catch (err: any) {
        console.error("Error in location hook:", err);
        setError(err.message || 'Failed to get location');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // Determine active location and type
  const { coordinates: activeCoords, type: activeLocationType } = useMemo(() => 
    getActiveLocation(selectedAddress, deviceLocation),
    [selectedAddress, deviceLocation]
  );

  const activeLocationName = useMemo(() => {
    if (activeLocationType === "saved" && selectedAddress) {
      return selectedAddress.title || "Selected Address";
    }
    if (activeLocationType === "device") {
      return "your current location";
    }
    return null;
  }, [activeLocationType, selectedAddress]);

  // Filter and sort restaurants based on active location
  const restaurants = useMemo(() => {
    // If no active location coordinates, return all restaurants as fallback
    if (!activeCoords) return allRestaurants;
    
    return filterNearbyRestaurants(activeCoords, allRestaurants, maxDistance);
  }, [activeCoords, allRestaurants, maxDistance]);

  return {
    restaurants,
    activeLocationType,
    activeLocationName,
    loading,
    error,
    userLocation: deviceLocation,
  };
};
