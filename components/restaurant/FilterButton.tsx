import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const FilterButton = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Ionicons name="filter" size={20} />
    </TouchableOpacity>
  );
};

export default FilterButton;
