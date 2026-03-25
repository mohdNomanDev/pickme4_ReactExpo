import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useTranslation } from 'react-i18next';

export default function FoodHomeLayout() {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  // Responsive design: center the tab bar on large screens like web/tablet
  const isLargeScreen = width > 768;
  const tabBarWidth = isLargeScreen ? 400 : 'auto';
  const horizontalPosition = isLargeScreen ? (width - 400) / 2 : 20;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          left: horizontalPosition,
          right: isLargeScreen ? 'auto' : 20,
          width: tabBarWidth,
          elevation: 10,
          backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
          borderRadius: 32,
          height: 70,
          shadowColor: colorScheme === 'dark' ? '#000000' : '#f97316',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
          shadowRadius: 20,
          borderTopWidth: 0,
          paddingBottom: 0, // Prevents iOS from adding extra safe area padding inside the floating bar
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#6b7280' : '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home', 'Home'),
          tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? 'bg-orange-50 dark:bg-orange-500/20' : ''}`}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('tabs.search', 'Search'),
          tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? 'bg-orange-50 dark:bg-orange-500/20' : ''}`}>
              <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: t('tabs.orders', 'Orders'),
          tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? 'bg-orange-50 dark:bg-orange-500/20' : ''}`}>
              <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile', 'Profile'),
          tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center h-12 w-12 rounded-full transition-all ${focused ? 'bg-orange-50 dark:bg-orange-500/20' : ''}`}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      
      {/* Hide specific inner pages from the bottom tab bar */}
      <Tabs.Screen name="addnewaddresspage" options={{ href: null }} />
      <Tabs.Screen name="editaddresspage" options={{ href: null }} />
    </Tabs>
  );
}
