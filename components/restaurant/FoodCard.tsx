import { useRTL } from "@/hooks/useRTL";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import { Image } from "expo-image";
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

  const formattedPrice = useMemo(() => {
    const currencyStr = lang === 'ar' ? 'ر.س' : 'SAR';
    return isRTL ? `${data.price} ${currencyStr}` : `${currencyStr} ${data.price}`;
  }, [data.price, lang, isRTL]);

  const isWeb = Platform.OS === 'web';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`bg-white dark:bg-gray-800 rounded-3xl p-3.5 flex-row items-center shadow-sm border border-gray-100 dark:border-gray-800 ${
        isWeb ? 'hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200' : ''
      }`}
    >
      {/* Food Image */}
      <View className="relative">
        <Image
          source={{ uri: data.image }}
          className="w-28 h-28 rounded-2xl bg-gray-100 dark:bg-gray-700"
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Food Details */}
      <View className="flex-1 justify-between h-28 py-1 ms-4">
        <View>
          {/* Name */}
          <Text
            className={`text-lg font-bold text-gray-900 dark:text-white mb-1 text-start`}
            numberOfLines={1}
          >
            {lang === "ar" ? data.name.ar : data.name.en}
          </Text>

          {/* Category */}
          <Text
            className={`text-sm text-gray-500 dark:text-gray-400 font-medium text-start`}
            numberOfLines={1}
          >
            {lang === "ar" ? data.category.ar : data.category.en}
          </Text>
        </View>

        {/* Bottom Row: Price & Add to Cart */}
        <View
          className="flex-row items-center justify-between mt-2"
        >
          <Text className="text-base font-extrabold text-primary tracking-tight">
            {formattedPrice}
          </Text>

          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-primary w-9 h-9 rounded-full items-center justify-center shadow-sm active:bg-primary/80"
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
