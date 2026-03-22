import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Rating", value: "rating" },
  { label: "Delivery Time", value: "delivery_time" },
  { label: "Price: Low to High", value: "price_low_high" },
];

const SortBySection = ({ value, onChange }: any) => {
  return (
    <View>
      <Text>Sort By</Text>

      {OPTIONS.map((item) => (
        <TouchableOpacity
          key={item.value}
          onPress={() => onChange(item.value)}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SortBySection;