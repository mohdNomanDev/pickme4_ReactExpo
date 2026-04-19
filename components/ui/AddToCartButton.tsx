import React, { useCallback } from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";

interface FoodItem {
  name: string;
  image: string;
  price?: number;
}

interface AddToCartButtonProps {
  item: FoodItem;
  restaurantId: string;
  restaurantName: string; // Required for cart display
  className?: string;
  iconSize?: number;
  iconColor?: string;
}

/**
 * Reusable AddToCartButton Component
 * Handles Redux cart logic and provides a consistent UI.
 */
const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  item,
  restaurantId,
  restaurantName,
  className = "",
  iconSize = 24,
  iconColor = "#f97316",
}) => {
  const dispatch = useDispatch();

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      if (item.price !== undefined) {
        dispatch(
          addItem({
            restaurantId,
            restaurantName,
            item: {
              name: item.name,
              image: item.image,
              price: item.price,
            },
          })
        );
      }
    },
    [dispatch, item, restaurantId, restaurantName]
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-primary/10 dark:bg-primary/20 w-10 h-10 rounded-full items-center justify-center active:bg-primary/20 dark:active:bg-primary/30 transition-colors ${className}`}
      activeOpacity={0.7}
    >
      <Ionicons name="add" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default AddToCartButton;
