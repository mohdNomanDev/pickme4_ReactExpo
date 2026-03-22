import React from "react";
import { FlatList, Text, View } from "react-native";
import FoodCard from "./FoodCard";
import FilterButton from "@/components/common/FilterButton";
import { useRTL } from "@/hooks/useRTL";

type FoodItem = {
  name: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  image: string;
  price: string;
};

type Props = {
  foodItems: FoodItem[];
};

const FoodCardListing = ({ foodItems }: Props) => {
  const { isRTL } = useRTL();

  const renderItem = ({ item }: { item: FoodItem }) => {
    return <FoodCard data={item} />;
  };

  return (
    <View className="mt-8">
      {/* Section Header */}
      <View className={`flex-row items-center justify-between mb-5 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Text
          className={`flex-1 pr-4 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight ${
            isRTL ? "text-right pr-0 pl-4" : "text-left pr-4 pl-0"
          }`}
        >
          {isRTL ? "جميع الأطباق" : "All Dishes"}
        </Text>
        <FilterButton onPress={() => {}} isActive={false} />
      </View>

      {/* List */}
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false} // Disabled because it is rendered inside a ScrollView in RestaurantMenu
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FoodCardListing;
