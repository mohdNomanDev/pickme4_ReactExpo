import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DeliveryAddress = ({ address }: { address: any }) => {
  
  return (
    <View className="bg-card dark:bg-card-dark rounded-2xl p-4 shadow-md border border-border dark:border-border-dark">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-text dark:text-text-dark text-left ">
          {"Deliver to"}
        </Text>
        <TouchableOpacity className="bg-primary/20 px-4 py-1.5 rounded-full active:opacity-80">
          <Text className="text-primary font-semibold text-xs">
            {"CHANGE"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-start">
        <View className="bg-background dark:bg-background-dark p-2.5 rounded-full mr-3 mt-1 border border-border dark:border-border-dark">
          <Ionicons
            name="location-outline"
            size={20}
            className="text-primary"
          />
        </View>
        <View className="flex-1">
          {address ? (
            <>
              <Text className="font-semibold text-text dark:text-text-dark mb-1 text-left ">
                {address.type || "Home"}
              </Text>
              <Text className="text-text-muted dark:text-text-muted-dark text-sm leading-5 text-left ">
                {address.street}, {address.district}, {address.city}
              </Text>
            </>
          ) : (
            <Text className="text-text-muted dark:text-text-muted-dark text-sm mt-1 text-left ">
              {"No address selected"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DeliveryAddress;
