import { useRTL } from "@/hooks/useRTL";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  data: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
};

const FoodCard = ({ data, onAddToCart }: Props) => {
  const { lang, isRTL } = useRTL();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(data);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`bg-white dark:bg-gray-800 rounded-3xl p-3.5 flex-row items-center shadow-sm border border-gray-100 dark:border-gray-800 ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      {/* Food Image */}
      <View className="relative">
        <Image
          source={{ uri: data.image }}
          className="w-28 h-28 rounded-2xl bg-gray-100"
          resizeMode="cover"
        />
      </View>

      {/* Food Details */}
      <View className={`flex-1 justify-between h-28 py-1 ${isRTL ? "mr-4" : "ml-4"}`}>
        <View>
          {/* Name */}
          <Text
            className={`text-lg font-bold text-gray-900 dark:text-white mb-1 ${
              isRTL ? "text-right" : "text-left"
            }`}
            numberOfLines={1}
          >
            {lang === "ar" ? data.name.ar : data.name.en}
          </Text>

          {/* Category */}
          <Text
            className={`text-sm text-gray-500 dark:text-gray-400 font-medium ${
              isRTL ? "text-right" : "text-left"
            }`}
            numberOfLines={1}
          >
            {lang === "ar" ? data.category.ar : data.category.en}
          </Text>
        </View>

        {/* Bottom Row: Price & Add to Cart */}
        <View
          className={`flex-row items-center justify-between mt-2 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <Text className="text-base font-extrabold text-orange-500 tracking-tight">
            {data.price}
          </Text>

          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-orange-500 w-9 h-9 rounded-full items-center justify-center shadow-sm"
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
