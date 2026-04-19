import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router, withLayoutContext, usePathname } from "expo-router";
import React, { useMemo, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../../../components/cart/CartIcon";
import ThemeToggle from "../../../components/common/ThemeToggle";
import Navbar from "../../../components/navbar/navbar";
import { setAppMode } from "../../../store/appModeSlice";

const MaterialTopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function IndexLayout() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  
  // Sync router state back to Redux so ModeToggle shows correct active state
  useEffect(() => {
    if (pathname.includes('/ride')) {
      dispatch(setAppMode('ride'));
    } else {
      dispatch(setAppMode('food'));
    }
  }, [pathname, dispatch]);

  const cartData = useSelector((state: any) => state.cart.cart);
  const totalCartItems = useMemo(() => {
    return cartData.reduce((total: number, restaurant: any) => {
      return total + restaurant.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }, 0);
  }, [cartData]);

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-background-dark"
      edges={["top"]}
    >
      {/* Temporary Testing Toggles & Cart */}
      <View
        className={`flex-row items-center justify-between px-4 py-2 bg-gray-200 dark:bg-card-dark border-b border-gray-300 dark:border-gray-800 w-full z-50`}
      >
        <CartIcon
          itemCount={totalCartItems}
          onPress={() => router.push("/Food/CartScreen")}
        />
        <View className="flex-row items-center gap-4">
          <ThemeToggle />
        </View>
      </View>

      {/* Top Navigation Area */}
      <View className="z-50 bg-white dark:bg-card-dark shadow-sm border-b border-gray-100 dark:border-gray-800 w-full">
        <View className="max-w-7xl mx-auto w-full">
          <Navbar />
        </View>
      </View>

      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: { display: "none" }, // ModeToggle inside Navbar acts as the UI
          swipeEnabled: true, // Allow swiping between Food and Ride!
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Food" }} />
        <MaterialTopTabs.Screen name="ride" options={{ title: "Ride" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
