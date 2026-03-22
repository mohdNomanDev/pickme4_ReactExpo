import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import RestaurantCardList from "@/components/restaurant/RestaurantCardList";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {/* Header Bar */}
      <View className="bg-card dark:bg-card-dark shadow-sm z-10 w-full">
        <View className="py-4 px-6 md:px-8 max-w-7xl mx-auto w-full flex-row justify-between items-center">
          <ThemeToggle />
          <LanguageToggle />
        </View>
      </View>

      <View className="flex-1">
        <RestaurantCardList />
      </View>
    </SafeAreaView>
  );
}
