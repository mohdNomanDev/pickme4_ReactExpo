import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const OPTIONS = ["4.5+", "4.0+", "3.5+"];

const RatingSection = ({ value, onChange }: any) => {
  return (
    <View>
      <Text>Ratings</Text>

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

export default RatingSection;