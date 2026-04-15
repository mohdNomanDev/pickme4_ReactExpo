import { useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../../components/cart/CartIcon";
import ThemeToggle from "../../components/common/ThemeToggle";
import Navbar from "../../components/navbar/navbar";
import RestaurantCardList from "../../components/restaurant/RestaurantCardList";
import NearbyRestaurants from "../../components/restaurant/NearbyRestaurants";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userSlice";
import userDataJson from "../../TestData/UserData.json";
import restaurantDataJson from "../../TestData/RestaurantData.json";
import { setCart } from "@/store/cartSlice";
import { setSelectedAddress } from "@/store/selectedAddressSlice";
import { Restaurant } from "@/components/restaurant/RestaurantCard";

const restaurantData = restaurantDataJson as unknown as Restaurant[];

export default function FoodHome() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const cartData = useSelector((state: any) => state.cart.cart);

  useEffect(() => {
    // Simulate fetching user data from backend on load
    if (!currentUser) {
      // Get the first user from our mock data as the logged-in user
      const mockUser = userDataJson[0] as any;
      dispatch(setUser(mockUser));

      // Hydrate cart from mock user data
      if (mockUser.cart) {
        dispatch(setCart(mockUser.cart));
      }

      // Hydrate selected address from user's default address
      if (mockUser.addresses && mockUser.addresses.length > 0) {
        const defaultAddress = mockUser.addresses.find((a: any) => a.isDefault) || mockUser.addresses[0];
        dispatch(
          setSelectedAddress({
            id: defaultAddress.id,
            title: defaultAddress.title,
            formattedAddress:
              defaultAddress.address ||
              defaultAddress.formattedAddress ||
              `${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.state}`,
            address: defaultAddress.address,
            latitude: defaultAddress.coordinates?.lat,
            longitude: defaultAddress.coordinates?.lng,
            street: defaultAddress.street,
            state: defaultAddress.state,
            city: defaultAddress.city,
          }),
        );
      }
    }
  }, [currentUser, dispatch]);

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

      <View className="w-full flex-1">
        <RestaurantCardList
          maxDistance={100} // Standard discovery radius
          headerContent={
            <View className="w-full flex-1 gap-8 mb-8 mt-2">
              {/* Banner / Offers Carousel Section */}
              <View className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl items-center justify-center border border-gray-300 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                  {"Banner Section"}
                </Text>
              </View>

              {/* Quick Categories Section */}
              <View className="w-full">
                <Text
                  className={`text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-4 px-4 text-left`}
                >
                  {"Categories"}
                </Text>
                <View className="mx-4 h-24 md:h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl items-center justify-center border border-gray-300 dark:border-gray-700">
                  <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                    {"Categories Section"}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

