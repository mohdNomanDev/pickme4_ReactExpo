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
    <View className="flex-1 bg-gray-100">
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: data.image }}
          className="w-full h-[260px]"
          resizeMode="cover"
        />

        {/* Overlay */}
        <View className="absolute inset-0 bg-black/20" />

        {/* Header */}
        <View className="absolute top-12 left-0 right-0 px-4">
          <Header isRTL={isRTL} onBack={() => router.back()} />
        </View>
      </View>

      {/* Content */}
      <View className="bg-white -mt-6 rounded-t-3xl px-4 pt-5 pb-8">
        <Info data={data} lang={lang} isRTL={isRTL} />
        <Stats data={data} isRTL={isRTL} />
      </View>
    </View>
  );
};

export default RestaurantDetails;
