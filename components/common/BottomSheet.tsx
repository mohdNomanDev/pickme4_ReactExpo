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
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        {/* Background Overlay */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet Container */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full justify-end max-w-2xl mx-auto"
        >
          <View className="bg-white dark:bg-card-dark rounded-t-3xl shadow-2xl border-t border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Draggable Indicator */}
            <View className="w-full items-center pt-4 pb-2">
              <View className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </View>
            
            {/* Sheet Content */}
            <View className="px-6 pb-8 pt-2">
              {children}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
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
