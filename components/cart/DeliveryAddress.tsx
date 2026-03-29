import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const DeliveryAddress = ({ address }: { address: any }) => {
  const { t } = useTranslation();

  return (
    <View className="bg-card dark:bg-card-dark rounded-2xl p-4 shadow-md border border-border dark:border-border-dark">
      <View className="flex-row rtl:flex-row-reverse items-center justify-between mb-3">
        <Text className="text-lg font-bold text-text dark:text-text-dark text-left rtl:text-right">
          {t("cart.deliverTo", "Deliver to")}
        </Text>
        <TouchableOpacity className="bg-primary/20 px-4 py-1.5 rounded-full active:opacity-80">
          <Text className="text-primary font-semibold text-xs">
            {t("cart.change", "CHANGE")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row rtl:flex-row-reverse items-start">
        <View className="bg-background dark:bg-background-dark p-2.5 rounded-full mr-3 mt-1 rtl:mr-0 rtl:ml-3 border border-border dark:border-border-dark">
          <Ionicons
            name="location-outline"
            size={20}
            className="text-primary"
          />
        </View>
        <View className="flex-1">
          {address ? (
            <>
              <Text className="font-semibold text-text dark:text-text-dark mb-1 text-left rtl:text-right">
                {address.type || t("cart.home", "Home")}
              </Text>
              <Text className="text-text-muted dark:text-text-muted-dark text-sm leading-5 text-left rtl:text-right">
                {address.street}, {address.district}, {address.city}
              </Text>
            </>
          ) : (
            <Text className="text-text-muted dark:text-text-muted-dark text-sm mt-1 text-left rtl:text-right">
              {t("cart.noAddress", "No address selected")}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DeliveryAddress;
