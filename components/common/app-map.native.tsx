import React, { useMemo, useState, useEffect, memo, useRef } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
  type LatLng,
  type MapStyleElement,
  type Region,
} from "react-native-maps";
import { useColorScheme } from "nativewind";
import type { AppMapProps, AppMapMarker } from "./app-map.types";
import MapSearchBar from "./MapSearchBar";

export type {
  AppMapCoordinate,
  AppMapMarker,
  AppMapProps,
  AppMapRoutePoint,
  AppMapTheme,
} from "./app-map.types";

const DEFAULT_LATITUDE_DELTA = 0.012;
const DEFAULT_LONGITUDE_DELTA = 0.012;

// Static style to prevent re-creation
const DARK_MAP_STYLE: MapStyleElement[] = [
  { elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#e5e7eb" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#111827" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#374151" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#d1d5db" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#263241" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#334155" }] },
];

const MemoizedMarker = memo(({ marker, index }: { marker: AppMapMarker; index: number }) => (
  <Marker
    key={marker.id ?? `${marker.lat}-${marker.lng}-${index}`}
    coordinate={{ latitude: marker.lat, longitude: marker.lng }}
    title={marker.title}
    pinColor="#f97316"
  />
));

MemoizedMarker.displayName = "MemoizedMarker";

function isValidCoordinate(latitude?: number | null, longitude?: number | null) {
  return (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function toLatLng(latitude?: number | null, longitude?: number | null): LatLng | null {
  if (!isValidCoordinate(latitude, longitude)) return null;
  return { latitude, longitude } as LatLng;
}

export default function AppMap({
  latitude,
  longitude,
  markers = [],
  route = [],
  latitudeDelta = DEFAULT_LATITUDE_DELTA,
  longitudeDelta = DEFAULT_LONGITUDE_DELTA,
  loading = false,
  enableCurrentLocation = false,
  draggableMarker = false,
  selectedMarkerTitle = "Selected location",
  onLocationChange,
  showSearchBar = false,
  searchPlaceholder,
  onSelectPlace,
  theme = "system",
  style,
  mapStyle,
}: AppMapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const { colorScheme } = useColorScheme();
  const mapRef = useRef<MapView>(null);

  // Lazy load map to keep transitions smooth
  useEffect(() => {
    const timer = setTimeout(() => setShouldRenderMap(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const resolvedTheme = theme === "system" ? colorScheme : theme;

  const region = useMemo<Region | null>(() => {
    const coordinate = toLatLng(latitude, longitude);
    if (!coordinate) return null;
    return {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }, [latitude, latitudeDelta, longitude, longitudeDelta]);

  // Sync region if coordinate props change externally
  useEffect(() => {
    if (isMapReady && region && mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
  }, [latitude, longitude, isMapReady, region]);

  const validMarkers = useMemo(
    () => markers.filter((marker) => isValidCoordinate(marker.lat, marker.lng)),
    [markers],
  );

  const routeCoordinates = useMemo(
    () => route.reduce<LatLng[]>((acc, point) => {
      const coord = toLatLng(point.lat, point.lng);
      if (coord) acc.push(coord);
      return acc;
    }, []),
    [route],
  );

  const handlePlaceSelect = (place: { latitude: number; longitude: number; address: string }) => {
    const coordinate = { latitude: place.latitude, longitude: place.longitude };
    
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...coordinate,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      }, 500);
    }
    
    // Notify parent
    onSelectPlace?.(place);
    // Also trigger location change for the marker
    onLocationChange?.(coordinate);
  };

  if (loading || !region || !shouldRenderMap) {
    return (
      <View 
        className="flex-1 w-full items-center bg-gray-50 dark:bg-gray-900 justify-center gap-[10px]"
        style={style}
      >
        <ActivityIndicator color="#f97316" />
        <Text selectable className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
          {loading ? "Loading map..." : "Initializing..."}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full overflow-hidden" style={style}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={[StyleSheet.absoluteFill, mapStyle]}
        initialRegion={region}
        loadingEnabled
        loadingBackgroundColor={resolvedTheme === "dark" ? "#111827" : "#f9fafb"}
        loadingIndicatorColor="#f97316"
        customMapStyle={resolvedTheme === "dark" ? DARK_MAP_STYLE : []}
        userInterfaceStyle={resolvedTheme === "dark" ? "dark" : "light"}
        showsUserLocation={enableCurrentLocation}
        showsMyLocationButton={enableCurrentLocation}
        onMapReady={() => setIsMapReady(true)}
        onPress={(e) => onLocationChange?.(e.nativeEvent.coordinate)}
      >
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title={selectedMarkerTitle}
          pinColor="#f97316"
          draggable={draggableMarker}
          onDragEnd={(e) => onLocationChange?.(e.nativeEvent.coordinate)}
        />

        {validMarkers.map((marker, index) => (
          <MemoizedMarker key={marker.id || index} marker={marker} index={index} />
        ))}

        {routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#f97316"
            strokeWidth={4}
            lineCap="round"
          />
        )}
      </MapView>

      {showSearchBar && (
        <View className="absolute top-0 left-0 right-0 p-2">
          <MapSearchBar 
            onSelectLocation={handlePlaceSelect}
            placeholder={searchPlaceholder}
          />
        </View>
      )}

      {!isMapReady && (
        <View pointerEvents="none" className="absolute inset-0 items-center justify-center bg-gray-50/70 dark:bg-gray-900/70">
          <ActivityIndicator color="#f97316" />
        </View>
      )}
    </View>
  );
}
