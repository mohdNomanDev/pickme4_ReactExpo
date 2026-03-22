import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onPress?: () => void;
  title?: string;
  count?: number;
};

const ShowResultsButton = ({
  onPress,
  title = "Show Results",
  count,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-primary active:bg-primary/90 py-4 px-6 rounded-2xl flex-row items-center justify-center shadow-sm w-full"
    >
      <Text className="text-white font-bold text-lg md:text-xl text-center">
        {title}
      </Text>
      {count !== undefined && count > 0 && (
        <View className="bg-white/20 px-3 py-1 rounded-full ml-3">
          <Text className="text-white font-bold text-sm md:text-base">{count}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default ShowResultsButton;