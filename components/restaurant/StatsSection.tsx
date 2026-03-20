import { Text, View } from "react-native";

 const Stats = ({ data, isRTL }: any) => (
  <View>
    <View>
      <Text>{isRTL ? "عرض حصري" : "EXCLUSIVE OFFER"}</Text>
      <Text>{data.offer}</Text>
      <Text>{isRTL ? "تطبق الشروط والأحكام" : "T&C Apply"}</Text>
    </View>

    <View>
      <Text>{isRTL ? "التوصيل" : "DELIVERY"}</Text>
      <Text>{data.deliveryTime}</Text>
    </View>

    <View>
      <Text>{isRTL ? "الرسوم" : "FEE"}</Text>
      <Text>{data.deliveryFee}</Text>
    </View>
  </View>
);
export default Stats;