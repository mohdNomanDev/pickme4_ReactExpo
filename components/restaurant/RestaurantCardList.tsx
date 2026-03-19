import React from "react";
import { View, Text, FlatList, Dimensions, Platform, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import RestaurantCard, { Restaurant } from "@/components/restaurant/RestaurantCard";
import restaurantDataJson from "@/TestData/RestaurantData.json";
import { RootState } from "@/store/store";

const restaurantData = restaurantDataJson as unknown as Restaurant[];

const RestaurantCardList = () => {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { width } = Dimensions.get('window');

  // Determine number of columns based on screen width
  const numColumns = width > 1024 ? 3 : width > 768 ? 2 : 1;
  const isWeb = Platform.OS === 'web';

  return (
    <View className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Heading Section */}
      <Animated.View 
        entering={FadeInDown.duration(600).springify()}
        className={`mb-8 flex-row items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <View className="flex-1">
          <Text className={`text-2xl md:text-3xl font-display font-bold text-text dark:text-text-dark ${isRTL ? 'text-right' : 'text-left'}`}>
            {restaurantData.length} {t('restaurant.count_header')}
          </Text>
          <View className={`h-1.5 w-12 bg-primary rounded-full mt-2 ${isRTL ? 'self-end' : 'self-start'}`} />
        </View>
        
        {/* Optional Filter Icon or Action */}
        <Pressable className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl active:opacity-70">
          <Ionicons name="options-outline" size={24} color="#f27f0d" />
        </Pressable>
      </Animated.View>

      {/* List Section */}
      <FlatList
        data={restaurantData}
        key={numColumns} // Force re-render when column count changes
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={numColumns > 1 ? { gap: 24, marginBottom: 24 } : undefined}
        contentContainerStyle={{ 
          paddingBottom: 40,
          // For web, ensure we have some horizontal gap
          ...(isWeb && numColumns > 1 ? { paddingHorizontal: 4 } : {})
        }}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInDown.delay(index * 100).duration(600).springify()}
            style={{ flex: 1 / numColumns }}
          >
            <RestaurantCard restaurant={item} />
          </Animated.View>
        )}
      />
    </View>
  );
};

export default RestaurantCardList;