import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress?: () => void;
};

const CloseButton = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 active:opacity-70"
    >
      <Ionicons
        name="close"
        size={24}
        className="text-gray-900 dark:text-white"
        color="#888"
      />
    </Pressable>
  );
};

export default CloseButton;
