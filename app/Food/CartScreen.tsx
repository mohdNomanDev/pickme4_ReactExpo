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
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingBottom: insets.bottom }}
    >
      {/* Header */}
      <View
        className="flex-row rtl:flex-row-reverse items-center justify-between px-4 py-4 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="p-2 w-10 h-10 items-center justify-center rounded-full bg-border dark:bg-border-dark active:opacity-80"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            className="text-text dark:text-text-dark rtl:rotate-180"
          />
        </Pressable>
        <Text className="text-xl font-bold text-text dark:text-text-dark text-center flex-1">
          {t("cart.title", "Your Cart")}
        </Text>
        <View className="w-10" /> {/* Spacer for centering */}
      </View>

      {cartData.length === 0 ? (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons
            name="cart-outline"
            size={80}
            className="text-[#3A2A1D] mb-4"
          />
          <Text className="text-lg text-text-muted dark:text-text-muted-dark font-medium text-center">
            {t("cart.empty", "Your cart is empty")}
          </Text>
        </View>
      ) : (
        <View className="flex-1 flex-col lg:flex-row rtl:flex-row-reverse w-full max-w-7xl mx-auto">
          <ScrollView
            className="flex-1 lg:w-2/3"
            contentContainerStyle={{ padding: 16, gap: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {cartData.map((section: any, index: number) => (
              <CartRestaurantSection key={index} section={section} />
            ))}

            <DeliveryAddress address={defaultAddress} />

            <PromoCode />
            {/* Add some padding at the bottom for mobile so content isn't hidden behind the sticky OrderSummary */}
            <View className="h-4 lg:hidden" />
          </ScrollView>

          <View
            className="p-4 bg-card dark:bg-card-dark rounded-t-3xl lg:rounded-2xl lg:w-1/3 lg:m-4 shadow-lg border-t lg:border border-border dark:border-border-dark lg:sticky lg:top-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 10,
            }}
          >
            <OrderSummary />
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
