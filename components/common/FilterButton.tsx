import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  onPress: () => void;
  isActive?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FilterButton = ({ onPress, isActive = false }: Props) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.92);
    opacity.value = withTiming(0.85);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={animatedStyle}
      className={`relative w-11 h-11 items-center justify-center rounded-2xl shadow-sm ${
        isActive
          ? "bg-primary border border-primary/20"
          : "bg-white dark:bg-card-dark border border-border dark:border-border-dark"
      }`}
    >
      <Ionicons
        name="filter"
        size={22}
        color={isActive ? "white" : "#f27f0d"}
      />

      {/* Active Indicator Badge */}
      {isActive && (
        <View className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-primary items-center justify-center">
          <View className="w-1.5 h-1.5 bg-primary rounded-full" />
        </View>
      )}
    </AnimatedPressable>
  );
};

export default FilterButton;

