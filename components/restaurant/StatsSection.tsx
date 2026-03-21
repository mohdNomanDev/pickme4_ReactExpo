import { Text, View } from "react-native";

const Stats = ({ data, isRTL }: any) => (
  <View className={`flex-row justify-between p-4 rounded-2xl bg-white/10 border border-white/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
    {/* Offer */}
    <View className={`flex-1 justify-center ${isRTL ? 'items-end' : 'items-start'}`}>
      <Text className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">
        {isRTL ? "عرض حصري" : "EXCLUSIVE OFFER"}
      </Text>
      <Text className={`text-sm font-bold text-white mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
        {data.offer}
      </Text>
      <Text className={`text-[10px] text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
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
      <Text className="text-sm font-bold text-white">
        {data.deliveryFee}
      </Text>
    </View>
  </View>
);

export default Stats;
