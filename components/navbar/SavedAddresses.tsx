import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedAddress } from '../../store/selectedAddressSlice';

export default function SavedAddresses() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser || !currentUser.addresses || currentUser.addresses.length === 0) {
    return (
      <View>
        <Text>No saved addresses found.</Text>
      </View>
    );
  }

  const handleSelectAddress = (address: any) => {
    dispatch(setSelectedAddress({
      id: address.id,
      title: address.title,
      formattedAddress: `${address.street}, ${address.district}, ${address.city}`,
      latitude: address.coordinates?.lat,
      longitude: address.coordinates?.lng,
      street: address.street,
      city: address.city,
      region: address.district
    }));
  };

  return (
    <View>
      <Text>Saved Addresses</Text>
      <FlatList
        data={currentUser.addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectAddress(item)}>
            <View>
              <Text>{item.title} ({item.type})</Text>
              <Text>{item.street}, {item.buildingNumber}</Text>
              <Text>{item.district}, {item.city}</Text>
              {item.isDefault && <Text>Default Address</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
