import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  type GestureResponderEvent,
  Linking,
  type LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import type { AppMapProps } from "./app-map.types";

export type {
  AppMapCoordinate,
  AppMapMarker,
  AppMapProps,
  AppMapRoutePoint,
  AppMapTheme,
} from "./app-map.types";

const DEFAULT_LATITUDE_DELTA = 0.012;
const DEFAULT_LONGITUDE_DELTA = 0.012;
const MIN_MAP_DELTA = 0.002;
const MAX_MAP_DELTA = 0.18;
const ZOOM_FACTOR = 2;

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

function getPressOffset(event: GestureResponderEvent, width: number, height: number) {
  const nativeEvent = event.nativeEvent as GestureResponderEvent["nativeEvent"] & {
    clientX?: number;
    clientY?: number;
    offsetX?: number;
    offsetY?: number;
  };

  const directX =
    typeof nativeEvent.locationX === "number" && Number.isFinite(nativeEvent.locationX)
      ? nativeEvent.locationX
      : nativeEvent.offsetX;
  const directY =
    typeof nativeEvent.locationY === "number" && Number.isFinite(nativeEvent.locationY)
      ? nativeEvent.locationY
      : nativeEvent.offsetY;

  const target = event.currentTarget as unknown as {
    getBoundingClientRect?: () => { left: number; top: number };
  };
  const rect = target.getBoundingClientRect?.();
  const x =
    typeof directX === "number" && Number.isFinite(directX)
      ? directX
      : rect && typeof nativeEvent.clientX === "number"
        ? nativeEvent.clientX - rect.left
        : null;
  const y =
    typeof directY === "number" && Number.isFinite(directY)
      ? directY
      : rect && typeof nativeEvent.clientY === "number"
        ? nativeEvent.clientY - rect.top
        : null;

  if (
    x === null ||
    y === null ||
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    x < 0 ||
    x > width ||
    y < 0 ||
    y > height
  ) {
    return null;
  }

  return { x, y };
}

function buildOpenStreetMapUrl(
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
) {
  const south = latitude - latitudeDelta;
  const north = latitude + latitudeDelta;
  const west = longitude - longitudeDelta;
  const east = longitude + longitudeDelta;
  const marker = `${latitude},${longitude}`;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${west},${south},${east},${north}&layer=mapnik&marker=${marker}`;
}

export default function AppMap({
  latitude,
  longitude,
  latitudeDelta = DEFAULT_LATITUDE_DELTA,
  longitudeDelta = DEFAULT_LONGITUDE_DELTA,
  loading = false,
  onLocationChange,
  selectedMarkerTitle = "Selected location",
  theme = "system",
  style,
}: AppMapProps) {
  const { colorScheme } = useColorScheme();
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [viewDelta, setViewDelta] = useState({
    latitudeDelta,
    longitudeDelta,
  });
  const resolvedTheme = theme === "system" ? colorScheme : theme;
  const hasValidCoordinate = isValidCoordinate(latitude, longitude);

  useEffect(() => {
    setViewDelta({
      latitudeDelta,
      longitudeDelta,
    });
  }, [latitudeDelta, longitudeDelta]);

  const mapUrl = useMemo(() => {
    if (!hasValidCoordinate || typeof latitude !== "number" || typeof longitude !== "number") {
      return null;
    }

    return buildOpenStreetMapUrl(
      latitude,
      longitude,
      viewDelta.latitudeDelta,
      viewDelta.longitudeDelta,
    );
  }, [hasValidCoordinate, latitude, longitude, viewDelta.latitudeDelta, viewDelta.longitudeDelta]);

  if (
    loading ||
    !mapUrl ||
    !hasValidCoordinate ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return (
      <View style={[styles.container, styles.placeholder, style]}>
        <ActivityIndicator color="#f97316" />
        <Text selectable style={styles.placeholderText}>
          {loading ? "Loading map..." : "Location unavailable"}
        </Text>
      </View>
    );
  }

  const openMap = () => {
    void Linking.openURL(
      `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`,
    );
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setLayout({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  const handleMapPress = (event: GestureResponderEvent) => {
    if (!onLocationChange || layout.width <= 0 || layout.height <= 0) {
      return;
    }

    const offset = getPressOffset(event, layout.width, layout.height);

    if (!offset) {
      return;
    }

    const south = latitude - viewDelta.latitudeDelta;
    const north = latitude + viewDelta.latitudeDelta;
    const west = longitude - viewDelta.longitudeDelta;
    const east = longitude + viewDelta.longitudeDelta;
    const xRatio = offset.x / layout.width;
    const yRatio = offset.y / layout.height;
    const nextCoordinate = {
      latitude: north - (north - south) * yRatio,
      longitude: west + (east - west) * xRatio,
    };

    if (isValidCoordinate(nextCoordinate.latitude, nextCoordinate.longitude)) {
      onLocationChange(nextCoordinate);
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    const zoomMultiplier = direction === "in" ? 1 / ZOOM_FACTOR : ZOOM_FACTOR;

    setViewDelta((currentDelta) => ({
      latitudeDelta: Math.min(
        MAX_MAP_DELTA,
        Math.max(MIN_MAP_DELTA, currentDelta.latitudeDelta * zoomMultiplier),
      ),
      longitudeDelta: Math.min(
        MAX_MAP_DELTA,
        Math.max(MIN_MAP_DELTA, currentDelta.longitudeDelta * zoomMultiplier),
      ),
    }));
  };

  return (
    <View
      style={[
        styles.container,
        resolvedTheme === "dark" ? styles.darkContainer : styles.lightContainer,
        style,
      ]}
      onLayout={handleLayout}
    >
      {React.createElement("iframe", {
        src: mapUrl,
        title: selectedMarkerTitle,
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        style: styles.iframe,
      })}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Select map location"
        onPress={handleMapPress}
        style={styles.selectionLayer}
      />

      <View pointerEvents="none" style={styles.defaultZoomControlCover} />

      <View style={styles.zoomControls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zoom in"
          onPress={() => handleZoom("in")}
          style={styles.zoomButton}
        >
          <Text style={styles.zoomButtonText}>+</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zoom out"
          onPress={() => handleZoom("out")}
          style={styles.zoomButton}
        >
          <Text style={styles.zoomButtonText}>-</Text>
        </Pressable>
      </View>

      <View style={styles.webOverlay} pointerEvents="box-none">
        <Pressable onPress={openMap} style={styles.openButton}>
          <Text style={styles.openButtonText}>Open map</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 320,
    overflow: "hidden",
    width: "100%",
  },
  lightContainer: {
    backgroundColor: "#f9fafb",
  },
  darkContainer: {
    backgroundColor: "#111827",
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
  iframe: {
    borderWidth: 0,
    height: "100%",
    width: "100%",
  },
  selectionLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  defaultZoomControlCover: {
    backgroundColor: "#f9fafb",
    borderBottomRightRadius: 8,
    height: 92,
    left: 0,
    position: "absolute",
    top: 0,
    width: 60,
  },
  zoomControls: {
    gap: 8,
    left: 12,
    position: "absolute",
    top: 12,
  },
  zoomButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  zoomButtonText: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 24,
  },
  webOverlay: {
    bottom: 12,
    position: "absolute",
    right: 12,
  },
  openButton: {
    backgroundColor: "#f97316",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  openButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
});
