import { useRouter } from "expo-router";
import React from "react";
import PageContainer from "../../components/common/PageContainer";
import AddNewAddress from "../../components/navbar/AddNewAddress";

export default function AddNewAddressPage() {
  const router = useRouter();

  return (
    <PageContainer scrollable={false} contentContainerClassName="p-0">
      <AddNewAddress
        onCancel={() => router.back()}
        onSaveSuccess={() => router.back()}
      />
    </PageContainer>
  );
}
