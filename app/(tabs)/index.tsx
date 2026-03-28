import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { CartIcon } from "../../components/cart/CartIcon";
import { LanguageToggle } from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import Navbar from "../../components/navbar/navbar";
import RestaurantCardList from "../../components/restaurant/RestaurantCardList";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userSlice";
import userDataJson from "../../TestData/UserData.json";

export default function FoodHome() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Simulate fetching user data from backend on load
    if (!currentUser) {
      // Get the first user from our mock data as the logged-in user
      const mockUser = userDataJson[0] as any;
      dispatch(setUser(mockUser));
    }
  }, [currentUser, dispatch]);

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-background-dark"
      edges={["top"]}
    >
      {/* Temporary Testing Toggles & Cart */}
      <View
        className={`flex-row items-center justify-between px-4 py-2 bg-gray-200 dark:bg-card-dark border-b border-gray-300 dark:border-gray-800 w-full z-50`}
      >
        <CartIcon itemCount={2} onPress={() => router.push("/Food/cart")} />
        <View className="flex-row items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />
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
          headerContent={
            <View className="w-full flex-1 gap-8 mb-8 mt-2">
              {/* Banner / Offers Carousel Section */}
              <View className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl items-center justify-center border border-gray-300 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                  {t("home.banner", "Banner Section")}
                </Text>
              </View>

              {/* Quick Categories Section */}
              <View className="w-full">
                <Text
                  className={`text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t("home.categories", "Categories")}
                </Text>
                <View className="w-full h-24 md:h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl items-center justify-center border border-gray-300 dark:border-gray-700">
                  <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                    {t("home.categories_section", "Categories Section")}
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

