import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

const Header = ({ isRTL, onBack }: any) => (
  <View>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} />
    </TouchableOpacity>

    <View>
      <TouchableOpacity>
        <Ionicons name="share-outline" size={22} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={22} />
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;
