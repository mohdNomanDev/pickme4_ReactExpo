import React from "react";
import { TouchableOpacity, Text } from "react-native";

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
    <TouchableOpacity onPress={onPress}>
      <Text>
        {title} {count !== undefined ? `(${count})` : ""}
      </Text>
    </TouchableOpacity>
  );
};

export default ShowResultsButton;