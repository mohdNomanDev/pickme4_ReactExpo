import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LocationDropdown from "./LocationDropdown";

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<View>(null);

      const { colorScheme } = useColorScheme();
  const selectedAddress = useSelector(
    (state: RootState) => state.selectedAddress.selectedAddress,
  );

  // Determine what to display based on the selected address state
  const displayLocation = selectedAddress
    ? selectedAddress.title ||
      `${selectedAddress.city}, ${selectedAddress.region || selectedAddress.street}`
    : "Select Location";

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      buttonRef.current?.measureInWindow((x, y, width, height) => {
        setDropdownPos({
          top: y + height + 8, // 8px spacing below button
          left: x, // 320 is the w-80 width
        });
        setIsOpen(true);
      });
    }
  };

  const closeDropdown = () => setIsOpen(false);

  return (
    <View className="relative z-50">
      <View ref={buttonRef} collapsable={false}>
        <Pressable
          onPress={toggleDropdown}
          className={`flex-row items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-700 `}
        >
          {/* Icon Container */}
          <View className="bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-sm">
            <Ionicons name="location" size={14} color="#F97316" />
          </View>

          {/* Text Container */}
          <View
            className={`flex-col justify-center ${'items-start'} max-w-[150px]`}
          >
            <Text className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">
              {"Delivering to"}
            </Text>
            <Text
              className="text-sm font-extrabold text-gray-900 dark:text-white leading-none"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {displayLocation}
            </Text>
          </View>

          {/* Dropdown Indicator Container */}
          <View className={`${'ml-1'}`}>
            <Ionicons
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color={colorScheme === "dark" ? "#9CA3AF" : "#6B7280"}
            />
          </View>
        </Pressable>
      </View>

      {/* Render Dropdown when open using Modal for outside click detection */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        {/* Full screen background overlay that closes dropdown when tapped */}
        <Pressable className="flex-1" onPress={closeDropdown}>
          {/* The dropdown container itself. onPress={(e) => e.stopPropagation()} prevents closing when tapping inside */}
          <View
            style={{
              position: "absolute",
              top: dropdownPos.top,
              left: dropdownPos.left,
            }}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <LocationDropdown onClose={closeDropdown} />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
