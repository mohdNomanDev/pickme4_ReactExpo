import React, { useMemo } from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import { Image } from "expo-image";
import AddToCartButton from "../ui/AddToCartButton";

type FoodItem = {
  name: string;
  category: string;
  image: string;
  price: number;
};

type Props = {
  data: FoodItem;
  restaurantId: string;
  restaurantName: string;
};

const FoodCard = ({ data, restaurantId, restaurantName }: Props) => {
  const formattedPrice = useMemo(() => {
    const currencyStr = 'SAR';
    return `${currencyStr} ${data.price}`;
  }, [data.price]);

  const isWeb = Platform.OS === 'web';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 ${
        isWeb ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''
      }`}
    >
      {/* Top Banner Image (Takes up top half of card) */}
      <View className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
        <Image
          source={{ uri: data.image }}
          className="w-full h-full"
          contentFit="cover"
          transition={300}
        />
        {/* Subtle gradient overlay at the bottom of the image for contrast */}
        <View className="absolute inset-0 bg-black/5" />
      </View>

      {/* Content Section (Bottom half) */}
      <View className="p-4 md:p-5 flex-col justify-between flex-1">
        <View>
          {/* Header Row: Title and Category */}
          <View className={`flex-row justify-between items-start mb-1 `}>
            <Text
              className={`flex-1 text-[17px] leading-6 font-extrabold text-gray-900 dark:text-white ${'text-left'}`}
              numberOfLines={2}
            >
              {data.name}
            </Text>
          </View>
          
          <Text
            className={`text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-4 ${'text-left'}`}
            numberOfLines={1}
          >
            {data.category}
          </Text>
        </View>

        {/* Footer Row: Price & Add Button */}
        <View className={`flex-row items-center justify-between `}>
          <Text className="text-[17px] font-black text-primary tracking-tight">
            {formattedPrice}
          </Text>

          <AddToCartButton 
            item={data} 
            restaurantId={restaurantId}
            restaurantName={restaurantName}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
