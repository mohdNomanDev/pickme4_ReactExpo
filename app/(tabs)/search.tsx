import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SearchPage() {
    
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-50 dark:bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-[100px]"
        showsVerticalScrollIndicator={false}
      >

        <View className="flex-1 items-center justify-center py-20 px-6 max-w-5xl mx-auto w-full min-h-[60vh]">
          <View className="w-24 h-24 bg-orange-100 dark:bg-orange-500/20 rounded-full items-center justify-center mb-6">
            <Ionicons name="search" size={48} color="#f97316" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {'Search'}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center max-w-xs leading-5">
            Discover your favorite foods, restaurants, and special offers.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
