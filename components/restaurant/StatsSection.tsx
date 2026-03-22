import { Text, View } from "react-native";
import { useMemo } from "react";

const Stats = ({ data, lang, isRTL }: any) => {
  const formattedDeliveryFee = useMemo(() => {
    if (data.deliveryFee === 0) {
      return isRTL ? "مجاناً" : "Free";
    }
    const currencyMap: Record<string, { en: string; ar: string }> = {
      SAR: { en: "SAR", ar: "ر.س" },
    };
    const cCode = data.currency || "SAR";
    const localizedCurrency = currencyMap[cCode]?.[lang] || cCode;
    
    return isRTL 
      ? `${data.deliveryFee} ${localizedCurrency}` 
      : `${localizedCurrency} ${data.deliveryFee}`;
  }, [data.deliveryFee, data.currency, lang, isRTL]);

  return (
    <View className="flex-row justify-between p-4 rounded-2xl bg-white/10 border border-white/5">
      {/* Offer */}
      <View className="flex-1 justify-center items-start">
        <Text className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">
          {isRTL ? "عرض حصري" : "EXCLUSIVE OFFER"}
        </Text>
        <Text className="text-sm font-bold text-white mb-1 text-start">
          {data.offer || (isRTL ? 'لا يوجد' : 'None')}
        </Text>
        <Text className="text-[10px] text-gray-400 text-start">
          {isRTL ? "تطبق الشروط والأحكام" : "T&C Apply"}
        </Text>
      </View>

      {/* Divider */}
      <View className="w-[1px] bg-white/20 mx-3 my-1" />

      {/* Delivery */}
      <View className="items-center justify-center flex-1">
        <Text className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          {isRTL ? "التوصيل" : "DELIVERY"}
        </Text>
        <Text className="text-sm font-bold text-white">
          {data.deliveryTime}
        </Text>
      </View>

      {/* Divider */}
      <View className="w-[1px] bg-white/20 mx-3 my-1" />

      {/* Fee */}
      <View className="items-center justify-center flex-1">
        <Text className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          {isRTL ? "الرسوم" : "FEE"}
        </Text>
        <Text className={`text-sm font-bold ${data.deliveryFee === 0 ? 'text-green-400' : 'text-white'}`}>
          {formattedDeliveryFee}
        </Text>
      </View>
    </View>
  );
};

export default Stats;
