import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState, memo } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../store/bookmarkSlice";
import { useRTL } from "@/hooks/useRTL";

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
};

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = memo(({ restaurant }) => {
  const {
    id,
    name,
    foodItems,
    rating,
    deliveryTime,
    deliveryFee,
    cuisine,
    offer,
  } = restaurant;

  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { isRTL, lang, rowClass, getGapClass, textAlign } = useRTL();

  const currentFood = foodItems?.[currentIndex];
  const isBookmarked = useSelector((state: RootState) =>
    state.bookmark.value.includes(id)
  );

  const handleNext = () => {
    if (!foodItems?.length) return;
    setCurrentIndex((prev) => (prev + 1) % foodItems.length);
  };

  const handlePrev = () => {
    if (!foodItems?.length) return;
    setCurrentIndex((prev) => (prev === 0 ? foodItems.length - 1 : prev - 1));
  };

  return (
    <View className="mb-6 bg-card dark:bg-card-dark rounded-[32px] overflow-hidden border border-border dark:border-border-dark shadow-sm">
      <TouchableOpacity activeOpacity={0.9} className="flex-1">
        {/* IMAGE SECTION */}
        <View className="relative h-56 w-full overflow-hidden">
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
              style={{ width: "100%", height: "100%" }}
              className="bg-gray-100 dark:bg-gray-800"
            />
          </Animated.View>

          {/* Top Overlays */}
          <View
            className={`absolute top-4 left-4 right-4 items-start ${rowClass} justify-between`}
          >
            {offer ? (
              <View className="bg-primary px-3 py-1.5 rounded-full shadow-lg shadow-primary/20">
                <Text className="text-white text-[10px] font-bold uppercase tracking-wider">
                  {offer}
                </Text>
              </View>
            ) : (
              <View />
            )}

            <Pressable
              onPress={() => dispatch(toggleBookmark(id))}
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 items-center justify-center backdrop-blur-md"
            >
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={20}
                color={isBookmarked ? "#f27f0d" : "#6b7280"}
              />
            </Pressable>
          </View>

          {/* Bottom Overlays: Food Info Slider */}
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <View className={`${rowClass} justify-between items-end`}>
              <View className="flex-1">
                <Text
                  className={`text-white text-sm font-semibold mb-1 ${textAlign}`}
                >
                  {currentFood?.name?.[lang] || currentFood?.name?.["en"]}
                </Text>
                {currentFood?.price && (
                  <Text className={`text-primary font-bold ${textAlign}`}>
                    {currentFood.price}
                  </Text>
                )}
              </View>

              {/* Slider Controls */}
              {foodItems?.length > 1 && (
                <View className={`${rowClass} ${getGapClass(2)} items-center`}>
                  <TouchableOpacity
                    onPress={handlePrev}
                    className="w-8 h-8 rounded-full bg-white/20 items-center justify-center backdrop-blur-md"
                  >
                    <Ionicons
                      name={isRTL ? "chevron-forward" : "chevron-back"}
                      size={16}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNext}
                    className="w-8 h-8 rounded-full bg-white/20 items-center justify-center backdrop-blur-md"
                  >
                    <Ionicons
                      name={isRTL ? "chevron-back" : "chevron-forward"}
                      size={16}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Dot Indicator */}
            {foodItems?.length > 1 && (
              <View className={`flex-row justify-center mt-3 ${getGapClass(1.5)}`}>
                {foodItems.map((_, idx) => (
                  <View
                    key={idx}
                    className={`h-1 rounded-full ${idx === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

        {/* DETAILS SECTION */}
        <View className="p-5">
          <View className={`${rowClass} justify-between items-start mb-2`}>
            <View className={`flex-1 ${isRTL ? "ml-2" : "mr-2"}`}>
              <Text
                className={`text-xl font-bold text-text dark:text-text-dark mb-1 ${textAlign}`}
              >
                {name?.[lang] || name?.["en"]}
              </Text>
              {cuisine && (
                <Text
                  className={`text-text-muted dark:text-text-muted-dark text-xs ${textAlign}`}
                >
                  {cuisine?.[lang] || cuisine?.["en"]}
                </Text>
              )}
            </View>
            <View className="bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg flex-row items-center gap-1">
              <Ionicons name="star" size={14} color="#22c55e" />
              <Text className="text-green-600 dark:text-green-400 font-bold text-sm">
                {rating.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Meta Info */}
          <View
            className={`${rowClass} items-center border-t border-border dark:border-border-dark pt-4 mt-2`}
          >
            <View className={`flex-row items-center ${isRTL ? "ml-4" : "mr-4"}`}>
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text className="text-text-muted dark:text-text-muted-dark text-xs ml-1.5">
                {deliveryTime}
              </Text>
            </View>

            <View className="w-1 h-1 rounded-full bg-border dark:bg-border-dark" />

            <View className={`flex-row items-center ${isRTL ? "mr-4" : "ml-4"}`}>
              <Ionicons name="bicycle-outline" size={16} color="#6b7280" />
              <Text className="text-text-muted dark:text-text-muted-dark text-xs ml-1.5">
                {deliveryFee}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default RestaurantCard;
