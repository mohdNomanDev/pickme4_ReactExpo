import React from "react";
import { Text, Pressable } from "react-native";

type Props = {
  onPress?: () => void;
  title?: string;
};

const ClearButton = ({ onPress, title = "Clear" }: Props) => {
  return (
    <Pressable 
      onPress={onPress} 
      className="active:opacity-70 px-2 py-2"
    >
      <Text className="text-red-500 dark:text-red-400 font-semibold text-base md:text-lg">
        {title}
      </Text>
    </Pressable>
  );
};

export default ClearButton;
