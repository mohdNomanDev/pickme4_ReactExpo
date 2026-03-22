import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import CloseButton from "./CloseButton";
import ClearButton from "./ClearButton";
import ShowResultsButton from "./ShowResultsButton";

type Props = {
  visible: boolean;
  onClose: () => void;
  onClear?: () => void;
  onApply?: () => void;
  resultsCount?: number;
  title?: string;
  children: React.ReactNode;
};

const FilterSheet = ({
  visible,
  onClose,
  onClear,
  onApply,
  resultsCount,
  title,
  children,
}: Props) => {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { height, width } = useWindowDimensions();

  // Determine if the device is a tablet or web browser (large screen)
  const isLargeScreen = width >= 768;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View 
        className={`flex-1 bg-black/50 ${isLargeScreen ? 'justify-center items-center p-4' : 'justify-end'}`}
      >
        {/* Background Overlay */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>

        {/* Modal / Bottom Sheet Container */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className={`w-full max-w-2xl flex-shrink-1 ${!isLargeScreen ? 'mt-auto' : ''}`}
        >
          <View 
            className={`bg-white dark:bg-card-dark shadow-2xl overflow-hidden flex-shrink-1 w-full ${
              isLargeScreen ? 'rounded-3xl' : 'rounded-t-3xl pb-safe'
            }`}
            style={{ 
              // Using exact pixel calculation to prevent web CSS height bounding issues
              maxHeight: height * (isLargeScreen ? 0.85 : 0.9) 
            }}
          >
            {/* Header Section */}
            <View
              className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800"
            >
              <CloseButton onPress={onClose} />

              <Text className="flex-1 text-center text-xl md:text-2xl font-bold text-gray-900 dark:text-white mx-4">
                {title || (isRTL ? "تصفية" : "Filter Options")}
              </Text>

              <ClearButton onPress={onClear} title={isRTL ? "مسح" : "Clear"} />
            </View>

            {/* Scrollable Content */}
            <ScrollView
              className="px-6 py-4 flex-shrink-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              {children}
            </ScrollView>

            {/* Footer Section */}
            <View className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark">
              <ShowResultsButton
                onPress={onApply}
                title={isRTL ? "عرض النتائج" : "Show Results"}
                count={resultsCount}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default FilterSheet;
