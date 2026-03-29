import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PromoCode = () => {
  
  return (
    <View className="bg-card dark:bg-card-dark rounded-2xl p-4 shadow-md border border-border dark:border-border-dark mb-4">
      <View className="flex-row items-center">
        <View className="flex-1 flex-row items-center bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-xl px-3 h-12">
          <Ionicons
            name="pricetag-outline"
            size={20}
            className="text-text-muted dark:text-text-muted-dark mr-2 "
          />
          <TextInput
            placeholder={"Enter Promo Code"}
            placeholderTextColor="#9ca3af"
            className="flex-1 text-text dark:text-text-dark font-medium text-left "
          />
        </View>
        <TouchableOpacity className="bg-border dark:bg-border-dark ml-3 px-5 h-12 justify-center rounded-xl active:opacity-80 border border-border dark:border-border-dark">
          <Text className="text-text dark:text-text-dark font-bold">
            {"Apply"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromoCode;
