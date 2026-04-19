import { Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Restaurant } from "@/components/restaurant/RestaurantCard";
import RestaurantCardList from "@/components/restaurant/RestaurantCardList";
import restaurantDataJson from "@/TestData/RestaurantData.json";

const ALL_RESTAURANTS = restaurantDataJson as unknown as Restaurant[];

const POPULAR_CATEGORIES = [
  { id: "1", name: "Pizza", icon: "pizza-outline" },
  { id: "2", name: "Burger", icon: "fast-food-outline" },
  { id: "3", name: "Biryani", icon: "restaurant-outline" },
  { id: "4", name: "Chicken", icon: "flame-outline" },
];

const RECENT_SEARCHES = ["Shawarma", "Arabic Coffee", "Pasta", "Healthy Salad"];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  // Debounce logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDebouncedQuery("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Search logic
  const filteredRestaurants = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const query = debouncedQuery.toLowerCase();
    
    return ALL_RESTAURANTS.map((restaurant) => {
      // Extract matched food items
      const matchedFoodItems = restaurant.foodItems?.filter((item) =>
        item.name.toLowerCase().includes(query),
      ) || [];

      // 1. Search by restaurant name
      const nameMatch = restaurant.name.toLowerCase().includes(query);

      // 2. Search by cuisine
      const cuisineMatch = restaurant.cuisine?.toLowerCase().includes(query);

      // 3. Search by food items (already covered by matchedFoodItems.length > 0)
      const foodItemMatch = matchedFoodItems.length > 0;

      // 4. Search by tags
      const tagMatch = restaurant.tags?.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      if (nameMatch || cuisineMatch || foodItemMatch || tagMatch) {
        return {
          ...restaurant,
          matchedFoodItems: foodItemMatch ? matchedFoodItems : [],
        };
      }
      return null;
    }).filter(Boolean) as Restaurant[];
  }, [debouncedQuery]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    Keyboard.dismiss();
  }, []);

  const handleCategoryPress = useCallback((category: string) => {
    setSearchQuery(category);
  }, []);

  const renderSearchHeader = () => (
    <View className="bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <View className="max-w-5xl mx-auto w-full px-4 py-3">
        <View className="flex-row items-center px-4 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary/30">
          <Ionicons name="search" size={20} color="#f97316" />
          <TextInput
            ref={searchInputRef}
            className="flex-1 ml-3 text-base font-medium text-gray-900 dark:text-white"
            placeholder="Search food or restaurants..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} hitSlop={10}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <Animated.ScrollView
      entering={FadeIn}
      className="flex-1"
      showsVerticalScrollIndicator={false}
    >
      <View className="max-w-5xl mx-auto w-full px-4 pt-6 pb-24">
        {/* Recent Searches */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Searches
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-primary">
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {RECENT_SEARCHES.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleCategoryPress(item)}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <Text className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Categories */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Popular Categories
          </Text>
          <View className="flex-row flex-wrap">
            {POPULAR_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => handleCategoryPress(cat.name)}
                className="items-center mb-6 w-1/4"
              >
                <View className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 items-center justify-center mb-2">
                  <Ionicons name={cat.icon as any} size={28} color="#f97316" />
                </View>
                <Text className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Discover Banner */}
        <View className="p-6 rounded-3xl bg-primary/10 border border-primary/20 overflow-hidden relative">
          <View className="z-10">
            <Text className="text-xl font-bold text-primary mb-1">
              Cravings? We got you!
            </Text>
            <Text className="text-sm text-primary/80 font-medium">
              Find the best deals near you
            </Text>
          </View>
          <View className="absolute right-[-10] bottom-[-10] opacity-10">
            <Ionicons name="fast-food" size={100} color="#f97316" />
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );

  const renderNoResults = () => (
    <Animated.View entering={FadeInDown} className="flex-1 px-6">
      <View className="max-w-md mx-auto w-full items-center justify-center py-20">
        <View className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-6">
          <Ionicons name="search-outline" size={48} color="#9ca3af" />
        </View>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          No results found for `{debouncedQuery}`
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center max-w-xs leading-5">
          Try checking for typos or use more general keywords like `Pizza` or
          `Burger`
        </Text>
        <TouchableOpacity
          onPress={handleClearSearch}
          className="mt-6 px-6 py-3 bg-primary rounded-2xl"
        >
          <Text className="text-white font-bold">Clear Search</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-white dark:bg-background-dark"
    >
      {renderSearchHeader()}

      <View className="flex-1">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#f97316" />
            <Text className="mt-4 text-gray-500 font-medium">
              Searching deliciousness...
            </Text>
          </View>
        ) : !searchQuery.trim() ? (
          renderEmptyState()
        ) : filteredRestaurants.length > 0 ? (
          <View className="flex-1 max-w-5xl mx-auto w-full pb-24">
            <RestaurantCardList
              data={filteredRestaurants}
              title={`Results for "${debouncedQuery}"`}
              maxDistance={50} // Higher limit for search results
            />
          </View>
        ) : (
          renderNoResults()
        )}
      </View>
    </SafeAreaView>
  );
}
