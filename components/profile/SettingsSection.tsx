import React from 'react';
import { View, Text } from 'react-native';

export const SettingsSection = ({ 
  title, 
  children, 
  isLast = false 
}: { 
  title: string; 
  children: React.ReactNode;
  isLast?: boolean;
}) => {
  return (
    <>
      <Text className="text-sm font-bold text-gray-900 dark:text-white mb-3 px-2 text-start uppercase tracking-wider">
        {title}
      </Text>
      <View className={`bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-sm shadow-black/5 ${isLast ? 'mb-6' : 'mb-8'}`}>
        {children}
      </View>
    </>
  );
};
