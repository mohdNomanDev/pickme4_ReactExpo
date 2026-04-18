import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedAddress } from '../../store/selectedAddressSlice';
import { updateUserAddress } from '../../store/userSlice';
import FormField from '../common/FormField';
import { addressSchema } from '../../utils/validations';
import AppMap from '../common/app-map';
import { reverseGeocodeCoordinate } from "../../utils/reverseGeocoding";

interface EditAddressProps {
  onCancel?: () => void;
  onSaveSuccess?: () => void;
}

const EditAddress = ({ onCancel, onSaveSuccess }: EditAddressProps) => {
  const dispatch = useDispatch();
  const geocodeRequestId = useRef(0);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const selectedAddress = useSelector((state: RootState) => state.selectedAddress.selectedAddress);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // Attempt to find the full address details from the user's saved list to pre-fill everything perfectly
  const fullAddressDetails = currentUser?.addresses?.find(a => a.id === selectedAddress?.id);

  // Pre-fill form values using full address details if available, otherwise fallback to selectedAddress map
  const initialValues = {
    city: fullAddressDetails?.city || selectedAddress?.city || '',
    state: fullAddressDetails?.state || selectedAddress?.state || '',
    street: fullAddressDetails?.street || selectedAddress?.street || '',
    buildingNumber: fullAddressDetails?.buildingNumber || '', 
    floorApt: fullAddressDetails?.floor || '',
    additionalDirections: fullAddressDetails?.notes || '',
    label: fullAddressDetails?.title || selectedAddress?.title || 'Home',
    latitude: fullAddressDetails?.coordinates?.lat || selectedAddress?.latitude || 24.7136,
    longitude: fullAddressDetails?.coordinates?.lng || selectedAddress?.longitude || 46.6753,
    formattedAddress: fullAddressDetails?.formattedAddress || selectedAddress?.formattedAddress || '',
  };

  const handleMapLocationChange = useCallback(
    async (
      coordinate: { latitude: number; longitude: number },
      setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
    ) => {
      const requestId = geocodeRequestId.current + 1;
      geocodeRequestId.current = requestId;

      setFieldValue("latitude", coordinate.latitude);
      setFieldValue("longitude", coordinate.longitude);
      setIsFetchingAddress(true);

      try {
        const address = await reverseGeocodeCoordinate(coordinate);

        if (geocodeRequestId.current !== requestId) return;

        setFieldValue("city", address.city);
        setFieldValue("state", address.state);
        setFieldValue("street", address.street);
        setFieldValue("buildingNumber", address.buildingNumber);
        setFieldValue("formattedAddress", address.formattedAddress);
      } catch (error) {
        console.warn("Reverse geocoding failed:", error);
      } finally {
        if (geocodeRequestId.current === requestId) {
          setIsFetchingAddress(false);
        }
      }
    },
    [],
  );

  const handleSave = (values: typeof initialValues) => {
    if (selectedAddress) {
      const displayAddress = values.formattedAddress || 
        `${values.buildingNumber ? values.buildingNumber + ' ' : ''}${values.street}, ${values.city}, ${values.state}`;

      // 1. Dispatch updated address back to the selected address state
      dispatch(setSelectedAddress({
        ...selectedAddress,
        latitude: values.latitude,
        longitude: values.longitude,
        state: values.state,
        city: values.city,
        street: values.street,
        title: values.label,
        address: displayAddress,
        formattedAddress: displayAddress
      }));

      // 2. Dispatch updated address back to the user's saved addresses array
      if (currentUser?.addresses) {
        const existingAddress = currentUser.addresses.find(a => a.id === selectedAddress.id);
        if (existingAddress) {
          dispatch(updateUserAddress({
            ...existingAddress,
            type: values.label.toLowerCase(),
            title: values.label,
            state: values.state,
            city: values.city,
            street: values.street,
            buildingNumber: values.buildingNumber,
            address: displayAddress,
            formattedAddress: displayAddress,
            coordinates: {
              lat: values.latitude,
              lng: values.longitude,
            },
            floor: values.floorApt,
            notes: values.additionalDirections,
          }));
        }
      }
    }

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <View className="flex-1 bg-white dark:bg-card-dark w-full md:rounded-3xl md:my-8 md:border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm dark:shadow-none">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark z-10">
        <View className="flex-row items-center gap-3">
          {Platform.OS !== 'web' && onCancel && (
            <TouchableOpacity onPress={onCancel} className="mr-2">
              <Ionicons name="arrow-back" size={24} color="#f97316" />
            </TouchableOpacity>
          )}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">Edit Address</Text>
        </View>
        {Platform.OS === 'web' && onCancel && (
          <TouchableOpacity onPress={onCancel} className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-6 pb-[60px]" showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <View className="gap-8 max-w-3xl mx-auto w-full">
              {/* Map Section */}
              <View className="gap-3">
                <View className="flex-row items-center justify-between gap-4">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                      Pin Location
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Search or drag the pin to adjust your delivery location
                    </Text>
                  </View>
                  <View className="h-11 w-11 rounded-full bg-orange-50 dark:bg-orange-900/20 items-center justify-center">
                    <Ionicons name="location" size={22} color="#f97316" />
                  </View>
                </View>

                <View className="h-72 md:h-96 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <AppMap
                    latitude={values.latitude}
                    longitude={values.longitude}
                    latitudeDelta={0.018}
                    longitudeDelta={0.018}
                    draggableMarker
                    showSearchBar
                    searchPlaceholder="Search for your building or area..."
                    onSelectPlace={(place) => {
                      setFieldValue("latitude", place.latitude);
                      setFieldValue("longitude", place.longitude);
                      setFieldValue("formattedAddress", place.address);
                      // Trigger reverse geocode to fill other fields based on selected point
                      void handleMapLocationChange({ 
                        latitude: place.latitude, 
                        longitude: place.longitude 
                      }, setFieldValue);
                    }}
                    selectedMarkerTitle="Delivery location"
                    onLocationChange={(coordinate) => {
                      void handleMapLocationChange(coordinate, setFieldValue);
                    }}
                  />
                </View>

                <View className="gap-1">
                  <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {`Lat ${values.latitude.toFixed(5)} / Lng ${values.longitude.toFixed(5)}`}
                  </Text>
                  {isFetchingAddress ? (
                    <Text className="text-xs font-semibold text-orange-500">
                      Getting address details...
                    </Text>
                  ) : null}
                </View>
              </View>

              {/* Location Details Form */}
              <View>
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-5">Location Details</Text>
                
                <View className="flex-col md:flex-row gap-0 md:gap-4">
                  <View className="flex-1">
                    <FormField name="city" label="City" placeholder="Enter City" />
                  </View>
                  <View className="flex-1">
                    <FormField name="state" label="State" placeholder="Enter State" />
                  </View>
                </View>

                <FormField name="street" label="Street Name" placeholder="Enter Street Name" />
                
                <View className="flex-col md:flex-row gap-0 md:gap-4">
                  <View className="flex-1">
                    <FormField name="buildingNumber" label="Building No." placeholder="e.g. 12" />
                  </View>
                  <View className="flex-1">
                    <FormField name="floorApt" label="Floor / Apt" placeholder="Optional" />
                  </View>
                </View>

                <FormField
                  name="additionalDirections"
                  label="Additional Directions"
                  placeholder="Landmarks or extra directions"
                  multiline
                />
              </View>

              {/* Address Label Selection */}
              <View>
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Save As</Text>
                <View className="flex-row gap-3">
                  {['Home', 'Work', 'Other'].map((lbl) => {
                    const isSelected = values.label === lbl;
                    let iconName: keyof typeof Ionicons.glyphMap = 'location-outline';
                    if (lbl === 'Home') iconName = 'home';
                    else if (lbl === 'Work') iconName = 'briefcase';
                    else if (lbl === 'Other') iconName = 'location';
                    
                    return (
                      <TouchableOpacity
                        key={lbl}
                        onPress={() => setFieldValue('label', lbl)}
                        className={`flex-1 py-4 px-2 rounded-2xl flex-row items-center justify-center gap-2 border-2 transition-all ${
                          isSelected 
                            ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/20 dark:border-orange-500' 
                            : 'bg-white border-gray-100 dark:bg-card-dark dark:border-gray-800'
                        }`}
                      >
                        <Ionicons 
                          name={iconName} 
                          size={20} 
                          color={isSelected ? '#f97316' : '#9ca3af'} 
                        />
                        <Text className={`font-bold text-base ${isSelected ? 'text-orange-600 dark:text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {lbl}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-orange-500 rounded-2xl py-4 mt-4 items-center shadow-lg shadow-orange-500/30 dark:shadow-none"
              >
                <Text className="text-white font-bold text-lg">Update Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditAddress;
