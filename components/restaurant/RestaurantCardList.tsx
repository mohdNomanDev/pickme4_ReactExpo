import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import FilterButton from "@/components/common/FilterButton";
import FilterSheet from "@/components/common/FilterSheet";
import RestaurantCard, {
  Restaurant,
} from "@/components/restaurant/RestaurantCard";
import RestaurantFilter, {
  FilterState,
} from "@/components/restaurant/RestaurantFilter";
import restaurantDataJson from "@/TestData/RestaurantData.json";
import { useCurrentLocationRestaurants } from "@/hooks/useCurrentLocationRestaurants";

const restaurantData = restaurantDataJson as unknown as Restaurant[];

const DEFAULT_FILTERS: FilterState = {
  sortBy: "recommended",
  priceRange: "",
  rating: "",
  dietary: [],
};

interface RestaurantCardListProps {
  headerContent?: React.ReactNode;
  maxDistance?: number;
  title?: string;
  limit?: number;
}

/**
 * RestaurantCardList Component
 * Optimized for high-performance rendering of restaurant feeds.
 * NOTE: For production scalability, consider replacing FlatList with @shopify/flash-list.
 */
const RestaurantCardList = ({ headerContent, maxDistance = 10000, title, limit }: RestaurantCardListProps) => {
  const { width } = useWindowDimensions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Use hook to get restaurants based on active location
  const { 
    restaurants: restaurantsWithDistance,
    activeLocationName 
  } = useCurrentLocationRestaurants(restaurantData, maxDistance);

  // Active filter indicator count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sortBy !== "recommended") count++;
    if (filters.priceRange) count++;
    if (filters.rating) count++;
    if (filters.dietary.length > 0) count += filters.dietary.length;
    return count;
  }, [filters]);

  // Optimized filtering and sorting logic
  const filteredData = useMemo(() => {
    if (!restaurantsWithDistance) return [];
    
    let data = [...restaurantsWithDistance];

    // 1. Filter by Rating
    if (filters.rating) {
      const minRating = parseFloat(filters.rating.replace("+", ""));
      data = data.filter((r) => r.rating >= minRating);
    }

    // 2. Filter by Price Range
    if (filters.priceRange) {
      const isOver100 = filters.priceRange === "100+";
      const [minStr, maxStr] = filters.priceRange.split("-");
      const min = parseInt(minStr, 10);
      const max = isOver100 ? Infinity : parseInt(maxStr, 10);

      data = data.filter((r) => {
        if (!r.foodItems || r.foodItems.length === 0) return false;
        // Optimization: Use a simpler price check or pre-calculated average
        const avgPrice = r.foodItems[0]?.price || 0; // Simple fallback for performance
        return avgPrice >= min && avgPrice <= max;
      });
    }

    // 3. Filter by Dietary
    if (filters.dietary.length > 0) {
      const activeDiets = filters.dietary.map(d => d.toLowerCase());
      data = data.filter((r) => {
        return activeDiets.some((d) => {
          if (d === "halal") return true; 
          return r.tags?.some(tag => tag.toLowerCase() === d) || r.cuisine?.toLowerCase() === d;
        });
      });
    }

    // 4. Sort By (Optimized sorting with pre-calculated values where possible)
    if (filters.sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "distance") {
      data.sort((a, b) => (a.distanceValue || 0) - (b.distanceValue || 0));
    } else if (filters.sortBy === "delivery_time") {
      const getTime = (t: string) => parseInt(t.match(/\d+/)?.[0] || "999", 10);
      data.sort((a, b) => getTime(a.deliveryTime) - getTime(b.deliveryTime));
    }

    return data;
  }, [filters, restaurantsWithDistance]);

  const displayedData = useMemo(() => {
    if (limit && limit > 0) {
      return filteredData.slice(0, limit);
    }
    return filteredData;
  }, [filteredData, limit]);

  const dynamicTitle = useMemo(() => {
    if (title) return title;
    
    let base = maxDistance < 1000 ? "Nearby Restaurants" : "All Restaurants";
    
    const parts = [];
    if (filters.priceRange) {
      const priceText = filters.priceRange === "100+" ? "over 100 SAR" : `${filters.priceRange} SAR`;
      parts.push(priceText);
    }
    if (filters.rating) parts.push(`${filters.rating} stars`);
    
    if (parts.length > 0) {
      return `${base} (${parts.join(" & ")})`;
    }
    
    return base;
  }, [title, maxDistance, filters]);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  // Responsive column count
  const numColumns = useMemo(
    () => (width > 1024 ? 3 : width > 768 ? 2 : 1),
    [width],
  );

  // Optimized Render Item
  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <View 
        className={numColumns > 1 ? "px-3" : ""} 
        style={{ flex: 1 / numColumns }}
      >
        <RestaurantCard restaurant={item} />
      </View>
    ),
    [numColumns],
  );

  const ListHeader = useMemo(
    () => (
      <View className="px-1">
        {headerContent}
        <View className="mb-8 mt-4">
          <View className="flex-row items-center justify-between w-full">
            <View className="flex-1 pr-4">
              <Text className="text-2xl md:text-3xl font-display font-bold text-text dark:text-text-dark text-start capitalize">
                {dynamicTitle}
              </Text>
              <Text className="text-sm text-text-muted dark:text-text-muted-dark mt-1 font-medium">
                {filteredData.length} results {activeLocationName ? `near ${activeLocationName}` : ""}
              </Text>
            </View>
            <FilterButton
              onPress={() => setIsFilterOpen(true)}
              isActive={isFilterOpen || activeFilterCount > 0}
            />
          </View>
          <View className="h-1.5 w-12 bg-primary rounded-full mt-2 self-start" />
        </View>
      </View>
    ),
    [isFilterOpen, activeFilterCount, filteredData.length, headerContent, activeLocationName, dynamicTitle],
  );

  const ListEmpty = useCallback(
    () => (
      <View className="flex-1 items-center justify-center py-20">
        <View className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-6">
          <Ionicons name="search-outline" size={48} color="#9ca3af" />
        </View>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          No restaurants found
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
          Try adjusting or clearing some filters to see more results.
        </Text>
      </View>
    ),
    [],
  );

  return (
    <View className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <FlatList
        data={displayedData}
        key={numColumns} // Necessary for FlatList to re-layout grid
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
        
        // Performance Optimizations
        removeClippedSubviews={Platform.OS !== "web"}
        initialNumToRender={width > 768 ? 10 : 6}
        maxToRenderPerBatch={width > 768 ? 12 : 8}
        windowSize={Platform.OS === "web" ? 21 : 5}
        updateCellsBatchingPeriod={50}
      />

      <FilterSheet
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        resultsCount={displayedData.length}
      >
        <RestaurantFilter filters={filters} setFilters={setFilters} />
      </FilterSheet>
    </View>
  );
};

export default RestaurantCardList;
