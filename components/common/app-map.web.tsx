import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  type GestureResponderEvent,
  Linking,
  type LayoutChangeEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import type { AppMapProps } from "./app-map.types";
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
  showSearchBar = false,
  searchPlaceholder,
  onSelectPlace,
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

  const handlePlaceSelect = (place: { latitude: number; longitude: number; address: string }) => {
    const coordinate = { latitude: place.latitude, longitude: place.longitude };
    
    // Notify parent
    onSelectPlace?.(place);
    // Also trigger location change for the marker
    onLocationChange?.(coordinate);
  };

  if (
    loading ||
    !mapUrl ||
    !hasValidCoordinate ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return (
      <View 
        className="flex-1 min-h-[320px] w-full items-center bg-gray-50 dark:bg-gray-900 justify-center gap-[10px]"
        style={style}
      >
        <ActivityIndicator color="#f97316" />
        <Text selectable className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
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
      className={`flex-1 min-h-[320px] overflow-hidden w-full ${resolvedTheme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
      onLayout={handleLayout}
      style={style}
    >
      {showSearchBar && (
        <MapSearchBar 
          onSelectLocation={handlePlaceSelect}
          placeholder={searchPlaceholder}
        />
      )}

      {React.createElement("iframe", {
        src: mapUrl,
        title: selectedMarkerTitle,
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        style: { border: 0, height: "100%", width: "100%" },
      })}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Select map location"
        onPress={handleMapPress}
        className="absolute inset-0"
      />

      <View pointerEvents="none" className="bg-gray-50 dark:bg-gray-900 absolute top-0 left-0 w-[60px] h-[92px] rounded-br-lg" />

      <View className="absolute top-3 left-3 gap-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zoom in"
          onPress={() => handleZoom("in")}
          className="w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <Text className="text-gray-900 text-[22px] font-extrabold leading-6">+</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zoom out"
          onPress={() => handleZoom("out")}
          className="w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <Text className="text-gray-900 text-[22px] font-extrabold leading-6">-</Text>
        </Pressable>
      </View>

      <View className="absolute bottom-3 right-3" pointerEvents="box-none">
        <Pressable onPress={openMap} className="bg-primary rounded-lg px-3.5 py-2.5 shadow-md shadow-primary/20">
          <Text className="text-white text-[13px] font-bold">Open map</Text>
        </Pressable>
      </View>
    </View>
  );
}
