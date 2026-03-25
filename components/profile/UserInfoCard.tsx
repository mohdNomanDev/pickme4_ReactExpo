import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserInfoCardProps {
  avatar: string;
  userName: string;
  phone: string;
  onEditPress?: () => void;
}

export const UserInfoCard = ({ avatar, userName, phone, onEditPress }: UserInfoCardProps) => {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-[28px] p-5 shadow-sm shadow-black/5 flex-row items-center mb-6">
      <Image
        source={{ uri: avatar }}
        className="w-16 h-16 rounded-full bg-gray-200"
      />
      <View className="flex-1 px-4 justify-center">
        <Text className="text-xl font-bold text-gray-900 dark:text-white text-start mb-1">
          {userName}
        </Text>
        <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 text-start">
          {phone}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={onEditPress}
        className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 rounded-full items-center justify-center"
      >
        <Ionicons name="pencil" size={18} color="#f97316" />
      </TouchableOpacity>
    </View>
  );
};
