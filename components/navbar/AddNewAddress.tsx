import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const AddNewAddress = () => {
  const [addressDetails, setAddressDetails] = useState({
    city: '',
    district: '', // Hayy
    street: '',
    buildingNumber: '',
    floorApt: '',
    additionalDirections: '',
    label: 'Home', // Home, Work, Other
    contactName: '',
    contactPhone: '',
  });

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Address saved:', addressDetails);
  };

  return (
    <ScrollView>
      <View>
        <Text>Add New Address</Text>

        {/* Map Placeholder - Very common in Saudi food delivery apps for precise location */}
        <View>
          <Text>Map View Placeholder - Pin Location</Text>
        </View>

        {/* Location Details Form */}
        <View>
          <Text>City</Text>
          <TextInput
            placeholder="Enter City"
            value={addressDetails.city}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, city: text })}
          />

          <Text>District / Neighborhood (Hayy)</Text>
          <TextInput
            placeholder="Enter District"
            value={addressDetails.district}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, district: text })}
          />

          <Text>Street Name</Text>
          <TextInput
            placeholder="Enter Street Name"
            value={addressDetails.street}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, street: text })}
          />

          <Text>Building Number</Text>
          <TextInput
            placeholder="Enter Building Number"
            value={addressDetails.buildingNumber}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, buildingNumber: text })}
          />

          <Text>Floor / Apartment (Optional)</Text>
          <TextInput
            placeholder="Enter Floor/Apt"
            value={addressDetails.floorApt}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, floorApt: text })}
          />

          <Text>Additional Directions (Optional)</Text>
          <TextInput
            placeholder="Landmarks or extra directions"
            multiline
            value={addressDetails.additionalDirections}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, additionalDirections: text })}
          />
        </View>

        {/* Contact Information */}
        <View>
          <Text>Contact Details</Text>
          
          <Text>Name</Text>
          <TextInput
            placeholder="Contact Person Name"
            value={addressDetails.contactName}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, contactName: text })}
          />

          <Text>Phone Number</Text>
          <TextInput
            placeholder="Phone Number (e.g., 05X XXX XXXX)"
            keyboardType="phone-pad"
            value={addressDetails.contactPhone}
            onChangeText={(text) => setAddressDetails({ ...addressDetails, contactPhone: text })}
          />
        </View>

        {/* Address Label Selection */}
        <View>
          <Text>Save As</Text>
          <View>
            <TouchableOpacity onPress={() => setAddressDetails({ ...addressDetails, label: 'Home' })}>
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddressDetails({ ...addressDetails, label: 'Work' })}>
              <Text>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddressDetails({ ...addressDetails, label: 'Other' })}>
              <Text>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSave}>
          <Text>Save Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddNewAddress;
