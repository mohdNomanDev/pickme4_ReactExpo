import { useColorScheme } from "nativewind";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BrandLogo from "../common/BrandLogo";
import LocationSelector from "./LocationSelector";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
    const { colorScheme } = useColorScheme();

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 bg-white dark:bg-card-dark border-b border-gray-100 dark:border-gray-800 z-50 `}
    >
      {/* Left Section: Brand */}
      <View className="flex-shrink-0 hidden md:flex">
        <BrandLogo />
      </View>

      {/* Center Section: Location Selector */}
      <View
        className={`flex-1 px-4 z-50 ${'items-start'}`}
      >
        <LocationSelector />
      </View>

      {/* Right Section: Actions */}
      <View
        className={`flex-row items-center gap-2 flex-shrink-0 `}
      >
        <ModeToggle />
      </View>
    </View>
  );
};

export default Navbar;
