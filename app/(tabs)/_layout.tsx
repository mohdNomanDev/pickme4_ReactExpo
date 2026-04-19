import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { memo, useCallback, useMemo } from "react";
import { Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabItemProps {
  route: any;
  index: number;
  isFocused: boolean;
  descriptors: any;
  navigation: any;
  colorScheme: string | undefined;
}

const TabItem = memo(({ route, index, isFocused, descriptors, navigation, colorScheme }: TabItemProps) => {
  const options = descriptors[route.key].options;
  
  if (options.href === null) return null;

  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  }, [isFocused, navigation, route.key, route.name, route.params]);

  const onLongPress = useCallback(() => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  }, [navigation, route.key]);

  const iconColor = isFocused
    ? "#f97316"
    : colorScheme === "dark"
      ? "#9ca3af"
      : "#6b7280";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center h-full"
    >
      {options.tabBarIcon?.({
        focused: isFocused,
        color: iconColor,
        size: 24,
      })}
    </Pressable>
  );
});

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  const containerStyle = useMemo(() => ({
    paddingBottom: Math.max(insets.bottom, Platform.OS === "ios" ? 24 : 16),
  }), [insets.bottom]);

  return (
    <View
      className="absolute bottom-0 w-full items-center px-5"
      pointerEvents="box-none"
      style={containerStyle}
    >
      <View
        className="flex-row justify-around items-center w-full max-w-[400px] h-[70px] rounded-[35px] bg-white dark:bg-gray-800 shadow-2xl shadow-orange-500/20 dark:shadow-black/40"
      >
        {state.routes.map((route, index) => (
          <TabItem
            key={route.key}
            route={route}
            index={index}
            isFocused={state.index === index}
            descriptors={descriptors}
            navigation={navigation}
            colorScheme={colorScheme}
          />
        ))}
      </View>
    </View>
  );
}

export default function FoodHomeLayout() {
  const renderTabBar = useCallback((props: BottomTabBarProps) => (
    <CustomTabBar {...props} />
  ), []);

  return (
    <Tabs
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        lazy: true, // Performance: Load tab screens only when needed
      }}
    >
      <Tabs.Screen
        name="home"
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
