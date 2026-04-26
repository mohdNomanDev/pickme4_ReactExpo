import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

interface AuthScreenProps {
  children: ReactNode;
  footer?: ReactNode;
  subtitle: string;
  title: string;
}

export default function AuthScreen({
  children,
  footer,
  subtitle,
  title,
}: AuthScreenProps) {
  return (
    <LinearGradient
      colors={["#fff7ed", "#f8f7f5", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-5 py-10 md:px-8"
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-auto w-full max-w-[480px]">
            <View className="mb-8 gap-3">
              <View className="h-16 w-16 items-center justify-center rounded-[24px] bg-orange-500 shadow-xl shadow-orange-500/30">
                <Text className="text-2xl font-black text-white">P4</Text>
              </View>
              <View className="gap-2">
                <Text className="text-4xl font-black tracking-tight text-gray-950 md:text-5xl">
                  {title}
                </Text>
                <Text className="text-base font-medium leading-6 text-gray-600">
                  {subtitle}
                </Text>
              </View>
            </View>

            <View className="gap-6 rounded-[32px] border border-orange-100 bg-white/95 p-5 shadow-2xl shadow-orange-500/10 dark:border-gray-800 dark:bg-card-dark md:p-7">
              {children}
            </View>

            {footer ? <View className="mt-7 items-center">{footer}</View> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
