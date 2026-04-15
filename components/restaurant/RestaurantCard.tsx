import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../store/bookmarkSlice";
import { setRestaurantId } from "../../store/OnPressRestaurantSlice";

type FoodItem = {
  name: string;
  image: string;
  price?: number;
};

export type Restaurant = {
  id: number;
  name: string;
  foodItems: FoodItem[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  currency?: string;
  cuisine?: string;
  offer?: string;
  area?: string;
  city?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tags?: string[];
  distanceValue?: number; // Added distance value in km
};

type RestaurantCardProps = {
  restaurant: Restaurant;
};

/**
 * RestaurantCard Component
 * Optimized for performance and high-quality UI/UX in Saudi market.
 */
const RestaurantCard = memo(({ restaurant }: RestaurantCardProps) => {
  if (!restaurant) return null;

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  // Optimized State Selectors
  // Using a more stable selector pattern to prevent unnecessary re-renders
  const isBookmarked = useSelector((state: RootState) =>
    state.bookmark.value.indexOf(restaurant.id) !== -1
  );

  // Simplified: Only memoize values that actually require calculation or are objects.
  const { 
    foodItems, 
    rating, 
    deliveryTime, 
    offer, 
    name: restaurantName, 
    cuisine: cuisineName, 
    area: areaName 
  } = restaurant;

  const currentFood = foodItems?.[currentIndex];


  // Helpers to localize currency and formatting
  const localizedCurrencyStr = useMemo(() => {
    const currencyMap: Record<string, string> = {
      SAR: "SAR",
    };
    const cCode = restaurant?.currency || "SAR";
    return currencyMap[cCode] || cCode;
  }, [restaurant?.currency]);

  const formattedPrice = useMemo(() => {
    if (currentFood?.price === undefined) return null;
    return `${localizedCurrencyStr} ${currentFood.price}`;
  }, [currentFood?.price, localizedCurrencyStr]);

  const formattedDeliveryFee = useMemo(() => {
    if (restaurant?.deliveryFee === 0) {
      return "Free";
    }
    return `${localizedCurrencyStr} ${restaurant.deliveryFee}`;
  }, [restaurant?.deliveryFee, localizedCurrencyStr]);

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
    dispatch(setRestaurantId(restaurant.id));
    router.push("/restaurant/RestaurantMenu");
  }, [dispatch, restaurant.id, router]);

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
            className="w-full h-full"
          >
            <Image
              source={currentFood?.image}
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
              className="w-full h-full bg-gray-100 dark:bg-gray-800"
            />
          </Animated.View>

          {/* Top Overlays */}
          <View
            className={`absolute top-4 left-4 right-4 items-start ${"flex-row"} justify-between z-10`}
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
            <View className={`${"flex-row"} justify-between items-end`}>
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className={`text-white text-base font-bold mb-0.5 ${"text-left"}`}
                >
                  {currentFood?.name}
                </Text>
                {formattedPrice && (
                  <Text
                    className={`text-primary font-bold text-sm ${"text-left"}`}
                  >
                    {formattedPrice}
                  </Text>
                )}
              </View>

              {/* Slider Controls */}
              {foodItems?.length > 1 && (
                <View className={`${"flex-row"} ${"gap-2"} items-center mb-1`}>
                  <TouchableOpacity
                    onPress={handlePrev}
                    hitSlop={8}
                    className="w-9 h-9 rounded-full bg-white/25 items-center justify-center backdrop-blur-lg border border-white/10"
                  >
                    <Ionicons name={"chevron-back"} size={18} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNext}
                    hitSlop={8}
                    className="w-9 h-9 rounded-full bg-white/25 items-center justify-center backdrop-blur-lg border border-white/10"
                  >
                    <Ionicons
                      name={"chevron-forward"}
                      size={18}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Dot Indicator */}
            {foodItems?.length > 1 && (
              <View className={`flex-row justify-center mt-4 ${"gap-2"}`}>
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
          <View className={`${"flex-row"} justify-between items-start mb-3`}>
            <View className={`flex-1 me-3`}>
              <Text
                numberOfLines={1}
                className={`text-2xl font-bold text-text dark:text-text-dark mb-1 ${"text-left"}`}
              >
                {restaurantName}
              </Text>
              <View className={`${"flex-row"} items-center ${"gap-2"}`}>
                {cuisineName && (
                  <Text
                    className={`text-text-muted dark:text-text-muted-dark text-xs font-medium ${"text-left"}`}
                  >
                    {cuisineName}
                  </Text>
                )}
                {cuisineName && areaName && (
                  <View className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                )}
                {areaName && (
                  <View className={`${"flex-row"} items-center`}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#9ca3af"
                    />
                    <Text
                      className={`text-text-muted dark:text-text-muted-dark text-[11px] font-medium ms-1 ${"text-left"}`}
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
            className={`${"flex-row"} items-center border-t border-border dark:border-border-dark pt-5 mt-2`}
          >
            <View className={`flex-row items-center me-4`}>
              <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800/50 items-center justify-center mr-2">
                <Ionicons name="time-outline" size={16} color="#6b7280" />
              </View>
              <Text className="text-text dark:text-text-dark text-[12px] font-semibold">
                {deliveryTime}
              </Text>
            </View>

            <View className={`flex-row items-center me-4`}>
              <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800/50 items-center justify-center mr-2">
                <Ionicons name="bicycle-outline" size={16} color="#6b7280" />
              </View>
              <Text
                className={`text-text dark:text-text-dark text-[12px] font-semibold ${restaurant?.deliveryFee === 0 ? "text-green-600 dark:text-green-400" : ""}`}
              >
                {formattedDeliveryFee}
              </Text>
            </View>

            {restaurant?.distanceValue !== undefined && (
              <View className={`flex-row items-center`}>
                <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800/50 items-center justify-center mr-2">
                  <Ionicons name="location-outline" size={16} color="#6b7280" />
                </View>
                <Text className="text-text dark:text-text-dark text-[12px] font-semibold">
                  {restaurant.distanceValue < 1 
                    ? `${(restaurant.distanceValue * 1000).toFixed(0)} m`
                    : `${restaurant.distanceValue.toFixed(1)} km`}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;
