import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

const Header = ({ isRTL, onBack }: any) => (
  <View className="flex-row items-center justify-between">
    {/* Back */}
    <TouchableOpacity
      onPress={onBack}
      className="bg-white/90 p-2 rounded-full shadow"
    >
      <Ionicons
        name={isRTL ? "arrow-forward" : "arrow-back"}
        size={22}
        color="#000"
      />
    </TouchableOpacity>

    {/* Actions */}
    <View className="flex-row gap-3">
      <TouchableOpacity className="bg-white/90 p-2 rounded-full shadow">
        <Ionicons name="share-outline" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity className="bg-white/90 p-2 rounded-full shadow">
        <Ionicons name="heart-outline" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;
