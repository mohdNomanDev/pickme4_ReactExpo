import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const OPTIONS = ["$", "$$", "$$$", "$$$$"];

const PriceRangeSection = ({ value, onChange }: any) => {
  return (
    <View>
      <Text>Price Range</Text>

      <View style={{ flexDirection: "row" }}>
        {OPTIONS.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => onChange(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PriceRangeSection;