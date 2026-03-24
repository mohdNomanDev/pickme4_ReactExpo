import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Navbar from '../../components/navbar/navbar';
import RestaurantCardList from '../../components/restaurant/RestaurantCardList';
import ThemeToggle from '../../components/common/ThemeToggle';
import { LanguageToggle } from '../../components/common/LanguageToggle';

export default function FoodHome() {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-background-dark" edges={['top']}>
      {/* Temporary Testing Toggles */}
      <View className={`flex-row items-center gap-4 px-4 py-2 bg-gray-200 dark:bg-card-dark border-b border-gray-300 dark:border-gray-800 w-full z-50 ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <ThemeToggle />
        <LanguageToggle />
      </View>

      {/* Top Navigation Area */}
      <View className="z-50 bg-white dark:bg-card-dark shadow-sm border-b border-gray-100 dark:border-gray-800 w-full">
         <View className="max-w-7xl mx-auto w-full">
           <Navbar />
         </View>
      </View>

      <View className="w-full flex-1">
        <RestaurantCardList 
          headerContent={
            <View className="w-full flex-1 gap-8 mb-8 mt-2">
              {/* Banner / Offers Carousel Section */}
              <View className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl items-center justify-center border border-gray-300 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                  {t('home.banner', 'Banner Section')}
                </Text>
              </View>

              {/* Quick Categories Section */}
              <View className="w-full">
                <Text className={`text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('home.categories', 'Categories')}
                </Text>
                <View className="w-full h-24 md:h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl items-center justify-center border border-gray-300 dark:border-gray-700">
                  <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                    {t('home.categories_section', 'Categories Section')}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
