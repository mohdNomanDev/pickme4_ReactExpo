import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LocationDropdown() {
  return (
    <View 
      className={`absolute top-14 left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden ${Platform.OS === 'web' ? 'shadow-gray-200' : ''}`}
      style={Platform.OS !== 'web' ? { elevation: 5 } : {}}
    >
      {/* Header / Search Area */}
      <View className="p-3 border-b border-gray-100 bg-gray-50 flex-row items-center gap-2">
        <Ionicons name="search" size={18} color="#6B7280" />
        <TextInput 
          placeholder="Search for area, street name..." 
          className="flex-1 text-sm text-gray-800"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Action: Use Current Location */}
      <Pressable className="flex-row items-center gap-3 p-4 border-b border-gray-100 bg-orange-50/50 active:bg-orange-100">
        <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center">
          <Ionicons name="navigate" size={16} color="#F97316" />
        </View>
        <Text className="text-orange-600 font-medium">Use current location</Text>
      </Pressable>

      {/* Saved Addresses Section */}
      <View className="max-h-60">
        <Text className="px-4 py-2 mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Saved Addresses
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Saved Address Item - Selected */}
          <Pressable className="flex-row items-center gap-3 px-4 py-3 bg-gray-50 active:bg-gray-100">
            <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center">
              <Ionicons name="home" size={16} color="#4B5563" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">Home</Text>
              <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>Riyadh, Al Olaya, King Fahd Road</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color="#F97316" />
          </Pressable>

          {/* Saved Address Item - Unselected */}
          <Pressable className="flex-row items-center gap-3 px-4 py-3 active:bg-gray-50">
            <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="briefcase" size={16} color="#4B5563" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-700">Office</Text>
              <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>Jeddah, Al Shati, Corniche Road</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>

      {/* Action: Add New Address */}
      <Pressable className="flex-row items-center gap-2 p-4 border-t border-gray-100 active:bg-gray-50">
        <Ionicons name="add" size={20} color="#F97316" />
        <Text className="text-orange-600 font-bold text-sm">Add a new address</Text>
      </Pressable>
    </View>
  );
}
