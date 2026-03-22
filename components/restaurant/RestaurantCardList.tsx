import React, { useCallback, useMemo } from "react";
import { View, Text, FlatList, Platform, Pressable, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import RestaurantCard, { Restaurant } from "@/components/restaurant/RestaurantCard";
import FilterButton from "@/components/common/FilterButton";
import restaurantDataJson from "@/TestData/RestaurantData.json";
import { RootState } from "@/store/store";

const restaurantData = restaurantDataJson as unknown as Restaurant[];

const RestaurantCardList = () => {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { width } = useWindowDimensions();

  // Determine number of columns based on screen width
  const numColumns = useMemo(() => 
    width > 1024 ? 3 : width > 768 ? 2 : 1
  , [width]);

  const isWeb = Platform.OS === 'web';

  const renderItem = useCallback(({ item, index }: { item: Restaurant; index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 50).duration(600).springify()}
      style={{ flex: 1 / numColumns }}
    >
      <RestaurantCard restaurant={item} />
    </Animated.View>
  ), [numColumns]);

  const ListHeader = useMemo(() => (
    /* Heading Section */
    <Animated.View 
      entering={FadeInDown.duration(600).springify()}
      className="mb-8"
    >
      <View className={`flex-row items-center justify-between w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Text className={`flex-1 pr-4 text-2xl md:text-3xl font-display font-bold text-text dark:text-text-dark ${isRTL ? 'text-right pr-0 pl-4' : 'text-left pr-4 pl-0'}`}>
          {restaurantData.length} {t('restaurant.count_header')}
        </Text>
        
        {/* Filter Icon or Action */}
        <FilterButton onPress={() => {}} isActive={false} />
      </View>
      <View className={`h-1.5 w-12 bg-primary rounded-full mt-2 ${isRTL ? 'self-end' : 'self-start'}`} />
    </Animated.View>
  ), [isRTL, t]);

  const keyExtractor = useCallback((item: Restaurant) => item.id.toString(), []);

  return (
    <View className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <FlatList
        data={restaurantData}
        key={numColumns} // Force re-render when column count changes
        numColumns={numColumns}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={numColumns > 1 ? { gap: 24, marginBottom: 24 } : undefined}
        contentContainerStyle={{ 
          paddingBottom: 40,
          ...(isWeb && numColumns > 1 ? { paddingHorizontal: 4 } : {})
        }}
        // Performance Props
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS !== 'web'} // Improves memory on native
      />
    </View>
  );
};

export default RestaurantCardList;