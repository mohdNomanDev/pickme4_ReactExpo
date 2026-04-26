import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewAddress from "../../components/navbar/AddNewAddress";
import { AppDispatch } from "@/store/store";
import { showMessage } from "@/store/messageSlice";

export default function AddNewAddressPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams<{ fromAuth?: string }>();
  const isAuthFlow = params.fromAuth === "true";

  const handleCancel = () => {
    if (isAuthFlow) {
      router.replace("/auth/login");
      return;
    }

    router.back();
  };

  const handleSaveSuccess = () => {
    if (isAuthFlow) {
      dispatch(
        showMessage({
          message: "Address saved. You are ready to order.",
          type: "success",
        }),
      );
      router.replace("/(tabs)/home");
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-gray-50 dark:bg-background-dark"
    >
      <View className="flex-1 w-full max-w-5xl mx-auto md:px-6">
        <AddNewAddress
          onCancel={handleCancel}
          onSaveSuccess={handleSaveSuccess}
        />
      </View>
    </SafeAreaView>
  );
}
