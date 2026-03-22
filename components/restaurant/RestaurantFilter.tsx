import React from "react";
import { View } from "react-native";
import SortBySection from "./SortBySection";
import PriceRangeSection from "./PriceRangeSection";
import RatingSection from "./RatingSection";
import DietarySection from "./DietarySection";

export interface FilterState {
  sortBy: string;
  priceRange: string;
  rating: string;
  dietary: string[];
}

type Props = {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

const RestaurantFilter = ({ filters, setFilters }: Props) => {
  return (
    <View className="flex-1 w-full mt-2">
      <SortBySection 
        value={filters.sortBy} 
        onChange={(val: string) => setFilters(prev => ({ ...prev, sortBy: val }))} 
      />

      <PriceRangeSection 
        value={filters.priceRange} 
        onChange={(val: string) => setFilters(prev => ({ ...prev, priceRange: val }))} 
      />

      <RatingSection 
        value={filters.rating} 
        onChange={(val: string) => setFilters(prev => ({ ...prev, rating: val }))} 
      />

      <DietarySection 
        value={filters.dietary} 
        onChange={(val: string[]) => setFilters(prev => ({ ...prev, dietary: val }))} 
      />
    </View>
  );
};

export default RestaurantFilter;