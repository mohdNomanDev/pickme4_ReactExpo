import React from "react";
import { View, Text, Image } from "react-native";

type Props = {
  data: any;
};

const RestaurantDetails = ({ data }: Props) => {
  return (
    <View>
      
      {/* Background Image */}
      <Image source={{ uri: data.image }} />

      {/* Overlay Content */}
      <View>

        {/* Top Row */}
        <View>
          <Text>PREMIUM DINING</Text>

          <View>
            <Text>{data.rating} (500+)</Text>
          </View>

          <View>
            <Text>{data.distance}</Text>
            <Text>{data.area.en}</Text>
          </View>
        </View>

        {/* Restaurant Name */}
        <Text>{data.name.en}</Text>

        {/* Description */}
        <Text>{data.description.en}</Text>

        {/* Bottom Cards */}
        <View>

          {/* Offer */}
          <View>
            <Text>EXCLUSIVE OFFER</Text>
            <Text>{data.offer}</Text>
          </View>

          {/* Delivery Time */}
          <View>
            <Text>DELIVERY</Text>
            <Text>{data.deliveryTime}</Text>
          </View>

          {/* Delivery Fee */}
          <View>
            <Text>FEE</Text>
            <Text>{data.deliveryFee}</Text>
          </View>

        </View>

      </View>

    </View>
  );
};

export default RestaurantDetails;