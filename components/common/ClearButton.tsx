import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
  title?: string;
};

const ClearButton = ({ onPress, title = "Clear" }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default ClearButton;
