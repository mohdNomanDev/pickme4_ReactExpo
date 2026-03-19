import { RootState } from "@/store/store";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IsBookmarked, toogleBookmark } from "../../store/bookmarkSlice";

type FoodItem = {
  name: string;
  image: string;
  price?: string;
};

type RestaurantCardProps = {
  id: number;
  name: string;
  foodItems: FoodItem[];

  rating: number;
  deliveryTime: string;
  deliveryFee: string;

  cuisine?: string;
  offer?: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  foodItems,
  rating,
  deliveryTime,
  deliveryFee,
  cuisine,
  offer,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();
  const bookmarkState = useSelector((state: RootState) => state.bookmark);

  const currentFood = foodItems?.[currentIndex];

  const handleNext = () => {
    if (!foodItems?.length) return;
    setCurrentIndex((prev) => (prev + 1) % foodItems.length);
  };

  const handlePrev = () => {
    if (!foodItems?.length) return;
    setCurrentIndex((prev) => (prev === 0 ? foodItems.length - 1 : prev - 1));
  };

  const isBookmarked = IsBookmarked({ bookmark: bookmarkState }, id);

  return (
    <TouchableOpacity>
      <View>
        {/* IMAGE SECTION */}
        <View>
          {currentFood?.image && <Image source={{ uri: currentFood.image }} />}

          {/* Food Name (SYNCED with image) */}
          {currentFood?.name && (
            <View>
              <Text>{currentFood.name + " " + currentFood.price}</Text>
            </View>
          )}

          {/* Offer Badge */}
          {offer && (
            <View>
              <Text>{offer}</Text>
            </View>
          )}

          {/* Bookmark Button */}
          <TouchableOpacity onPress={() => dispatch(toogleBookmark(id))}>
            <Text>{isBookmarked ? "★" : "☆"}</Text>
          </TouchableOpacity>

          {/* Slider Controls */}
          <View>
            <TouchableOpacity onPress={handlePrev}>
              <Text>{"<"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext}>
              <Text>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DETAILS */}
        <View>
          <Text>{name}</Text>

          {cuisine && <Text>{cuisine}</Text>}

          <Text>{rating}</Text>
          <Text>{deliveryTime}</Text>
          <Text>{deliveryFee}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
