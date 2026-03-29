import React from "react";
import { Image, Text, View } from "react-native";
import QuantityControl from "./QuantityControl";
import { useTranslation } from "react-i18next";

const CartItemCard = ({
  item,
  restaurantId,
}: {
  item: any;
  restaurantId: string;
}) => {
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center bg-background dark:bg-background-dark rounded-xl p-3 shadow-sm border border-border dark:border-border-dark">
      <Image
        source={{
          uri:
            item.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        }}
        className="w-16 h-16 rounded-xl bg-border dark:bg-border-dark mr-3 rtl:mr-0 rtl:ml-3"
      />
      <View className="flex-1 justify-center">
        <Text
          className="text-base font-semibold text-text dark:text-text-dark mb-1 text-left rtl:text-right"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-primary font-bold text-sm text-left rtl:text-right">
          {t("currency", "SAR")} {item.price.toFixed(2)}
        </Text>
      </View>
      <View className="ml-2 rtl:ml-0 rtl:mr-2">
        <QuantityControl
          quantity={item.quantity}
          item={item}
          restaurantId={restaurantId}
        />
      </View>
    </View>
  );
};

export default CartItemCard;
