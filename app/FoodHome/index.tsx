import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../../components/navbar/navbar';

export default function FoodHome() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      {/* Top Navigation Area */}
      <View className="z-50 bg-white shadow-sm border-b border-gray-100 w-full">
         <View className="max-w-7xl mx-auto w-full">
           <Navbar />
         </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        className="w-full flex-1"
      >
        <View className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 flex-1 gap-8">
          
          {/* Banner / Offers Carousel Section */}
          <View className="w-full h-48 md:h-64 bg-gray-200 rounded-3xl items-center justify-center border border-gray-300">
            <Text className="text-gray-500 font-bold text-lg">Banner Section</Text>
          </View>

          {/* Quick Categories Section */}
          <View className="w-full">
            <Text className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">Categories</Text>
            <View className="w-full h-24 md:h-32 bg-gray-200 rounded-2xl items-center justify-center border border-gray-300">
              <Text className="text-gray-500 font-bold text-lg">Categories Section</Text>
            </View>
          </View>

          {/* Featured Restaurants Section */}
          <View className="w-full flex-1">
            <Text className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">Featured Restaurants</Text>
            <View className="w-full h-64 md:h-96 bg-gray-200 rounded-3xl items-center justify-center border border-gray-300">
              <Text className="text-gray-500 font-bold text-lg">Featured Restaurants Section</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
