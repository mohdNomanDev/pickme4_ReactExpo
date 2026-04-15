import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantDetails from "@/components/restaurant/RestaurantDetails";
import FoodCardListing from "@/components/restaurant/FoodCardListing";
import restaurantData from "@/TestData/RestaurantData.json";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function RestaurantMenu() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const selectedRestaurantId = useSelector((state: RootState) => state.onPressRestaurant.restaurantId);

  useEffect(() => {
    if (selectedRestaurantId) {
      const found = restaurantData.find((r) => r.id === selectedRestaurantId);
      if (found) {
        setSelectedRestaurant(found);
      }
    } else {
      // Fallback to first restaurant for preview if no ID is set
      setSelectedRestaurant(restaurantData[0]);
    }
  }, [selectedRestaurantId]);

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow pb-10"
        className="w-full"
      >
        <View className="w-full max-w-7xl mx-auto">
          <RestaurantDetails data={selectedRestaurant} />
          
          {/* Menu Items Section */}
          <View className="px-6 md:px-10 pb-20 max-w-5xl mx-auto w-full">
            {selectedRestaurant && selectedRestaurant.foodItems && (
              <FoodCardListing foodItems={selectedRestaurant.foodItems} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
