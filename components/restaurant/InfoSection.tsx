import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Info = ({ data, lang, isRTL }: any) => (
  <View className="mb-6">
    {/* Tag & Rating row */}
    <View className={`flex-row items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <View className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
        <Text className="text-xs text-orange-400 font-bold tracking-wide">
          {isRTL ? "تجربة فاخرة" : "PREMIUM DINING"}
        </Text>
      </View>
      <View className={`flex-row items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Ionicons name="star" size={16} color="#facc15" />
        <Text className="text-sm font-bold text-white">
          {data.rating} <Text className="text-gray-400 font-normal">(500+)</Text>
        </Text>
      </View>
    </View>

    {/* Name */}
    <Text
      className={`text-3xl font-extrabold text-white mb-2 tracking-tight ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {data.name?.[lang] ?? data.name?.en}
    </Text>

    {/* Location */}
    <View className={`flex-row items-center gap-1.5 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Ionicons name="location-sharp" size={16} color="#f87171" />
      <Text className="text-sm font-medium text-gray-300">
        {data.distance} • {data.area?.[lang] ?? data.area?.en}
      </Text>
    </View>

    {/* Description */}
    <Text
      className={`text-base text-gray-300 leading-6 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {data.description?.[lang] ?? data.description?.en}
    </Text>
  </View>
);

export default Info;
