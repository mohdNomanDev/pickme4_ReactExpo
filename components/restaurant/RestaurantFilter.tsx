import React, { useState } from "react";
import { View } from "react-native";
import SortBySection from "./SortBySection";
import PriceRangeSection from "./PriceRangeSection";
import RatingSection from "./RatingSection";
import DietarySection from "./DietarySection";

const RestaurantFilter = () => {
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState("$$");
  const [rating, setRating] = useState("4.0+");
  const [dietary, setDietary] = useState<string[]>([]);

  return (
    <View>
      <SortBySection value={sortBy} onChange={setSortBy} />

      <PriceRangeSection value={priceRange} onChange={setPriceRange} />

      <RatingSection value={rating} onChange={setRating} />

      <DietarySection value={dietary} onChange={setDietary} />
    </View>
  );
};

export default RestaurantFilter;