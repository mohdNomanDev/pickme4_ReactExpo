import React from 'react';
import { View, Text, Pressable } from 'react-native';
// You can import icons from lucide-react-native or @expo/vector-icons later
// import { MapPin, ChevronDown } from 'lucide-react-native';

export default function LocationSelector() {
  return (
    <Pressable>
      {/* Icon Container */}
      <View>
        {/* <MapPin size={20} /> */}
        <Text>MapIcon</Text>
      </View>

      {/* Text Container */}
      <View>
        <Text>Delivering to</Text>
        <Text>Riyadh, Al Olaya</Text>
      </View>

      {/* Dropdown Indicator Container */}
      <View>
        {/* <ChevronDown size={16} /> */}
        <Text>DownIcon</Text>
      </View>
    </Pressable>
  );
}
