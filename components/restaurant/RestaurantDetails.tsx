import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRTL } from "@/hooks/useRTL";
import { useRouter } from "expo-router";

type Props = {
  data: any;
};

const RestaurantDetails = ({ data }: Props) => {
  const { isRTL, lang } = useRTL();
  const router = useRouter();

  if (!data || Object.keys(data).length === 0) return null;

  return (
    <View>
      <View>
        <Image source={{ uri: data.image }} style={{ width: '100%', height: 300 }} />

        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} />
          </TouchableOpacity>
          
          <View>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={22} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View>
            <View>
              <View>
                <Text>{isRTL ? "تجربة فاخرة" : "PREMIUM DINING"}</Text>
              </View>
              <View>
                <Ionicons name="star" size={14} />
                <Text>
                  {data.rating} ({isRTL ? "٥٠٠+" : "500+"})
                </Text>
              </View>
              <View>
                <Ionicons name="location-sharp" size={14} />
                <Text>
                  {data.distance} • {data.area?.[lang] || data.area?.en}
                </Text>
              </View>
            </View>

            <View>
              <Text>{data.name?.[lang] || data.name?.en}</Text>
              <Text>{data.description?.[lang] || data.description?.en}</Text>
            </View>
          </View>

          <View>
            <View>
              <Text>{isRTL ? "عرض حصري" : "EXCLUSIVE OFFER"}</Text>
              <Text>{data.offer}</Text>
              <Text>{isRTL ? "تطبق الشروط والأحكام" : "T&C Apply"}</Text>
            </View>

            <View>
              <Text>{isRTL ? "التوصيل" : "DELIVERY"}</Text>
              <Text>{data.deliveryTime}</Text>
            </View>

            <View>
              <Text>{isRTL ? "الرسوم" : "FEE"}</Text>
              <Text>{data.deliveryFee}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RestaurantDetails;
