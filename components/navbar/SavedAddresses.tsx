import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress } from "../../store/selectedAddressSlice";
import { RootState } from "../../store/store";

interface SavedAddressesProps {
  onClose?: () => void;
}

export default function SavedAddresses({ onClose }: SavedAddressesProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const selectedAddress = useSelector(
    (state: RootState) => state.selectedAddress.selectedAddress,
  );

  if (
    !currentUser ||
    !currentUser.addresses ||
    currentUser.addresses.length === 0
  ) {
    return null;
  }

  const handleSelectAddress = (address: any) => {
    dispatch(
      setSelectedAddress({
        id: address.id,
        title: address.title,
        formattedAddress: `${address.city}, ${address.district}, ${address.street}`,
        latitude: address.coordinates?.lat,
        longitude: address.coordinates?.lng,
        street: address.street,
        city: address.city,
        region: address.district,
      }),
    );
    if (onClose) {
      onClose();
    }
  };

  const getIconName = (type: string) => {
    switch (type?.toLowerCase()) {
      case "home":
        return "home";
      case "work":
      case "office":
        return "briefcase";
      default:
        return "location";
    }
  };

  return (
    <View>
      <Text
        className={`px-4 py-2 mt-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {t("location.saved_addresses", "Saved Addresses")}
      </Text>

      <FlatList
        data={currentUser.addresses}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // Since this will likely be inside a ScrollView in LocationDropdown
        renderItem={({ item }) => {
          const isSelected =
            selectedAddress?.id === item.id ||
            (!selectedAddress && item.isDefault);

          return (
            <Pressable
              onPress={() => handleSelectAddress(item)}
              className={`flex-row items-center gap-3 px-4 py-3 active:bg-gray-100 dark:active:bg-gray-800 ${
                isSelected ? "bg-gray-50 dark:bg-gray-800/50" : ""
              } ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  isSelected
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <Ionicons
                  name={getIconName(item.type)}
                  size={16}
                  color={
                    colorScheme === "dark"
                      ? isSelected
                        ? "#D1D5DB"
                        : "#9CA3AF"
                      : "#4B5563"
                  }
                />
              </View>

              <View className={`flex-1 ${isRTL ? "items-end" : "items-start"}`}>
                <Text
                  className={`text-sm font-bold ${
                    isSelected
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-xs text-gray-500 dark:text-gray-400 mt-0.5"
                  numberOfLines={1}
                >
                  {item.city}, {item.district}, {item.street}
                </Text>
              </View>

              {isSelected && (
                <Ionicons name="checkmark-circle" size={20} color="#F97316" />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}
