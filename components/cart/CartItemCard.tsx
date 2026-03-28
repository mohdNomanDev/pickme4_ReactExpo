import React from "react";
import { Image, Text, View } from "react-native";
import QuantityControl from "./QuantityControl";
import { useTranslation } from "react-i18next";

const CartItemCard = ({ item, restaurantId }: { item: any, restaurantId: string }) => {
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
      <Image 
        source={{ uri: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }} 
        className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 mr-3"
      />
      <View className="flex-1 justify-center">
        <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1" numberOfLines={2}>
          {item.name}
        </Text>
        <Text className="text-orange-500 font-bold text-sm">
          {t("currency", "SAR")} {item.price.toFixed(2)}
        </Text>
      </View>
      <View className="ml-2">
        <QuantityControl
          quantity={item.quantity}
          item={item}
          restaurantId={restaurantId}
        />
      </View>
    </View>
  );
};

export default CartItemCard;
