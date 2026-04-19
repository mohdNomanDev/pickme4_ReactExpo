import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCardList from "../../../components/restaurant/RestaurantCardList";
import { RootState } from "../../../store/store";
import { setUser } from "../../../store/userSlice";
import userDataJson from "../../../TestData/UserData.json";
import { setCart } from "@/store/cartSlice";
import { setSelectedAddress } from "@/store/selectedAddressSlice";

export default function FoodScreen() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

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

  return (
    <View className="w-full flex-1 bg-background dark:bg-background-dark">
      <RestaurantCardList
        maxDistance={100} // Standard discovery radius
        headerContent={
          <View className="w-full flex-1 gap-8 mb-8 mt-2">
            {/* Banner / Offers Carousel Section */}
            <View className="w-full h-48 md:h-64 bg-card dark:bg-card-dark rounded-3xl items-center justify-center border border-border dark:border-border-dark">
              <Text className="text-text-muted dark:text-text-muted-dark font-bold text-lg">
                {"Banner Section"}
              </Text>
            </View>

            {/* Quick Categories Section */}
            <View className="w-full">
              <Text
                className="text-xl md:text-2xl font-extrabold text-text dark:text-text-dark mb-4 px-4 text-left"
              >
                {"Categories"}
              </Text>
              <View className="mx-4 h-24 md:h-32 bg-card dark:bg-card-dark rounded-2xl items-center justify-center border border-border dark:border-border-dark">
                <Text className="text-text-muted dark:text-text-muted-dark font-bold text-lg">
                  {"Categories Section"}
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
}
