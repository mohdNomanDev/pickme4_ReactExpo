import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";

const Header = ({ isRTL, onBack }: any) => (
  <View className="flex-row items-center justify-between">
    {/* Back */}
    <TouchableOpacity onPress={onBack} className="overflow-hidden rounded-full">
      <BlurView intensity={70} tint="dark" className="p-2.5 bg-black/30 border border-white/10">
        <Ionicons
          name={isRTL ? "arrow-forward" : "arrow-back"}
          size={24}
          color="#fff"
        />
      </BlurView>
    </TouchableOpacity>

    {/* Actions */}
    <View className="flex-row gap-3">
      <TouchableOpacity className="overflow-hidden rounded-full">
        <BlurView intensity={70} tint="dark" className="p-2.5 bg-black/30 border border-white/10">
          <Ionicons name="share-outline" size={22} color="#fff" />
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity className="overflow-hidden rounded-full">
        <BlurView intensity={70} tint="dark" className="p-2.5 bg-black/30 border border-white/10">
          <Ionicons name="heart-outline" size={22} color="#fff" />
        </BlurView>
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;
