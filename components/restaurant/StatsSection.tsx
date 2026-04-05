import { Text, View } from "react-native";
import { useMemo } from "react";

const Stats = ({ data }: any) => {
  const formattedDeliveryFee = useMemo(() => {
    if (data.deliveryFee === 0) {
      return 'Free';
    }
    const currencyMap: Record<string, string> = {
      SAR: "SAR",
    };
    const cCode = data.currency || "SAR";
    const localizedCurrency = currencyMap[cCode] || cCode;
    
    return `${localizedCurrency} ${data.deliveryFee}`;
  }, [data.deliveryFee, data.currency]);

  return (
    <View className="flex-row justify-between p-4 rounded-2xl bg-white/10 border border-white/5">
      {/* Offer */}
      <View className="flex-1 justify-center items-start">
        <Text className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">
          {'EXCLUSIVE OFFER'}
        </Text>
        <Text className="text-sm font-bold text-white mb-1 text-start">
          {data.offer || ('None')}
        </Text>
        <Text className="text-[10px] text-gray-400 text-start">
          {'T&C Apply'}
        </Text>
      </View>

      {/* Divider */}
      <View className="w-[1px] bg-white/20 mx-3 my-1" />

      {/* Delivery */}
      <View className="items-center justify-center flex-1">
        <Text className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          {'DELIVERY'}
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
          {'FEE'}
        </Text>
        <Text className={`text-sm font-bold ${data.deliveryFee === 0 ? 'text-green-400' : 'text-white'}`}>
          {formattedDeliveryFee}
        </Text>
      </View>
    </View>
  );
};

export default Stats;
