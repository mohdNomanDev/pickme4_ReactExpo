import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import OrdersHeader from "../../../components/orders/OrdersHeader";
import { setOrders } from "../../../store/ordersSlice";
import UserData from "../../../TestData/UserData.json";

const MaterialTopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator,
);

export default function OrdersLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

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
      className="flex-1 bg-gray-50 dark:bg-background-dark"
    >
      <View className="flex-1 px-4 pt-2 md:px-8 lg:px-12 md:max-w-4xl lg:max-w-6xl md:mx-auto w-full">
        <OrdersHeader />

        <MaterialTopTabs
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
            tabBarIndicatorStyle: {
              height: "100%",
              borderRadius: 12,
              backgroundColor: "#f97316", // bg-orange-500
            },
            tabBarStyle: {
              backgroundColor: isDark ? "#1f2937" : "#e5e7eb", // bg-gray-800 / bg-gray-200
              borderRadius: 16,
              marginTop: 8,
              marginBottom: 16,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarLabelStyle: {
              textTransform: "capitalize",
              fontWeight: "600",
              fontSize: 14,
            },
            tabBarItemStyle: {
              borderRadius: 12,
            },
            tabBarPressColor: "transparent",
            sceneStyle: { backgroundColor: "transparent" },
          }}
        >
          <MaterialTopTabs.Screen
            name="index"
            options={{ title: "Active Orders" }}
          />
          <MaterialTopTabs.Screen
            name="history"
            options={{ title: "Order History" }}
          />
        </MaterialTopTabs>
      </View>
    </View>
  );
}
