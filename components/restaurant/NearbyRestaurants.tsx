import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useCurrentLocationRestaurants } from '../../hooks/useCurrentLocationRestaurants';
import RestaurantCard, { Restaurant } from './RestaurantCard';
import { Ionicons } from '@expo/vector-icons';

interface NearbyRestaurantsProps {
  restaurants: Restaurant[];
  maxDistance?: number;
}

const NearbyRestaurants: React.FC<NearbyRestaurantsProps> = ({ restaurants, maxDistance = 5 }) => {
  const { 
    restaurants: nearbyRestaurants, 
    loading, 
    error, 
    activeLocationType, 
    activeLocationName 
  } = useCurrentLocationRestaurants(restaurants, maxDistance);

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

  // Show results even if location is denied, as it might fallback to saved address or show all
  const hasNoLocation = activeLocationType === "none";

  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between mb-4 px-4">
        <View className="flex-1">
          <Text className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
            Nearby Restaurants
          </Text>
          {activeLocationName && (
            <Text className="text-sm text-text-muted dark:text-text-muted-dark">
              Showing results near <Text className="text-primary font-bold">{activeLocationName}</Text>
            </Text>
          )}
        </View>
        <TouchableOpacity className="bg-primary/10 px-3 py-1.5 rounded-full">
          <Text className="text-primary font-bold text-xs">View All</Text>
        </TouchableOpacity>
      </View>

      {error && !activeLocationName && (
         <View className="mx-4 mb-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
            <Text className="text-red-600 dark:text-red-400 text-sm font-medium">
              {error}. Please check your location settings.
            </Text>
         </View>
      )}

      {nearbyRestaurants.length === 0 ? (
        <View className="mx-4 p-8 bg-gray-100 dark:bg-gray-800 rounded-3xl items-center">
          <Ionicons name="restaurant-outline" size={40} color="#9ca3af" />
          <Text className="mt-4 text-text-muted dark:text-text-muted-dark font-medium">
            No restaurants found within {maxDistance}km
          </Text>
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default NearbyRestaurants;
