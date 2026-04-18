import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewAddress from "../../components/navbar/AddNewAddress";

export default function AddNewAddressPage() {

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-gray-50 dark:bg-background-dark"
    >
      <View className="flex-1 w-full max-w-5xl mx-auto md:px-6">
        <AddNewAddress
          onCancel={() => router.back()}
          onSaveSuccess={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}
