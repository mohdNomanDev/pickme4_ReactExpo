import { Text, View } from "react-native";

const Stats = ({ data, isRTL }: any) => (
  <View className="flex-row justify-between bg-gray-50 p-4 rounded-2xl">
    {/* Offer */}
    <View className="flex-1">
      <Text className="text-xs text-orange-500 font-semibold">
        {isRTL ? "عرض حصري" : "EXCLUSIVE OFFER"}
      </Text>
      <Text className="text-sm font-bold text-gray-900 mt-1">{data.offer}</Text>
      <Text className="text-xs text-gray-400 mt-1">
        {isRTL ? "تطبق الشروط والأحكام" : "T&C Apply"}
      </Text>
    </View>

    {/* Divider */}
    <View className="w-[1px] bg-gray-200 mx-3" />

    {/* Delivery */}
    <View className="items-center flex-1">
      <Text className="text-xs text-gray-500">
        {isRTL ? "التوصيل" : "DELIVERY"}
      </Text>
      <Text className="text-sm font-semibold text-gray-900 mt-1">
        {data.deliveryTime}
      </Text>
    </View>

    {/* Divider */}
    <View className="w-[1px] bg-gray-200 mx-3" />

    {/* Fee */}
    <View className="items-center flex-1">
      <Text className="text-xs text-gray-500">{isRTL ? "الرسوم" : "FEE"}</Text>
      <Text className="text-sm font-semibold text-gray-900 mt-1">
        {data.deliveryFee}
      </Text>
    </View>
  </View>
);

export default Stats;
