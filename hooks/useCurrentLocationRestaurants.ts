import { useState, useEffect, useMemo, useCallback } from 'react';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLocationSource } from '../store/selectedAddressSlice';
import { filterNearbyRestaurants, Coordinates } from '../utils/locationUtils';

interface UseCurrentLocationRestaurantsResult<T> {
  restaurants: T[];
  activeLocationType: "saved" | "device";
  activeLocationName: string | null;
  loading: boolean;
  error: string | null;
  userLocation: Coordinates | null;
  selectCurrentLocation: () => Promise<void>;
}

/**
 * Hook to manage switching between saved and device location,
 * and fetching/updating the restaurant list accordingly.
 */
export const useCurrentLocationRestaurants = <T extends { id: number; name: string; coordinates?: { lat: number; lng: number } }>(
  allRestaurants: T[],
  maxDistance: number = 5
): UseCurrentLocationRestaurantsResult<T> => {
  const dispatch = useDispatch();
  const { selectedAddress, locationSource } = useSelector((state: RootState) => state.selectedAddress);
  
  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to explicitly select and fetch current location
  const selectCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setDeviceLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      // Update Redux state to switch to device mode
      dispatch(setLocationSource("device"));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch current location');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Track device location changes in real-time if in device mode
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 15000, // 15 seconds
            distanceInterval: 50, // 50 meters
          },
          (location) => {
            setDeviceLocation({
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            });
          }
        );
      } catch (err) {
        console.error("Error watching position:", err);
      }
    };

    if (locationSource === "device") {
      startWatching();
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationSource]);

  // Determine active coordinates based on source
  const activeCoords = useMemo(() => {
    if (locationSource === "saved" && selectedAddress) {
      return { 
        lat: selectedAddress.latitude!, 
        lng: selectedAddress.longitude! 
      };
    }
    return deviceLocation;
  }, [locationSource, selectedAddress, deviceLocation]);

  const activeLocationName = useMemo(() => {
    if (locationSource === "saved" && selectedAddress) {
      return selectedAddress.title || "Selected Address";
    }
    if (locationSource === "device") {
      return "your current location";
    }
    return null;
  }, [locationSource, selectedAddress]);

  // Compute filtered restaurants
  const restaurants = useMemo(() => {
    if (!activeCoords) return allRestaurants;
    return filterNearbyRestaurants(activeCoords, allRestaurants, maxDistance);
  }, [activeCoords, allRestaurants, maxDistance]);

  return {
    restaurants,
    activeLocationType: locationSource,
    activeLocationName,
    loading,
    error,
    userLocation: deviceLocation,
    selectCurrentLocation,
  };
};
