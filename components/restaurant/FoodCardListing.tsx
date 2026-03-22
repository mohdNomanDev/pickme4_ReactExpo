import FilterButton from "@/components/common/FilterButton";
import FilterSheet from "@/components/common/FilterSheet";
import FoodFilter, { FoodFilterState } from "@/components/restaurant/FoodFilter";
import { useRTL } from "@/hooks/useRTL";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useMemo, useCallback } from "react";
import { FlatList, Text, View, useWindowDimensions, Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FoodCard from "./FoodCard";

type LocalizedString = {
  en: string;
  ar: string;
};

type FoodItem = {
  name: LocalizedString;
  category: LocalizedString;
  image: string;
  price: number;
};

type Props = {
  foodItems: FoodItem[];
};

const DEFAULT_FILTERS: FoodFilterState = {
  sortBy: "recommended",
  priceRange: "",
  categories: [],
};

const FoodCardListing = ({ foodItems }: Props) => {
  const { isRTL } = useRTL();
  const { width } = useWindowDimensions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FoodFilterState>(DEFAULT_FILTERS);

  // Responsive Grid Logic
  const numColumns = useMemo(() => (width > 1024 ? 2 : 1), [width]);
  const isWeb = Platform.OS === "web";

  // Extract unique categories dynamically from the passed food items
  const availableCategories = useMemo(() => {
    const catsMap = new Map<string, LocalizedString>();
    foodItems.forEach(item => {
      if (item.category && item.category.en) {
        catsMap.set(item.category.en, item.category);
      }
    });
    return Array.from(catsMap.values());
  }, [foodItems]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sortBy !== "recommended") count++;
    if (filters.priceRange) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    return count;
  }, [filters]);

  const filteredData = useMemo(() => {
    let data = [...foodItems];

    // Filter by Category
    if (filters.categories.length > 0) {
      data = data.filter(item => item.category && filters.categories.includes(item.category.en));
    }

    // Filter by Price Range
    if (filters.priceRange) {
      const isOver100 = filters.priceRange === "100+";
      const [minStr, maxStr] = filters.priceRange.split("-");
      const min = parseInt(minStr, 10);
      const max = isOver100 ? Infinity : parseInt(maxStr, 10);

      data = data.filter(item => {
        const price = item.price || 0;
        return price >= min && price <= max;
      });
    }

    // Sort By
    if (filters.sortBy === "price_low_high") {
      data.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (filters.sortBy === "price_high_low") {
      data.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return data;
  }, [foodItems, filters]);

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const renderItem = useCallback(({ item, index }: { item: FoodItem; index: number }) => {
    return (
      <Animated.View 
        entering={FadeInDown.delay(index * 40).duration(500).springify()}
        style={{ flex: 1 / numColumns }}
      >
        <FoodCard data={item} />
      </Animated.View>
    );
  }, [numColumns]);

  return (
    <View className="mt-8 flex-1">
      {/* Section Header */}
      <View
        className="flex-row items-center justify-between mb-5 w-full"
      >
        <Text
          className="flex-1 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight text-start pe-4"
        >
          {isRTL ? "جميع الأطباق" : "All Dishes"}
        </Text>
        <FilterButton
          onPress={() => setIsFilterOpen(true)}
          isActive={isFilterOpen || activeFilterCount > 0}
        />
      </View>

      {/* List or Empty State */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          key={numColumns} // Force re-render on grid size change
          numColumns={numColumns}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false} // Disabled because it is rendered inside a ScrollView in RestaurantMenu
          columnWrapperStyle={numColumns > 1 ? { gap: 16, marginBottom: 16 } : undefined}
          contentContainerStyle={{ 
            gap: numColumns === 1 ? 16 : 0, 
            ...(isWeb ? { paddingBottom: 24 } : {}) 
          }}
          showsVerticalScrollIndicator={false}
          // Performance
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      ) : (
        <View className="items-center justify-center py-10">
          <View className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
            <Ionicons name="fast-food-outline" size={36} color="#9ca3af" />
          </View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
            {isRTL ? "لم يتم العثور على أطباق" : "No dishes found"}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center max-w-[250px] text-sm">
            {isRTL 
              ? "حاول تغيير فلاتر البحث لرؤية المزيد من الأطباق." 
              : "Try adjusting your filters to see more dishes."}
          </Text>
        </View>
      )}

      {/* Filter Modal */}
      <FilterSheet
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        resultsCount={filteredData.length}
        title={isRTL ? "تصفية الأطباق" : "Filter Dishes"}
      >
        <FoodFilter 
          filters={filters} 
          setFilters={setFilters} 
          availableCategories={availableCategories} 
        />
      </FilterSheet>
    </View>
  );
};

export default FoodCardListing;
