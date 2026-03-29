import React, { useState } from "react";
import { View, Text, Pressable, Modal, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LocationDropdown from "../navbar/LocationDropdown";

const DeliveryAddress = ({ address }: { address?: any }) => {
  const selectedAddress = useSelector((state: RootState) => state.selectedAddress.selectedAddress);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  // Use selectedAddress from store, fallback to prop if needed
  const displayAddress = selectedAddress || address;

  return (
    <>
      <View className="bg-card dark:bg-card-dark rounded-3xl p-5 shadow-lg shadow-black/5 dark:shadow-black/20 border border-border/50 dark:border-border-dark overflow-hidden">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-extrabold text-text dark:text-text-dark tracking-tight text-left">
            Deliver to
          </Text>
          <Pressable 
            onPress={() => setIsDropdownVisible(true)}
            className="flex-row items-center bg-primary/10 dark:bg-primary/20 px-3.5 py-1.5 rounded-full border border-primary/20 dark:border-primary/30"
            style={({ pressed, hovered }: any) => [
              {
                opacity: pressed ? 0.7 : hovered ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.96 : 1 }],
              }
            ]}
          >
            <Text className="text-primary font-bold text-[11px] uppercase tracking-[1px] mr-1">
              Change
            </Text>
            <Ionicons name="chevron-forward" size={14} className="text-primary" />
          </Pressable>
        </View>

        <View className="flex-row items-center">
          <View className="bg-primary/10 dark:bg-primary/20 p-3.5 rounded-2xl mr-4 border border-primary/20 dark:border-primary/30">
            <Ionicons
              name="location"
              size={24}
              className="text-primary"
            />
          </View>
          <View className="flex-1 justify-center">
            {displayAddress ? (
              <>
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-text dark:text-text-dark text-base text-left">
                    {displayAddress.type || displayAddress.title || "Home"}
                  </Text>
                  {displayAddress.isDefault && (
                    <View className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-md ml-2">
                      <Text className="text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">Default</Text>
                    </View>
                  )}
                </View>
                <Text className="text-text-muted dark:text-text-muted-dark text-[13px] leading-5 text-left pr-4" numberOfLines={2}>
                  {displayAddress.street || displayAddress.formattedAddress}
                  {displayAddress.district ? `, ${displayAddress.district}` : ""}
                  {displayAddress.city ? `, ${displayAddress.city}` : ""}
                </Text>
              </>
            ) : (
              <Text className="text-text-muted dark:text-text-muted-dark text-sm text-left italic">
                No address selected. Please add one.
              </Text>
            )}
          </View>
        </View>
      </View>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType={Platform.OS === 'web' ? 'fade' : 'slide'}
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <Pressable 
          className="flex-1 justify-end sm:justify-center items-center bg-black/50 p-0 sm:p-4" 
          onPress={() => setIsDropdownVisible(false)}
        >
          <Pressable 
            onPress={(e) => e.stopPropagation()}
            className="w-full sm:w-auto shadow-2xl shadow-black/20"
          >
            {/* Mobile Drag Indicator */}
            <View className="w-full items-center pt-4 pb-2 sm:hidden bg-white dark:bg-card-dark rounded-t-3xl">
              <View className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            </View>
            
            <LocationDropdown 
              onClose={() => setIsDropdownVisible(false)} 
              containerClassName="w-full sm:w-96 rounded-none sm:rounded-2xl border-0 sm:border pb-8 sm:pb-0"
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default DeliveryAddress;
