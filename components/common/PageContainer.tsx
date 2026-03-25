import React from 'react';
import { View, ScrollView } from 'react-native';

interface PageContainerProps {
  children: React.ReactNode;
  /** 
   * Determines if the page should be scrollable. 
   * Defaults to true as recommended for responsive React Native screens.
   */
  scrollable?: boolean;
  /** Custom styles for the outer wrapper */
  className?: string;
  /** Custom styles for the inner content container (handles padding and layout) */
  contentContainerClassName?: string;
}

export default function PageContainer({
  children,
  scrollable = true,
  className = '',
  contentContainerClassName = '',
}: PageContainerProps) {
  // Use a standard non-scrolling view if specifically requested
  if (!scrollable) {
    return (
      <View className={`flex-1 bg-gray-50 dark:bg-black ${className}`}>
        <View className={`flex-1 p-4 gap-4 ${contentContainerClassName}`}>
          {children}
        </View>
      </View>
    );
  }

  // Default: Scrollable container with automatic safe area adjustment
  return (
    <ScrollView
      className={`flex-1 bg-gray-50 dark:bg-black ${className}`}
      contentContainerClassName={`p-4 gap-4 flex-grow ${contentContainerClassName}`}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
