import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartList from "../../components/cart/CartList";
import { useRTL } from "../../hooks/useRTL";

export default function CartPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isRTL } = useRTL();

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-gray-50 dark:bg-background-dark"
    >
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
        >
          <Ionicons
            name={isRTL ? "chevron-forward" : "chevron-back"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-gray-900 dark:text-white text-center flex-1">
          {t("cart.title", "My Cart")}
        </Text>

        <View className="w-10 h-10" />
      </View>

      <CartList />
    </SafeAreaView>
  );
}
