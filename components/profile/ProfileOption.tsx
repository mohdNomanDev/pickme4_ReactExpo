import React from 'react';
import { View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ProfileOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;isDestructive?: boolean;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onPress?: () => void;
}

export const ProfileOption = ({
  icon,
  title,
  value,
  isDestructive = false,
  hasSwitch = false,
  switchValue = false,
  onPress
}: ProfileOptionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={hasSwitch}
      activeOpacity={0.7}
      className={`flex-row items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800/50`}
    >
      <View className={`w-10 h-10 rounded-full items-center justify-center ${isDestructive ? 'bg-red-50 dark:bg-red-500/10' : 'bg-gray-50 dark:bg-gray-700'}`}>
        <Ionicons name={icon} size={20} color={isDestructive ? '#ef4444' : '#6b7280'} />
      </View>

      <View className="flex-1 px-4">
        <Text className={`text-base font-medium ${isDestructive ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
          {title}
        </Text>
      </View>

      {value && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 px-2 font-medium">
          {value}
        </Text>
      )}

      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onPress}
          trackColor={{ false: '#d1d5db', true: '#fdba74' }}
          thumbColor={switchValue ? '#f97316' : '#f3f4f6'}
          style={Platform.OS === 'ios' ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
        />
      ) : !isDestructive && (
        <Ionicons
          name={'chevron-forward'}
          size={20}
          color="#9ca3af"
        />
      )}
    </TouchableOpacity>
  );
};
