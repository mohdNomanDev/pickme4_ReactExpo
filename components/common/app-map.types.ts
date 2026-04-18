import type { StyleProp, ViewStyle } from "react-native";

export type AppMapCoordinate = {
  latitude: number;
  longitude: number;
};

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

export type AppMapTheme = "light" | "dark" | "system";

export type AppMapProps = {
  latitude?: number | null;
  longitude?: number | null;
  markers?: AppMapMarker[];
  route?: AppMapRoutePoint[];
  latitudeDelta?: number;
  longitudeDelta?: number;
  loading?: boolean;
  enableCurrentLocation?: boolean;
  draggableMarker?: boolean;
  selectedMarkerTitle?: string;
  onLocationChange?: (coordinate: AppMapCoordinate) => void;
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  onSelectPlace?: (place: { latitude: number; longitude: number; address: string }) => void;
  theme?: AppMapTheme;
  style?: StyleProp<ViewStyle>;
  mapStyle?: StyleProp<ViewStyle>;
};
