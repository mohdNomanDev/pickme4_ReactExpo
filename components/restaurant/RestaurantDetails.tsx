import { useRTL } from "@/hooks/useRTL";
import { useRouter } from "expo-router";
import { Image, View, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
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
    <View className="flex-1 bg-[#0a0a0a]">
      {/* Background Image */}
      <View className="absolute top-0 w-full h-[60%]">
        <Image
          source={{ uri: data.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Overlay gradient/darken for better text readability and blending */}
        <View className="absolute inset-0 bg-black/30" />
      </View>

      {/* Fixed Header */}
      <View className="absolute top-12 left-0 right-0 px-4 z-20">
        <Header isRTL={isRTL} onBack={() => router.back()} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 z-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 320, paddingBottom: 40 }}
      >
        <BlurView
          intensity={80}
          tint="dark"
          className="mx-4 rounded-3xl overflow-hidden border border-white/10"
        >
          {/* We use a slightly transparent background to blend with BlurView */}
          <View className="px-5 pt-6 pb-8 bg-black/40">
            <Info data={data} lang={lang} isRTL={isRTL} />
            <Stats data={data} isRTL={isRTL} />
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetails;
