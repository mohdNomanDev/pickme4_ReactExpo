import React from "react";
import { FlatList, Text, View } from "react-native";
import FoodCard from "./FoodCard";

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
  foodItems: FoodItem[];
};

const FoodCardListing = ({ foodItems }: Props) => {
  const renderItem = ({ item }: { item: FoodItem }) => {
    return <FoodCard data={item} />;
  };

  return (
    <View>
      <Text>All Dishes</Text>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default FoodCardListing;
