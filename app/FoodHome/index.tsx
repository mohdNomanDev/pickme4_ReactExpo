import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Navbar from '../../components/navbar/navbar';

export default function FoodHome() {
  return (
    <View style={{ flex: 1 }}>
      {/* Top Navigation Area */}
      <View style={{ zIndex: 50 }}>
        <Navbar />
      </View>

      <ScrollView>
        {/* Banner / Offers Carousel Section */}
        <View>
        </View>

        {/* Quick Categories Section */}
        <View>
        </View>

        {/* Featured Restaurants Section */}
        <View>
        </View>
      </ScrollView>
    </View>
  );
}
