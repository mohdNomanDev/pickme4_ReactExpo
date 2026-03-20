import { useRTL } from "@/hooks/useRTL";
import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../store/bookmarkSlice";

/**
 * LocalizedString and FoodItem types for type safety
 */
type LocalizedString = {
  en: string;
  ar: string;
};

type FoodItem = {
  name: LocalizedString;
  image: string;
  price?: string;
};

export type Restaurant = {
  id: number;
  name: LocalizedString;
  foodItems: FoodItem[];
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  cuisine?: LocalizedString;
  offer?: string;
  area?: LocalizedString;
};

type RestaurantCardProps = {
  restaurant: Restaurant;
};

/**
 * RestaurantCard Component
 * Optimized for performance and high-quality UI/UX in Saudi market.
 */
const RestaurantCard = memo(({ restaurant }: RestaurantCardProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { isRTL, lang, rowClass, getGapClass, textAlign } = useRTL();

  // Optimized State Selectors
  const isBookmarked = useSelector((state: RootState) =>
    restaurant?.id ? state.bookmark.value.includes(restaurant.id) : false,
  );

  // Memoized Calculations
  const currentFood = useMemo(
    () => restaurant?.foodItems?.[currentIndex],
    [restaurant?.foodItems, currentIndex],
  );

  const restaurantName = useMemo(
    () => restaurant?.name?.[lang] || restaurant?.name?.["en"],
    [restaurant?.name, lang],
  );
  const cuisineName = useMemo(
    () => restaurant?.cuisine?.[lang] || restaurant?.cuisine?.["en"],
    [restaurant?.cuisine, lang],
  );
  const areaName = useMemo(
    () => restaurant?.area?.[lang] || restaurant?.area?.["en"],
    [restaurant?.area, lang],
  );

  // Memoized Event Handlers
  const handleNext = useCallback(
    (e?: any) => {
      e?.stopPropagation?.();
      if (!restaurant?.foodItems?.length) return;
      setCurrentIndex((prev) => (prev + 1) % restaurant.foodItems.length);
    },
    [restaurant?.foodItems?.length],
  );

  const handlePrev = useCallback(
    (e?: any) => {
      e?.stopPropagation?.();
      if (!restaurant?.foodItems?.length) return;
      setCurrentIndex((prev) =>
        prev === 0 ? restaurant.foodItems.length - 1 : prev - 1,
      );
    },
    [restaurant?.foodItems?.length],
  );

  const handleToggleBookmark = useCallback(() => {
    if (restaurant?.id) {
      dispatch(toggleBookmark(restaurant.id));
    }
  }, [dispatch, restaurant?.id]);

  const handleNavigateToMenu = useCallback(() => {
    router.push("/restaurant/RestaurantMenu");
  }, [router]);

  if (!restaurant) return null;

  const { id, foodItems, rating, deliveryTime, deliveryFee, offer } =
    restaurant;

  return (
    <View className="mb-6 bg-card dark:bg-card-dark rounded-[32px] overflow-hidden border border-border dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
      <TouchableOpacity
        activeOpacity={0.9}
        className="flex-1"
        onPress={handleNavigateToMenu}
      >
        {/* IMAGE SECTION */}
        <View className="relative h-60 w-full overflow-hidden">
          <Animated.View
            key={currentIndex}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
            style={{ width: "100%", height: "100%" }}
          >
            <Image
              source={currentFood?.image}
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
              style={{ width: "100%", height: "100%" }}
              className="bg-gray-100 dark:bg-gray-800"
            />
          </Animated.View>

          {/* Top Overlays */}
          <View
            className={`absolute top-4 left-4 right-4 items-start ${rowClass} justify-between z-10`}
          >
            {offer ? (
              <View className="bg-primary px-3 py-1.5 rounded-2xl shadow-lg shadow-primary/30">
                <Text className="text-white text-[10px] font-bold uppercase tracking-widest">
                  {offer}
                </Text>
              </View>
            ) : (
              <View />
            )}

            <Pressable
              onPress={handleToggleBookmark}
              hitSlop={10}
              className="w-11 h-11 rounded-full bg-white/90 dark:bg-black/40 items-center justify-center backdrop-blur-xl border border-white/20"
            >
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={22}
                color={isBookmarked ? "#f27f0d" : "#4b5563"}
              />
            </Pressable>
          </View>

          {/* Bottom Overlays: Food Info Slider */}
          <View className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <View className={`${rowClass} justify-between items-end`}>
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className={`text-white text-base font-bold mb-0.5 ${textAlign}`}
                >
                  {currentFood?.name?.[lang] || currentFood?.name?.["en"]}
                </Text>
                {currentFood?.price && (
                  <Text
                    className={`text-primary font-bold text-sm ${textAlign}`}
                  >
                    {currentFood.price}
                  </Text>
                )}
              </View>

              {/* Slider Controls */}
              {foodItems?.length > 1 && (
                <View
                  className={`${rowClass} ${getGapClass(2.5)} items-center mb-1`}
                >
                  <TouchableOpacity
                    onPress={handlePrev}
                    hitSlop={8}
                    className="w-9 h-9 rounded-full bg-white/25 items-center justify-center backdrop-blur-lg border border-white/10"
                  >
                    <Ionicons
                      name={isRTL ? "chevron-forward" : "chevron-back"}
                      size={18}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNext}
                    hitSlop={8}
                    className="w-9 h-9 rounded-full bg-white/25 items-center justify-center backdrop-blur-lg border border-white/10"
                  >
                    <Ionicons
                      name={isRTL ? "chevron-back" : "chevron-forward"}
                      size={18}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Dot Indicator */}
            {foodItems?.length > 1 && (
              <View
                className={`flex-row justify-center mt-4 ${getGapClass(2)}`}
              >
                {foodItems.map((_, idx) => (
                  <View
                    key={idx}
                    className={`h-1.5 rounded-full ${idx === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

        {/* DETAILS SECTION */}
        <View className="p-6">
          <View className={`${rowClass} justify-between items-start mb-3`}>
            <View className={`flex-1 ${isRTL ? "ml-3" : "mr-3"}`}>
              <Text
                numberOfLines={1}
                className={`text-2xl font-bold text-text dark:text-text-dark mb-1 ${textAlign}`}
              >
                {restaurantName}
              </Text>
              <View className={`${rowClass} items-center ${getGapClass(2)}`}>
                {cuisineName && (
                  <Text
                    className={`text-text-muted dark:text-text-muted-dark text-xs font-medium ${textAlign}`}
                  >
                    {cuisineName}
                  </Text>
                )}
                {cuisineName && areaName && (
                  <View className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                )}
                {areaName && (
                  <View className={`${rowClass} items-center`}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#9ca3af"
                    />
                    <Text
                      className={`text-text-muted dark:text-text-muted-dark text-[11px] font-medium ${isRTL ? "mr-1" : "ml-1"} ${textAlign}`}
                    >
                      {areaName}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="bg-green-50 dark:bg-green-500/10 px-2.5 py-1.5 rounded-xl flex-row items-center gap-1.5 border border-green-100/50 dark:border-green-500/20">
              <Ionicons name="star" size={14} color="#22c55e" />
              <Text className="text-green-600 dark:text-green-400 font-bold text-sm">
                {rating.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Meta Info */}
          <View
            className={`${rowClass} items-center border-t border-border dark:border-border-dark pt-5 mt-2`}
          >
            <View
              className={`flex-row items-center ${isRTL ? "ml-5" : "mr-5"}`}
            >
              <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800/50 items-center justify-center mr-2">
                <Ionicons name="time-outline" size={16} color="#6b7280" />
              </View>
              <Text className="text-text dark:text-text-dark text-[13px] font-semibold">
                {deliveryTime}
              </Text>
            </View>

            <View
              className={`flex-row items-center ${isRTL ? "mr-5" : "ml-5"}`}
            >
              <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800/50 items-center justify-center mr-2">
                <Ionicons name="bicycle-outline" size={16} color="#6b7280" />
              </View>
              <Text className="text-text dark:text-text-dark text-[13px] font-semibold">
                {deliveryFee}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;
