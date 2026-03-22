import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import FilterButton from "@/components/common/FilterButton";
import FilterSheet from "@/components/common/FilterSheet";
import RestaurantCard, {
  Restaurant,
} from "@/components/restaurant/RestaurantCard";
import RestaurantFilter, {
  FilterState,
} from "@/components/restaurant/RestaurantFilter";
import { RootState } from "@/store/store";
import restaurantDataJson from "@/TestData/RestaurantData.json";

const restaurantData = restaurantDataJson as unknown as Restaurant[];

const DEFAULT_FILTERS: FilterState = {
  sortBy: "recommended",
  priceRange: "",
  rating: "",
  dietary: [],
};

const RestaurantCardList = () => {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { width } = useWindowDimensions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Determine active filter indicator count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sortBy !== "recommended") count++;
    if (filters.priceRange) count++;
    if (filters.rating) count++;
    if (filters.dietary.length > 0) count += filters.dietary.length;
    return count;
  }, [filters]);

  // Apply filtering and sorting logic
  const filteredData = useMemo(() => {
    let data = [...restaurantData];

    // 1. Filter by Rating
    if (filters.rating) {
      const minRating = parseFloat(filters.rating.replace("+", ""));
      data = data.filter((r) => r.rating >= minRating);
    }

    // 2. Filter by Price Range (using average item price)
    if (filters.priceRange) {
      const isOver100 = filters.priceRange === "100+";
      const [minStr, maxStr] = filters.priceRange.split("-");
      const min = parseInt(minStr, 10);
      const max = isOver100 ? Infinity : parseInt(maxStr, 10);

      data = data.filter((r) => {
        if (!r.foodItems || r.foodItems.length === 0) return false;
        const avgPrice =
          r.foodItems.reduce((sum, item) => sum + (item.price || 0), 0) /
          r.foodItems.length;
        return avgPrice >= min && avgPrice <= max;
      });
    }

    // 3. Filter by Dietary (Mock mappings for demonstration)
    if (filters.dietary.length > 0) {
      data = data.filter((r) => {
        return filters.dietary.some((diet) => {
          const d = diet.toLowerCase();
          if (d === "halal") return true; // Assume all mock data is halal
          if (d === "vegetarian" || d === "vegan" || d === "gluten-free") {
            return (
              r.tags?.includes("healthy") ||
              r.cuisine?.en.toLowerCase() === "healthy"
            );
          }
          return r.tags?.includes(d);
        });
      });
    }

    // 4. Sort By
    if (filters.sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "delivery_time") {
      const parseTime = (time: string) => {
        const match = time.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 999;
      };
      data.sort(
        (a, b) => parseTime(a.deliveryTime) - parseTime(b.deliveryTime)
      );
    } else if (filters.sortBy === "price_low_high") {
      const getAvgPrice = (r: Restaurant) =>
        r.foodItems?.length
          ? r.foodItems.reduce((sum, item) => sum + (item.price || 0), 0) /
            r.foodItems.length
          : Number.MAX_SAFE_INTEGER;
      data.sort((a, b) => getAvgPrice(a) - getAvgPrice(b));
    }

    return data;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  // Determine number of columns based on screen width
  const numColumns = useMemo(
    () => (width > 1024 ? 3 : width > 768 ? 2 : 1),
    [width]
  );

  const isWeb = Platform.OS === "web";

  const renderItem = useCallback(
    ({ item, index }: { item: Restaurant; index: number }) => (
      <Animated.View
        entering={FadeInDown.delay(index * 50)
          .duration(600)
          .springify()}
        style={{ flex: 1 / numColumns }}
      >
        <RestaurantCard restaurant={item} />
      </Animated.View>
    ),
    [numColumns]
  );

  const ListHeader = useMemo(
    () => (
      <Animated.View
        entering={FadeInDown.duration(600).springify()}
        className="mb-8"
      >
        <View
          className="flex-row items-center justify-between w-full"
        >
          <Text
            className={`flex-1 pr-4 text-2xl md:text-3xl font-display font-bold text-text dark:text-text-dark text-start pe-4`}
          >
            {filteredData.length} {t("restaurant.count_header")}
          </Text>

          <FilterButton
            onPress={() => setIsFilterOpen(true)}
            isActive={isFilterOpen || activeFilterCount > 0}
          />
        </View>
        <View
          className={`h-1.5 w-12 bg-primary rounded-full mt-2 self-start`}
        />
      </Animated.View>
    ),
    [isRTL, t, isFilterOpen, activeFilterCount, filteredData.length]
  );

  const ListEmpty = useMemo(
    () => (
      <View className="flex-1 items-center justify-center py-20">
        <View className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-6">
          <Ionicons name="search-outline" size={48} color="#9ca3af" />
        </View>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {isRTL ? "لم يتم العثور على مطاعم" : "No restaurants found"}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
          {isRTL 
            ? "حاول تغيير أو مسح بعض فلاتر البحث لرؤية المزيد من النتائج." 
            : "Try adjusting or clearing some filters to see more results."}
        </Text>
      </View>
    ),
    [isRTL]
  );

  const keyExtractor = useCallback(
    (item: Restaurant) => item.id.toString(),
    []
  );

  return (
    <View className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <FlatList
        data={filteredData}
        key={numColumns} // Force re-render when column count changes
        numColumns={numColumns}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          numColumns > 1 ? { gap: 24, marginBottom: 24 } : undefined
        }
        contentContainerStyle={{
          paddingBottom: 40,
          ...(isWeb && numColumns > 1 ? { paddingHorizontal: 4 } : {}),
        }}
        // Performance Props
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS !== "web"} // Improves memory on native
      />

      <FilterSheet
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        resultsCount={filteredData.length}
      >
        <RestaurantFilter filters={filters} setFilters={setFilters} />
      </FilterSheet>
    </View>
  );
};

export default RestaurantCardList;
