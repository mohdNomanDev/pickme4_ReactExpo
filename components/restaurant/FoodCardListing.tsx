import FilterButton from "@/components/common/FilterButton";
import FilterSheet from "@/components/common/FilterSheet";
import { useRTL } from "@/hooks/useRTL";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import FoodCard from "./FoodCard";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const renderItem = ({ item }: { item: FoodItem }) => {
    return <FoodCard data={item} />;
  };

  return (
    <View className="mt-8">
      {/* Section Header */}
      <View
        className={`flex-row items-center justify-between mb-5 w-full ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <Text
          className={`flex-1 pr-4 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight ${
            isRTL ? "text-right pr-0 pl-4" : "text-left pr-4 pl-0"
          }`}
        >
          {isRTL ? "جميع الأطباق" : "All Dishes"}
        </Text>
        <FilterButton
          onPress={() => setIsFilterOpen(true)}
          isActive={isFilterOpen}
        />
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

      <FilterSheet
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <Text
          className={`text-xl font-bold mb-4 text-gray-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}
        >
          {isRTL ? "تصفية" : "Filter Options"}
        </Text>
        {/* TODO: Add filter options here */}
      </FilterSheet>
    </View>
  );
};

export default FoodCardListing;
