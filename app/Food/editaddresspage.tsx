import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditAddress from "../../components/navbar/EditAddress";

export default function EditAddressPage() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-gray-50 dark:bg-background-dark">
      <View className="flex-1 w-full max-w-5xl mx-auto md:px-6">
        <EditAddress
          onCancel={() => router.back()}
          onSaveSuccess={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}
