import React from "react";
import { FlatList, Text, View } from "react-native";
import FoodCard from "./FoodCard";
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
      <Text
        className={`text-2xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {isRTL ? "جميع الأطباق" : "All Dishes"}
      </Text>

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
