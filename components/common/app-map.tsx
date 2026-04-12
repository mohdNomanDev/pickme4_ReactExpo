import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
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

export type AppMapMarker = {
  id?: string | number;
  lat: number;
  lng: number;
  title: string;
};

export type AppMapRoutePoint = {
  lat: number;
  lng: number;
};

type AppMapTheme = "light" | "dark" | "system";

type AppMapProps = {
  latitude?: number | null;
  longitude?: number | null;
  markers?: AppMapMarker[];
  route?: AppMapRoutePoint[];
  latitudeDelta?: number;
  longitudeDelta?: number;
  loading?: boolean;
  enableCurrentLocation?: boolean;
  theme?: AppMapTheme;
  style?: StyleProp<ViewStyle>;
  mapStyle?: StyleProp<ViewStyle>;
};

const DEFAULT_LATITUDE_DELTA = 0.012;
const DEFAULT_LONGITUDE_DELTA = 0.012;

const DARK_MAP_STYLE: MapStyleElement[] = [
  { elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#e5e7eb" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#111827" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d1d5db" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#263241" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#334155" }],
  },
];

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
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return {
    latitude,
    longitude,
  };
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
  theme = "system",
  style,
  mapStyle,
}: AppMapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const { colorScheme } = useColorScheme();

  const resolvedTheme = theme === "system" ? colorScheme : theme;

  const region = useMemo<Region | null>(() => {
    const coordinate = toLatLng(latitude, longitude);

    if (!coordinate) {
      return null;
    }

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
    () =>
      route.reduce<LatLng[]>((coordinates, point) => {
        const coordinate = toLatLng(point.lat, point.lng);

        if (coordinate) {
          coordinates.push(coordinate);
        }

        return coordinates;
      }, []),
    [route],
  );

  if (loading || !region) {
    return (
      <View style={[styles.container, styles.placeholder, style]}>
        <ActivityIndicator color="#f97316" />
        <Text selectable style={styles.placeholderText}>
          {loading ? "Loading map..." : "Location unavailable"}
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
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Selected location"
          pinColor="#f97316"
        />

        {validMarkers.map((marker, index) => (
          <Marker
            key={marker.id ?? `${marker.lat}-${marker.lng}-${index}`}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.title}
            pinColor="#f97316"
          />
        ))}

        {routeCoordinates.length > 1 ? (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#f97316"
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
          />
        ) : null}
      </MapView>

      {!isMapReady ? (
        <View pointerEvents="none" style={styles.loadingOverlay}>
          <ActivityIndicator color="#f97316" />
        </View>
      ) : null}
    </View>
  );
}

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
