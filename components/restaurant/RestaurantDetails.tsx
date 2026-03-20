import { useRTL } from "@/hooks/useRTL";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import Header from "./HeaderSection";
import Info from "./InfoSection";
import Stats from "./StatsSection";

type Restaurant = {
  image: string;
  rating: number;
  distance: string;
  area: {
    en: string;
    ar: string;
  };
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  offer: string;
  deliveryTime: string;
  deliveryFee: string;
};

type Props = {
  data: Restaurant;
};
const RestaurantDetails = ({ data }: Props) => {
  const { isRTL, lang } = useRTL();
  const router = useRouter();

  if (!data) return null;

  return (
    <View>
      <Image
        source={{ uri: data.image }}
        style={{ width: "100%", height: 300 }}
      />

      <Header isRTL={isRTL} onBack={() => router.back()} />

      <View>
        <Info data={data} lang={lang} isRTL={isRTL} />
        <Stats data={data} isRTL={isRTL} />
      </View>
    </View>
  );
};

export default RestaurantDetails;
