import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ActiveOrdersSection from "../../components/orders/ActiveOrdersSection";
import OrderHistorySection from "../../components/orders/OrderHistorySection";
import OrdersHeader from "../../components/orders/OrdersHeader";
import OrdersTabs from "../../components/orders/OrdersTabs";
import { setOrders } from "../../store/ordersSlice";
import { RootState } from "../../store/store";
import UserData from "../../TestData/UserData.json";

const MyOrdersScreen = () => {
  const dispatch = useDispatch();
  const { activeOrders, orderHistory } = useSelector(
    (state: RootState) => state.orders,
  );

  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [isReady, setIsReady] = useState(false);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setIsReady(true);

    const timeout = setTimeout(() => {
      const user = UserData[0];
      if (user) {
        dispatch(
          setOrders({
            activeOrders: user.activeOrders || [],
            orderHistory: user.orderHistory || [],
          }),
        );
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (!isReady) return null;

  return (
    <View
      style={{ paddingTop: insets.top }}
      className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <View className="flex-1 px-4 pt-2 md:px-8 lg:px-12 md:max-w-4xl lg:max-w-6xl md:mx-auto w-full">
        <OrdersHeader />

        <OrdersTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-[100px]"
          className="mt-4"
        >
          {activeTab === "active" && (
            <ActiveOrdersSection orders={activeOrders} />
          )}

          {activeTab === "history" && (
            <OrderHistorySection orders={orderHistory} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyOrdersScreen;
