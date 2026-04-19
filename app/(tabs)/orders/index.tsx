import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import ActiveOrdersSection from "../../../components/orders/ActiveOrdersSection";
import { RootState } from "../../../store/store";

export default function ActiveOrdersScreen() {
  const { activeOrders } = useSelector((state: RootState) => state.orders);

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
      >
        <ActiveOrdersSection orders={activeOrders} />
      </ScrollView>
    </View>
  );
}
