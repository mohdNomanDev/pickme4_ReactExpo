import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useRTL } from "../../hooks/useRTL";

export interface CartItem {
  id: string;
  name: { en: string; ar: string };
  price: number;
  quantity: number;
  image: string;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: { en: "Classic Burger", ar: "برجر كلاسيك" },
    price: 35,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: { en: "French Fries", ar: "بطاطس مقلية" },
    price: 12,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
];

export function CartList() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row items-center bg-white dark:bg-card-dark p-4 mb-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full">
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-700"
      />

      <View className="flex-1 justify-between h-20 ms-4">
        <View className="items-start flex-row justify-between w-full">
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white text-start">
              {isRTL ? item.name.ar : item.name.en}
            </Text>
            <Text className="text-primary font-bold mt-1 text-base text-start">
              SAR {item.price.toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-start gap-4 mt-2">
          <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center">
            <Ionicons name="remove" size={18} color="gray" />
          </TouchableOpacity>
          <Text className="text-base font-bold text-gray-900 dark:text-white">
            {item.quantity}
          </Text>
          <TouchableOpacity className="w-8 h-8 rounded-full bg-primary items-center justify-center">
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 w-full relative">
      <FlatList
        data={mockCartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="cart-outline" size={64} color="gray" />
            <Text className="text-gray-500 dark:text-gray-400 mt-4 text-lg text-center">
              {t("cart.empty", "Your cart is empty")}
            </Text>
          </View>
        }
      />

      {/* Checkout Summary Footer */}
      <View className="absolute bottom-0 w-full bg-white dark:bg-card-dark p-6 border-t border-gray-200 dark:border-gray-800 rounded-t-3xl shadow-lg pb-8">
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-600 dark:text-gray-400 text-lg text-start">
            {t("cart.total", "Total")}
          </Text>
          <Text className="text-2xl font-extrabold text-gray-900 dark:text-white text-end">
            SAR 82.00
          </Text>
        </View>
        <TouchableOpacity className="w-full bg-primary py-4 rounded-full items-center shadow-md">
          <Text className="text-white text-lg font-bold">
            {t("cart.checkout", "Checkout")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CartList;
