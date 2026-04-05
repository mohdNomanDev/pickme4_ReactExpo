import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface OrdersTabsProps {
  activeTab: "active" | "history";
  onTabChange: (tab: "active" | "history") => void;
}

const OrdersTabs = ({ activeTab, onTabChange }: OrdersTabsProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className={`flex-row p-1 mt-2 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
    >
      <View
        className={`flex-1 rounded-xl ${activeTab === "active" ? "bg-orange-500 shadow-md" : "bg-transparent"}`}
      >
        <Pressable
          onPress={() => onTabChange("active")}
          style={({ pressed }) => ({
            paddingVertical: 12,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            className={`font-semibold ${
              activeTab === "active"
                ? "text-white"
                : isDark
                  ? "text-gray-400"
                  : "text-gray-500"
            }`}
          >
            Active Orders
          </Text>
        </Pressable>
      </View>

      <View
        className={`flex-1 rounded-xl ${activeTab === "history" ? "bg-orange-500 shadow-md" : "bg-transparent"}`}
      >
        <Pressable
          onPress={() => onTabChange("history")}
          style={({ pressed }) => ({
            paddingVertical: 12,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            className={`font-semibold ${
              activeTab === "history"
                ? "text-white"
                : isDark
                  ? "text-gray-400"
                  : "text-gray-500"
            }`}
          >
            Order History
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(OrdersTabs);
