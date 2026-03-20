import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

 const Info = ({ data, lang, isRTL }: any) => (
  <View>
    <Text>{isRTL ? "تجربة فاخرة" : "PREMIUM DINING"}</Text>

    <View>
      <Ionicons name="star" size={14} />
      <Text>{data.rating} (500+)</Text>
    </View>

    <View>
      <Ionicons name="location-sharp" size={14} />
      <Text>
        {data.distance} • {data.area?.[lang] ?? data.area?.en}
      </Text>
    </View>

    <Text>{data.name?.[lang] ?? data.name?.en}</Text>
    <Text>{data.description?.[lang] ?? data.description?.en}</Text>
  </View>
);

export default Info;
