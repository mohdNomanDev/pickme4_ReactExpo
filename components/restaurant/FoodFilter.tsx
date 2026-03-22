import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export interface FoodFilterState {
  sortBy: string;
  priceRange: string;
  categories: string[];
}

type LocalizedString = {
  en: string;
  ar: string;
};

type Props = {
  filters: FoodFilterState;
  setFilters: React.Dispatch<React.SetStateAction<FoodFilterState>>;
  availableCategories: LocalizedString[];
};

const SORT_OPTIONS = [
  { label: "Recommended", labelAr: "موصى به", value: "recommended" },
  { label: "Price: Low to High", labelAr: "السعر: من الأقل للأعلى", value: "price_low_high" },
  { label: "Price: High to Low", labelAr: "السعر: من الأعلى للأقل", value: "price_high_low" },
];

const PRICE_OPTIONS = [
  { id: "0-20", range: "0-20" },
  { id: "20-50", range: "20-50" },
  { id: "50-100", range: "50-100" },
  { id: "100+", range: "100+" }
];

const FoodFilter = ({ filters, setFilters, availableCategories }: Props) => {
  const { isRTL, currentLanguage } = useSelector((state: RootState) => state.language);
  const currencyStr = currentLanguage === 'ar' ? 'ر.س' : 'SAR';

  const toggleCategory = (catValue: string) => {
    if (filters.categories.includes(catValue)) {
      setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== catValue) }));
    } else {
      setFilters(prev => ({ ...prev, categories: [...prev.categories, catValue] }));
    }
  };

  return (
    <View className="flex-1 w-full mt-2">
      {/* Sort By Section */}
      <View className="mb-6">
        <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? "ترتيب حسب" : "Sort By"}
        </Text>
        <View className="space-y-2">
          {SORT_OPTIONS.map((item) => {
            const isSelected = filters.sortBy === item.value;
            return (
              <Pressable
                key={item.value}
                onPress={() => setFilters(prev => ({ ...prev, sortBy: item.value }))}
                className={`flex-row items-center py-3 px-4 rounded-xl border ${
                  isSelected 
                    ? "bg-primary/10 border-primary dark:bg-primary/20" 
                    : "bg-gray-50 border-transparent dark:bg-gray-800 dark:border-gray-700"
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Text className={`flex-1 text-base font-medium ${
                  isSelected ? "text-primary" : "text-gray-700 dark:text-gray-300"
                } ${isRTL ? 'text-right pr-3 pl-0' : 'text-left pl-3 pr-0'}`}>
                  {isRTL ? item.labelAr : item.label}
                </Text>
                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  isSelected ? "border-primary" : "border-gray-300 dark:border-gray-600"
                }`}>
                  {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Categories Section */}
      {availableCategories.length > 0 && (
        <View className="mb-6">
          <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? "التصنيفات" : "Categories"}
          </Text>
          <View className={`flex-row flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {availableCategories.map((cat, idx) => {
              const catValue = cat.en;
              const isSelected = filters.categories.includes(catValue);
              return (
                <Pressable
                  key={idx}
                  onPress={() => toggleCategory(catValue)}
                  className={`py-2 px-5 rounded-full border ${
                    isSelected 
                      ? "bg-gray-900 border-gray-900 dark:bg-white dark:border-white" 
                      : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
                  }`}
                >
                  <Text className={`text-sm font-medium ${
                    isSelected 
                      ? "text-white dark:text-gray-900" 
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                    {currentLanguage === 'ar' ? cat.ar : cat.en}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {/* Price Range Section */}
      <View className="mb-6">
        <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? "نطاق السعر" : "Price Range"}
        </Text>
        <View className={`flex-row flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
          {PRICE_OPTIONS.map((item) => {
            const isSelected = filters.priceRange === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFilters(prev => ({ ...prev, priceRange: isSelected ? "" : item.id }))}
                className={`py-2 px-4 rounded-full border items-center justify-center ${
                  isSelected 
                    ? "bg-primary border-primary" 
                    : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
                }`}
              >
                <Text className={`text-sm font-bold text-center ${
                  isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}>
                  {isRTL ? `${item.range} ${currencyStr}` : `${currencyStr} ${item.range}`}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FoodFilter;
