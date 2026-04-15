import React, { useMemo, useState, useEffect, memo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
  type LatLng,
  type MapPressEvent,
  type MapStyleElement,
  type Region,
} from "react-native-maps";
import { useColorScheme } from "nativewind";
import type { AppMapProps, AppMapMarker } from "./app-map.types";

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
  theme = "system",
  style,
  mapStyle,
}: AppMapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const { colorScheme } = useColorScheme();

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

  if (loading || !region || !shouldRenderMap) {
    return (
      <View style={[styles.container, styles.placeholder, style]}>
        <ActivityIndicator color="#f97316" />
        <Text selectable style={styles.placeholderText}>
          {loading ? "Loading map..." : "Initializing..."}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={[styles.map, mapStyle]}
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

      {!isMapReady && (
        <View pointerEvents="none" style={styles.loadingOverlay}>
          <ActivityIndicator color="#f97316" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 320, width: "100%" },
  map: { flex: 1, width: "100%" },
  placeholder: { alignItems: "center", backgroundColor: "#f9fafb", gap: 10, justifyContent: "center" },
  placeholderText: { color: "#4b5563", fontSize: 14, fontWeight: "600" },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, alignItems: "center", backgroundColor: "rgba(249, 250, 251, 0.72)", justifyContent: "center" },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 320,
    width: "100%",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    gap: 10,
    justifyContent: "center",
  },
  placeholderText: {
    color: "#4b5563",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: "rgba(249, 250, 251, 0.72)",
    justifyContent: "center",
  },
});
