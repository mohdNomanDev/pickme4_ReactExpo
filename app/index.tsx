import { Text, View } from "react-native";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-6">
      <View className="p-8 bg-card dark:bg-card-dark rounded-3xl shadow-sm items-center border border-gray-100 dark:border-gray-800">
        <ThemeToggle />
        <Text className="text-3xl font-display font-bold text-primary mt-6 mb-2">
          Pickme4 Food
        </Text>
        <Text className="text-lg text-text dark:text-text-dark text-center">
          Delicious meals delivered to your door.
        </Text>
        <View className="mt-8 px-6 py-3 bg-primary rounded-full">
          <Text className="text-white font-bold">Start Ordering</Text>
        </View>
      </View>
    </View>
  );
}
