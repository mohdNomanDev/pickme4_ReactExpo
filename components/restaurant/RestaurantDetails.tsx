import { useRTL } from "@/hooks/useRTL";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
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
  deliveryFee: number;
  currency?: string;
};

type Props = {
  data: Restaurant;
};

const RestaurantDetails = ({ data }: Props) => {
  const { isRTL, lang } = useRTL();
  const router = useRouter();

  if (!data) return null;

  return (
    <View className="w-full">
      {/* Background Image */}
      <View className="relative w-full h-72 md:h-96 lg:h-[450px]">
        <Image
          source={{ uri: data.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Overlay gradient/darken for better text readability and blending */}
        <View className="absolute inset-0 bg-black/30" />
        
        {/* Absolute Header inside the image container */}
        <View className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-20">
          <Header isRTL={isRTL} onBack={() => router.back()} />
        </View>
      </View>

      {/* Info Content pulled up over the image */}
      <View className="z-30 px-4 md:px-10 -mt-16 md:-mt-24 max-w-5xl mx-auto w-full mb-8">
        <BlurView
          intensity={80}
          tint="dark"
          className="rounded-3xl overflow-hidden border border-white/10 shadow-xl"
        >
          {/* We use a slightly transparent background to blend with BlurView */}
          <View className="px-5 pt-6 pb-8 bg-black/40">
            <Info data={data} lang={lang} isRTL={isRTL} />
            <Stats data={data} lang={lang} isRTL={isRTL} />
          </View>
        </BlurView>
      </View>
    </View>
  );
};

export default RestaurantDetails;
