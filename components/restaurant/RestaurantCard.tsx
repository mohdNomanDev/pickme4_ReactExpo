import { RootState } from "@/store/store";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IsBookmarked, toogleBookmark } from "../../store/bookmarkSlice";

type RestaurantCardProps = {
  id: number;
  name: string;
  images: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: string;

  cuisine?: string;
  offer?: string;
  featuredFoodName?: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  images,
  rating,
  deliveryTime,
  deliveryFee,
  cuisine,
  offer,
  featuredFoodName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const bookmarkState = useSelector((state: RootState) => state.bookmark);

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <TouchableOpacity>
      <View>
        {/* IMAGE SECTION */}
        <View>
          <Image source={{ uri: images[currentIndex] }} />

          {/* Food Name Overlay */}
          {featuredFoodName && (
            <View>
              <Text>{featuredFoodName}</Text>
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
            <Text>
              {IsBookmarked({ bookmark: bookmarkState }, id) ? "★" : "☆"}
            </Text>
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
