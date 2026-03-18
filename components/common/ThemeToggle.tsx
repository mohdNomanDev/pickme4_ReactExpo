import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex flex-row justify-center items-center">
      <Pressable
        onPress={toggleColorScheme}
        className="p-2 rounded-full active:opacity-70 bg-gray-100 dark:bg-gray-800"
      >
        <Ionicons
          name={colorScheme === "dark" ? "sunny" : "moon"}
          size={24}
          color={colorScheme === "dark" ? "#f27f0d" : "#4b5563"}
        />
      </Pressable>
    </View>
  );
}
