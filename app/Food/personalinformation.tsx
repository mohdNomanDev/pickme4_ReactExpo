import React from 'react';
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUserProfile } from '../../store/userSlice';
import { ProfileInfo } from '../../components/profile/ProfileInfo';

export default function PersonalInformationPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleSave = (data: any) => {
    // Only update if there are changes
    if (data && Object.keys(data).length > 0) {
      console.log('Updating user state with:', data);
      dispatch(updateUserProfile(data));
    } else {
      console.log('No changes detected, skipping update');
    }
    
    // Always navigate back
    router.back();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Professional Custom Header */}
      <View className={`w-full px-4 h-16 flex-row items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700/50 `}>
        <View className="flex-1 items-start">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 rounded-full items-center justify-center bg-gray-50 dark:bg-gray-700/50"
          >
            <Ionicons 
              name={'chevron-back'} 
              size={24} 
              color="#374151" 
              className="dark:text-gray-200"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-[2] items-center">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">
            {'Personal Information'}
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
          contentContainerClassName="px-5 py-6 pb-10 items-center"
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
