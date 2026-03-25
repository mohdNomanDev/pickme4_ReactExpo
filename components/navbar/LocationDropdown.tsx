import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, ScrollView, Text, View, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SavedAddresses from "./SavedAddresses";
import AddNewAddress from "./AddNewAddress";

interface LocationDropdownProps {
  onClose?: () => void;
}

export default function LocationDropdown({ onClose }: LocationDropdownProps) {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { colorScheme } = useColorScheme();
  const [showAddNew, setShowAddNew] = useState(false);

  return (
    <>
      <View
        className={`w-80 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden ${Platform.OS === "web" ? "shadow-gray-200 dark:shadow-black" : ""}`}
        style={Platform.OS !== "web" ? { elevation: 5 } : {}}
      >
        {/* Action: Use Current Location */}
        <Pressable
          onPress={onClose}
          className={`flex-row items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-orange-50/50 dark:bg-orange-900/20 active:bg-orange-100 dark:active:bg-orange-900/40 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <View className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-full items-center justify-center">
            <Ionicons name="navigate" size={16} color="#F97316" />
          </View>
          <Text
            className={`text-orange-600 dark:text-orange-500 font-medium ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("location.use_current", "Use current location")}
          </Text>
        </Pressable>

        {/* Saved Addresses Section */}
        <View className="max-h-60">
          <ScrollView showsVerticalScrollIndicator={false}>
            <SavedAddresses onClose={onClose} />
          </ScrollView>
        </View>

        {/* Action: Add New Address */}
        <Pressable
          onPress={() => setShowAddNew(true)}
          className={`flex-row items-center gap-2 p-4 border-t border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800/50 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Ionicons name="add" size={20} color="#F97316" />
          <Text
            className={`text-orange-600 dark:text-orange-500 font-bold text-sm ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("location.add_new", "Add a new address")}
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={showAddNew}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddNew(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <Pressable className="flex-1" onPress={() => setShowAddNew(false)} />
          <AddNewAddress 
            onCancel={() => setShowAddNew(false)} 
            onSaveSuccess={() => {
              setShowAddNew(false);
              if (onClose) onClose();
            }}
          />
        </View>
      </Modal>
    </>
  );
}
