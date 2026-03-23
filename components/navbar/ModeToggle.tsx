import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function ModeToggle() {
  return (
    <View>
      {/* Food Mode Button */}
      <Pressable>
        <Text>FoodIcon</Text>
        <Text>Food</Text>
      </Pressable>

      {/* Ride Mode Button */}
      <Pressable>
        <Text>CarIcon</Text>
        <Text>Ride</Text>
      </Pressable>
    </View>
  );
}
