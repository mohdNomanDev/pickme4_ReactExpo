import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 w-full items-center px-5"
      pointerEvents="box-none"
      style={{
        paddingBottom: Math.max(insets.bottom, Platform.OS === "ios" ? 24 : 16),
      }}
    >
      <View
        className="flex-row justify-around items-center w-full max-w-[400px] h-[70px] rounded-[35px] bg-white dark:bg-gray-800 shadow-xl shadow-orange-500/20 dark:shadow-black/40"
        style={{ elevation: 15 }}
      >
        {state.routes.map((route, index) => {
          const options = descriptors[route.key].options as any;

          if (options.href === null) {
            return null;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const iconColor = isFocused
            ? "#f97316"
            : colorScheme === "dark"
              ? "#9ca3af"
              : "#6b7280";

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center h-full"
            >
              {options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: iconColor,
                    size: 24,
                  })
                : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function FoodHomeLayout() {
  
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? "bg-orange-50 dark:bg-orange-500/20" : ""}`}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? "bg-orange-50 dark:bg-orange-500/20" : ""}`}
            >
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? "bg-orange-50 dark:bg-orange-500/20" : ""}`}
            >
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? "bg-orange-50 dark:bg-orange-500/20" : ""}`}
            >
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? "bg-orange-50 dark:bg-orange-500/20" : ""}`}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
