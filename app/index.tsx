import { ScrollView, View } from "react-native";
import ThemeToggle from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import RestaurantCardList from "@/components/restaurant/RestaurantCardList";

export default function Home() {
  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      {/* Header Bar */}
      <View className="pt-12 pb-4 px-6 md:px-12 flex-row justify-between items-center bg-card dark:bg-card-dark shadow-sm z-10">
        <ThemeToggle />
        <LanguageToggle />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <RestaurantCardList />
      </ScrollView>
    </View>
  );
}
