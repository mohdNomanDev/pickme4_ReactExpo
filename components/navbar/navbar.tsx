import React from "react";
import { View } from "react-native";
import BrandLogo from "../common/BrandLogo";
import LocationSelector from "./LocationSelector";

const Navbar = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-50">
      {/* Left Section: Brand */}
      <View className="flex-shrink-0">
        <BrandLogo />
      </View>

      {/* Center Section: Location Selector */}
      <View className="flex-1 items-start px-4 z-50">
        <LocationSelector />
      </View>
    </View>
  );
};

export default Navbar;
