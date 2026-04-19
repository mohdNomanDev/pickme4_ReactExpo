import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/cartSlice";
import { addActiveOrder } from "@/store/ordersSlice";
import { showMessage } from "@/store/messageSlice";

const PlaceOrderButton = ({ total }: { total: number }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const handlePlaceOrder = useCallback(() => {
    if (cart.length === 0) {
      dispatch(
        showMessage({
          message: "Your cart is empty!",
          type: "error",
        })
      );
      return;
    }

    // Since our cart is grouped by restaurant, we can create one or multiple orders.
    // Requirement says restaurantName from cart, so we'll pick the first one or a summary.
    // For this implementation, we take the primary restaurant from the cart.
    const primaryRestaurant = cart[0];
    const totalItems = cart.reduce((acc, rest) => 
      acc + rest.items.reduce((sum, item) => sum + item.quantity, 0), 0
    );

    const newOrder = {
      orderId: Date.now().toString(),
      restaurantId: primaryRestaurant.restaurantId,
      restaurantName: primaryRestaurant.restaurantName,
      itemsCount: totalItems,
      totalAmount: total,
      currency: "SAR",
      status: "preparing",
      statusLabel: "Preparing",
      progress: 0.1,
      estimatedDeliveryTime: "30 mins",
      remainingTime: 30,
      deliveryType: "delivery", // Default type
      rider: null,
      actions: {
        canTrack: true,
        canContact: true
      },
      createdAt: new Date().toISOString()
    };

    // 1. Dispatch active order
    dispatch(addActiveOrder(newOrder));

    // 2. Clear Cart
    dispatch(clearCart());

    // 3. Success Feedback
    dispatch(
      showMessage({
        message: "Order placed successfully! 🎉",
        type: "success",
        position: "top",
      })
    );

    // 4. Navigate to Orders
    router.push("/orders");
  }, [cart, total, dispatch, router]);
  
  return (
    <TouchableOpacity
      onPress={handlePlaceOrder}
      className="bg-primary active:opacity-80 rounded-xl py-4 px-6 flex-row justify-between items-center shadow-lg w-full mt-4 shadow-primary/30"
    >
      <Text className="text-white font-bold text-lg text-left ">
        {"Place Order"}
      </Text>
      <View className="bg-black/20 dark:bg-white/10 px-3 py-1.5 rounded-lg">
        <Text
          className="text-white font-bold text-right tabular-nums"
        >
          {"SAR"} {total.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceOrderButton;
