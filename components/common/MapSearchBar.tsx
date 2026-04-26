import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface Suggestion {
  id: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface MapSearchBarProps {
  onSelectLocation: (location: { latitude: number; longitude: number; address: string }) => void;
  placeholder?: string;
  containerStyle?: string;
}

/**
 * A reusable search bar for the map that provides place suggestions.
 * Uses Photon API (OSM-based) by default as a high-quality free alternative to Google Places.
 */
export default function MapSearchBar({
  onSelectLocation,
  placeholder = "Search for a place...",
  containerStyle = "",
}: MapSearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (!text || text.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Photon API is an excellent free alternative to Google Places
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=5`
      );
      const data = await response.json();

      const results = data.features.map((feature: any) => {
        const { properties, geometry } = feature;
        const name = properties.name || "";
        const city = properties.city || "";
        const state = properties.state || "";
        const country = properties.country || "";
        
        const description = [name, city, state, country]
          .filter(Boolean)
          .join(", ");

        return {
          id: `${geometry.coordinates[1]}-${geometry.coordinates[0]}`,
          description,
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        };
      });

      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.length >= 3) {
      timeoutRef.current = setTimeout(() => {
        fetchSuggestions(query);
      }, 500); // 500ms debounce
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, fetchSuggestions]);

  const handleSelect = (item: Suggestion) => {
    setQuery(item.description);
    setShowSuggestions(false);
    onSelectLocation({
      latitude: item.latitude,
      longitude: item.longitude,
      address: item.description,
    });
    Keyboard.dismiss();
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <View className={`absolute top-4 left-4 right-4 z-[1000] ${containerStyle}`}>
      {/* Search Input Container */}
      <View 
        className={`flex-row items-center px-4 h-12 rounded-full shadow-lg border ${
          isDark 
            ? "bg-gray-800 border-gray-700 shadow-black/40" 
            : "bg-white border-gray-100 shadow-gray-200"
        }`}
      >
        <Ionicons 
          name="search" 
          size={20} 
          color={isDark ? "#9CA3AF" : "#6B7280"} 
        />
        
        <TextInput
          className={`flex-1 ml-2 text-base ${isDark ? "text-white" : "text-gray-900"}`}
          placeholder={placeholder}
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          value={query}
          onChangeText={setQuery}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
          autoCorrect={false}
          clearButtonMode="never"
        />

        {isLoading ? (
          <ActivityIndicator size="small" color="#f97316" />
        ) : query.length > 0 ? (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={isDark ? "#9CA3AF" : "#6B7280"} 
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Suggestions List */}
      {showSuggestions && suggestions.length > 0 && (
        <View 
          className={`mt-2 rounded-2xl shadow-xl overflow-hidden border ${
            isDark 
              ? "bg-gray-800 border-gray-700 shadow-black/60" 
              : "bg-white border-gray-100 shadow-gray-300"
          }`}
          style={{ maxHeight: 240 }}
        >
          <ScrollView keyboardShouldPersistTaps="always">
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSelect(item)}
                className={`flex-row items-center px-4 py-3 border-b ${
                  isDark ? "border-gray-700 active:bg-gray-700" : "border-gray-50 active:bg-gray-50"
                }`}
              >
                <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                  isDark ? "bg-gray-700" : "bg-orange-50"
                }`}>
                  <Ionicons name="location" size={16} color="#f97316" />
                </View>
                <Text 
                  className={`flex-1 text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
