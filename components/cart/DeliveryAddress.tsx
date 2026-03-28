import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const DeliveryAddress = ({ address }: { address: any }) => {
  const { t } = useTranslation();

  return (
    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-900 dark:text-white">
          {t("cart.deliverTo", "Deliver to")}
        </Text>
        <TouchableOpacity className="bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full active:opacity-70">
          <Text className="text-orange-500 font-semibold text-xs">
            {t("cart.change", "CHANGE")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-start">
        <View className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3 mt-1">
          <Ionicons name="location-outline" size={20} className="text-gray-600 dark:text-gray-300" />
        </View>
        <View className="flex-1">
          {address ? (
            <>
              <Text className="font-semibold text-gray-900 dark:text-white mb-1">
                {address.type || t("cart.home", "Home")}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm leading-5">
                {address.street}, {address.district}, {address.city}
              </Text>
            </>
          ) : (
            <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {t("cart.noAddress", "No address selected")}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DeliveryAddress;
