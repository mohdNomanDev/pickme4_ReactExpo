import React from 'react';
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import { Ionicons } from '@expo/vector-icons';
import UserData from '../../TestData/UserData.json';
import { ProfileInfo } from '../../components/profile/ProfileInfo';

const currentUser = UserData[0];

export default function PersonalInformationPage() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const router = useRouter();

  const handleSave = (data: any) => {
    // Navigate back after saving
    console.log('Saved personal info:', data);
    router.back();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Professional Custom Header */}
      <View className={`w-full px-4 h-16 flex-row items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <View className="flex-1 items-start">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 rounded-full items-center justify-center bg-gray-50 dark:bg-gray-700/50"
          >
            <Ionicons 
              name={isRTL ? "chevron-forward" : "chevron-back"} 
              size={24} 
              color="#374151" 
              className="dark:text-gray-200"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-[2] items-center">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">
            {t('profile.personal_info', 'Personal Information')}
          </Text>
        </View>

        <View className="flex-1 items-end">
          {/* Empty view for balance */}
          <View className="w-10" />
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ 
            paddingHorizontal: 20,
            paddingVertical: 24, 
            paddingBottom: 40,
            alignItems: 'center'
          }}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View className="w-full max-w-[800px]">
            <ProfileInfo user={currentUser} onSave={handleSave} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
