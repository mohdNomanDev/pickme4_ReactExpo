import { useRTL } from "@/hooks/useRTL";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type FoodItem = {
  name: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  image: string;
  price: string;
};

type Props = {
  data: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
};

const FoodCard = ({ data, onAddToCart }: Props) => {
  const { lang } = useRTL();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(data);
    }
  };

  return (
    <View>
      {/* Food Image */}
      <Image source={{ uri: data.image }} />

      {/* Food Details */}
      <View>
        {/* Name */}
        <Text>{lang === "ar" ? data.name.ar : data.name.en}</Text>

        {/* Category */}
        <Text>{lang === "ar" ? data.category.ar : data.category.en}</Text>

        {/* Price */}
        <Text>{data.price}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity onPress={handleAddToCart}>
          <Text>{lang === "ar" ? "أضف إلى السلة" : "Add to Cart"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodCard;
