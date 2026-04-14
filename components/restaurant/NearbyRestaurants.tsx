import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNearbyRestaurants } from '../../hooks/useNearbyRestaurants';
import RestaurantCard, { Restaurant } from './RestaurantCard';
import { Ionicons } from '@expo/vector-icons';

interface NearbyRestaurantsProps {
  restaurants: Restaurant[];
  maxDistance?: number;
}

const NearbyRestaurants: React.FC<NearbyRestaurantsProps> = ({ restaurants, maxDistance = 5 }) => {
  const { nearbyRestaurants, loading, error, permissionStatus } = useNearbyRestaurants(restaurants, maxDistance);

  if (loading) {
    return (
      <View className="py-10 items-center justify-center">
        <ActivityIndicator size="large" color="#f27f0d" />
        <Text className="mt-4 text-text-muted dark:text-text-muted-dark font-medium">
          Finding nearby restaurants...
        </Text>
      </View>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <View className="p-6 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20 mb-8">
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={24} color="#ef4444" />
          <Text className="ml-2 text-red-600 dark:text-red-400 font-bold text-lg">
            Location Access Denied
          </Text>
        </View>
        <Text className="text-red-500 dark:text-red-300/80 mb-4">
          Please enable location permissions in your settings to see restaurants near you.
        </Text>
        <TouchableOpacity 
          className="bg-red-100 dark:bg-red-900/30 py-3 rounded-xl items-center"
          onPress={() => {/* In a real app, link to settings */}}
        >
          <Text className="text-red-600 dark:text-red-400 font-bold">Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (nearbyRestaurants.length === 0) {
    return (
      <View className="mb-8">
        <Text className="text-xl font-bold text-text dark:text-text-dark mb-4 px-4">
          Nearby Restaurants
        </Text>
        <View className="p-8 bg-gray-100 dark:bg-gray-800 rounded-3xl items-center">
          <Ionicons name="restaurant-outline" size={40} color="#9ca3af" />
          <Text className="mt-4 text-text-muted dark:text-text-muted-dark font-medium">
            No restaurants found within {maxDistance}km
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between mb-4 px-4">
        <View>
          <Text className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
            Nearby Restaurants
          </Text>
          <Text className="text-sm text-text-muted dark:text-text-muted-dark">
            Within {maxDistance}km of your location
          </Text>
        </View>
        <TouchableOpacity className="bg-primary/10 px-3 py-1.5 rounded-full">
          <Text className="text-primary font-bold text-xs">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      >
        {nearbyRestaurants.map((restaurant) => (
          <View key={restaurant.id} style={{ width: 280 }}>
            <RestaurantCard restaurant={restaurant} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NearbyRestaurants;
