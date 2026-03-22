import { View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTheme, ThemeMode } from "@/store/themeSlice";
import { useColorScheme } from "nativewind";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { colorScheme } = useColorScheme();

  const toggleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    dispatch(setTheme(modes[nextIndex]));
  };

  const getIcon = () => {
    if (themeMode === 'system') return 'settings-outline';
    return themeMode === 'dark' ? 'moon' : 'sunny';
  };

  return (
    <View className="flex flex-row justify-center items-center">
      <Pressable
        onPress={toggleTheme}
        className="flex-row items-center gap-2 px-3 py-2 rounded-full active:opacity-70 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        <Ionicons
          name={getIcon()}
          size={20}
          color={colorScheme === "dark" ? "#f27f0d" : "#4b5563"}
        />
        <Text className="text-xs font-medium text-text dark:text-text-dark capitalize">
          {themeMode === 'system' ? 'System' : themeMode}
        </Text>
      </Pressable>
    </View>
  );
}
