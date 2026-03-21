import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BottomSheet = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>{children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomSheet;


/**     🧪 How to Use It
import React, { useState } from "react";
import { View, Button } from "react-native";
import BottomSheet from "./BottomSheet";

const ExampleScreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title="Open Sheet" onPress={() => setOpen(true)} />

      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        // {/* Add your components here */
//       </BottomSheet>
//     </View>
//   );
// };

// export default ExampleScreen;
// **/