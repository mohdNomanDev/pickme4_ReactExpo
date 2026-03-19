import React from "react";
import { View, Text, FlatList } from "react-native";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import restaurantData from "@/TestData/RestaurantData.json";

const RestaurantCardList = () => {
  return (
    <View>
      {/* Heading */}
      <Text>
        {restaurantData.length} restaurants delivering you
      </Text>

      {/* List */}
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RestaurantCard restaurant={item} />
        )}
      />
    </View>
  );
};

export default RestaurantCardList;