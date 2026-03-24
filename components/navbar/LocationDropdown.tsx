import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useColorScheme } from 'nativewind';
import SavedAddresses from './SavedAddresses';

export default function LocationDropdown() {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { colorScheme } = useColorScheme();

  return (
    <View 
      className={`absolute top-14 ${isRTL ? 'right-0' : 'left-0'} w-80 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden ${Platform.OS === 'web' ? 'shadow-gray-200 dark:shadow-black' : ''}`}
      style={Platform.OS !== 'web' ? { elevation: 5 } : {}}
    >
      {/* Header / Search Area */}
      <View className={`p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Ionicons name="search" size={18} color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'} />
        <TextInput 
          placeholder={t('location.search_placeholder', 'Search for area, street name...')} 
          className={`flex-1 text-sm text-gray-800 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
          placeholderTextColor={colorScheme === 'dark' ? '#6B7280' : '#9CA3AF'}
        />
      </View>

      {/* Action: Use Current Location */}
      <Pressable className={`flex-row items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-orange-50/50 dark:bg-orange-900/20 active:bg-orange-100 dark:active:bg-orange-900/40 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <View className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-full items-center justify-center">
          <Ionicons name="navigate" size={16} color="#F97316" />
        </View>
        <Text className={`text-orange-600 dark:text-orange-500 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('location.use_current', 'Use current location')}
        </Text>
      </Pressable>

      {/* Saved Addresses Section */}
      <View className="max-h-60">
        <ScrollView showsVerticalScrollIndicator={false}>
          <SavedAddresses />
        </ScrollView>
      </View>

      {/* Action: Add New Address */}
      <Pressable className={`flex-row items-center gap-2 p-4 border-t border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Ionicons name="add" size={20} color="#F97316" />
        <Text className={`text-orange-600 dark:text-orange-500 font-bold text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('location.add_new', 'Add a new address')}
        </Text>
      </Pressable>
    </View>
  );
}
