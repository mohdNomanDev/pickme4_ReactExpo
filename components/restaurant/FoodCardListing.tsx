import FilterButton from "@/components/common/FilterButton";
import FilterSheet from "@/components/common/FilterSheet";
import FoodFilter, { FoodFilterState } from "@/components/restaurant/FoodFilter";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useMemo, useCallback } from "react";
import { Text, View, useWindowDimensions, Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FoodCard from "./FoodCard";

type FoodItem = {
  name: string;
  category: string;
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
    const { width } = useWindowDimensions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FoodFilterState>(DEFAULT_FILTERS);

  // Responsive Grid Logic
  const numColumns = useMemo(() => (width > 1024 ? 2 : 1), [width]);
  const isWeb = Platform.OS === "web";

  // Extract unique categories dynamically from the passed food items
  const availableCategories = useMemo(() => {
    const catsSet = new Set<string>();
    foodItems.forEach(item => {
      if (item.category) {
        catsSet.add(item.category);
      }
    });
    return Array.from(catsSet);
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
      data = data.filter(item => item.category && filters.categories.includes(item.category));
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

  return (
    <View className="mt-8 flex-1">
      {/* Section Header */}
      <View
        className="flex-row items-center justify-between mb-5 w-full"
      >
        <Text
          className="flex-1 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight text-start pe-4"
        >
          {'All Dishes'}
        </Text>
        <FilterButton
          onPress={() => setIsFilterOpen(true)}
          isActive={isFilterOpen || activeFilterCount > 0}
        />
      </View>

      {/* List or Empty State */}
      {filteredData.length > 0 ? (
        <View className={`flex-row flex-wrap w-full gap-4 ${isWeb ? 'pb-6' : ''}`}>
          {filteredData.map((item, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.delay(index * 40).duration(500).springify()}
              style={{ width: numColumns === 1 ? '100%' : '48%' }}
            >
              <FoodCard data={item} />
            </Animated.View>
          ))}
        </View>
      ) : (
        <View className="items-center justify-center py-10">
          <View className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
            <Ionicons name="fast-food-outline" size={36} color="#9ca3af" />
          </View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
            {'No dishes found'}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center max-w-[250px] text-sm">
            {'Try adjusting your filters to see more dishes.'}
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
        title={'Filter Dishes'}
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
