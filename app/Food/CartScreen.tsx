import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import CartRestaurantSection from "@/components/cart/CartRestaurantSection";
import DeliveryAddress from "@/components/cart/DeliveryAddress";
import OrderSummary from "@/components/cart/OrderSummary";
import PromoCode from "@/components/cart/PromoCode";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CartScreen = () => {
  const { t } = useTranslation();
  const cartData = useSelector((state: any) => state.cart.cart);
  const user = useSelector((state: any) => state.user?.user);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const defaultAddress = user?.addresses?.find((a: any) => a.isDefault) || null;

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900" style={{ paddingBottom: insets.bottom }}>
      {/* Header */}
      <View 
        className="flex-row items-center justify-between px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700" 
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 active:opacity-70">
          <Ionicons name="arrow-back" size={24} className="text-gray-800 dark:text-white" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">{t("cart.title", "Your Cart")}</Text>
        <View className="w-10" /> {/* Spacer for centering */}
      </View>

      {cartData.length === 0 ? (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="cart-outline" size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
          <Text className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            {t("cart.empty", "Your cart is empty")}
          </Text>
        </View>
      ) : (
        <>
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ padding: 16, gap: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {cartData.map((section: any, index: number) => (
              <CartRestaurantSection key={index} section={section} />
            ))}

            <DeliveryAddress address={defaultAddress} />

            <PromoCode />
          </ScrollView>

          <View className="p-4 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg border-t border-gray-100 dark:border-gray-700" style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <OrderSummary />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
