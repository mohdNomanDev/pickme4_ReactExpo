import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Info = ({ data, lang, isRTL }: any) => (
  <View className="mb-6">
    {/* Tag */}
    <Text className="text-xs text-orange-500 font-semibold mb-2">
      {isRTL ? "تجربة فاخرة" : "PREMIUM DINING"}
    </Text>

    {/* Rating */}
    <View className="flex-row items-center gap-1 mb-2">
      <Ionicons name="star" size={14} color="#facc15" />
      <Text className="text-sm font-medium text-gray-800">
        {data.rating} (500+)
      </Text>
    </View>

    {/* Location */}
    <View className="flex-row items-center gap-1 mb-3">
      <Ionicons name="location-sharp" size={14} color="#6b7280" />
      <Text className="text-sm text-gray-600">
        {data.distance} • {data.area?.[lang] ?? data.area?.en}
      </Text>
    </View>

    {/* Name */}
    <Text
      className={`text-xl font-bold text-gray-900 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {data.name?.[lang] ?? data.name?.en}
    </Text>

    {/* Description */}
    <Text
      className={`text-sm text-gray-500 mt-1 leading-5 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {data.description?.[lang] ?? data.description?.en}
    </Text>
  </View>
);

export default Info;
