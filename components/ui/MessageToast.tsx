import React, { useEffect } from "react";
import { Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "@/store/store";
import { hideMessage } from "@/store/messageSlice";

const MessageToast = () => {
  const { visible, message, type, position, duration } = useSelector(
    (state: RootState) => state.message
  );
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(position === "top" ? -100 : 100);

  const dispatchHideMessage = () => {
    console.log("hideMessage type:", typeof hideMessage);
    dispatch(hideMessage());
  };

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 15 });

      const timer = setTimeout(() => {
        handleHide();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const handleHide = () => {
    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(position === "top" ? -100 : 100, { duration: 300 }, () => {
      runOnJS(dispatchHideMessage)();
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible && opacity.value === 0) return null;

  const getThemeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500",
          icon: "checkmark-circle",
        };
      case "error":
        return {
          bg: "bg-red-500",
          icon: "alert-circle",
        };
      default:
        return {
          bg: "bg-gray-800 dark:bg-gray-700",
          icon: "information-circle",
        };
    }
  };

  const theme = getThemeStyles();
  const positionStyle = position === "top" 
    ? { top: Platform.OS === "ios" ? insets.top : 20 } 
    : { bottom: Platform.OS === "ios" ? insets.bottom + 20 : 40 };

  return (
    <Animated.View
      style={[
        animatedStyle,
        positionStyle,
        { position: "absolute", left: 0, right: 0, alignItems: "center", zIndex: 9999 },
      ]}
      className="px-6"
    >
      <View
        className={`${theme.bg} flex-row items-center px-5 py-3.5 rounded-full shadow-xl shadow-black/30 max-w-[90%] md:max-w-[400px]`}
      >
        <Ionicons name={theme.icon as any} size={22} color="white" />
        <Text className="text-white font-bold ml-3 text-sm flex-shrink" numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

export default MessageToast;
