import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free", "Halal"];

const DietarySection = ({ value, onChange }: any) => {
  const toggleItem = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((v: string) => v !== item));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <View>
      <Text>Dietary</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {OPTIONS.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => toggleItem(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DietarySection;