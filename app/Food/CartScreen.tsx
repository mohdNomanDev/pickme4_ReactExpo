import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import CartRestaurantSection from "@/components/cart/CartRestaurantSection";
import DeliveryAddress from "@/components/cart/DeliveryAddress";
import OrderSummary from "@/components/cart/OrderSummary";
import PromoCode from "@/components/cart/PromoCode";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CartScreen = () => {
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
      <View
        className="flex-row items-center justify-between px-4 py-4 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="p-2 w-10 h-10 items-center justify-center rounded-full bg-border dark:bg-border-dark active:opacity-80"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            className="text-text dark:text-text-dark "
          />
        </Pressable>
        <Text className="text-xl font-bold text-text dark:text-text-dark text-center flex-1">
          {"Your Cart"}
        </Text>
        <View className="w-10" />
      </View>

      {cartData.length === 0 ? (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons
            name="cart-outline"
            size={80}
            className="text-[#3A2A1D] mb-4"
          />
          <Text className="text-lg text-text-muted dark:text-text-muted-dark font-medium text-center">
            {"Your cart is empty"}
          </Text>
        </View>
      ) : (
        <View className="flex-1 md:flex-row w-full max-w-7xl mx-auto">
          <ScrollView
            className="flex-1 md:w-2/3"
            contentContainerStyle={{ padding: 16, gap: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {cartData.map((section: any, index: number) => (
              <CartRestaurantSection key={index} section={section} />
            ))}

            <DeliveryAddress address={defaultAddress} />

            <PromoCode />
            <View className="h-4 md:hidden" />
          </ScrollView>

          <View
            className="p-4 bg-card dark:bg-card-dark rounded-t-3xl md:rounded-2xl md:w-1/3 md:m-4 shadow-lg border-t md:border border-border dark:border-border-dark md:top-6"
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
