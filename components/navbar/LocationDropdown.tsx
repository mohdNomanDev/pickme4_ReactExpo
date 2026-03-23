import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';

export default function LocationDropdown() {
  return (
    <View>
      {/* Header / Search Area */}
      <View>
        <Text>SearchIcon</Text>
        <TextInput 
          placeholder="Search for area, street name..." 
        />
      </View>

      {/* Action: Use Current Location */}
      <Pressable>
        <View>
          <Text>GpsIcon</Text>
        </View>
        <View>
          <Text>Use current location</Text>
        </View>
      </Pressable>

      {/* Saved Addresses Section */}
      <View>
        <Text>Saved Addresses</Text>

        <ScrollView>
          {/* Saved Address Item - Selected */}
          <Pressable>
            <View>
              <Text>HomeIcon</Text>
            </View>
            <View>
              <Text>Home</Text>
              <Text>Riyadh, Al Olaya, King Fahd Road</Text>
            </View>
            <View>
              {/* Selected indicator */}
              <Text>CheckIcon</Text> 
            </View>
          </Pressable>

          {/* Saved Address Item - Unselected */}
          <Pressable>
            <View>
              <Text>WorkIcon</Text>
            </View>
            <View>
              <Text>Office</Text>
              <Text>Jeddah, Al Shati, Corniche Road</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>

      {/* Action: Add New Address */}
      <Pressable>
        <Text>PlusIcon</Text>
        <Text>Add a new address</Text>
      </Pressable>
    </View>
  );
}
