import React from 'react';
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
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
    <SafeAreaView edges={['bottom']} className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Stack.Screen 
        options={{
          title: t('profile.personal_info', 'Personal Information'),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
              <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={24} color="#374151" />
            </TouchableOpacity>
          ),
        }} 
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ 
            padding: 24, 
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
