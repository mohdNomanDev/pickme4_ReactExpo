import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedAddress } from '../../store/selectedAddressSlice';
import { updateUserAddress } from '../../store/userSlice';
import FormField from '../common/FormField';
import { addressSchema } from '../../utils/validations';

interface EditAddressProps {
  onCancel?: () => void;
  onSaveSuccess?: () => void;
}

const EditAddress = ({ onCancel, onSaveSuccess }: EditAddressProps) => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state: RootState) => state.selectedAddress.selectedAddress);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // Pre-fill form values with the selectedAddress state
  const initialValues = {
    city: selectedAddress?.city || '',
    district: selectedAddress?.region || '', // Mapping region to district
    street: selectedAddress?.street || '',
    buildingNumber: '', // Not in selectedAddress by default, left empty or you can map if added
    floorApt: '',
    additionalDirections: '',
    label: selectedAddress?.title || 'Home',
  };

  const handleSave = (values: typeof initialValues) => {
    if (selectedAddress) {
      // 1. Dispatch updated address back to the selected address state
      dispatch(setSelectedAddress({
        ...selectedAddress,
        city: values.city,
        region: values.district,
        street: values.street,
        title: values.label,
        formattedAddress: `${values.buildingNumber} ${values.street}, ${values.district}, ${values.city}`
      }));

      // 2. Dispatch updated address back to the user's saved addresses array
      if (currentUser?.addresses) {
        const existingAddress = currentUser.addresses.find(a => a.id === selectedAddress.id);
        if (existingAddress) {
          dispatch(updateUserAddress({
            ...existingAddress,
            type: values.label.toLowerCase(),
            title: values.label,
            city: values.city,
            district: values.district,
            street: values.street,
            buildingNumber: values.buildingNumber,
            floor: values.floorApt,
            notes: values.additionalDirections,
          }));
        }
      }
    }

    console.log('Edited address saved:', values);
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

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <View className="gap-8 max-w-3xl mx-auto w-full">
              {/* Map Placeholder */}
              <View className="h-56 bg-orange-50/50 dark:bg-gray-800/30 rounded-3xl items-center justify-center border border-orange-100 dark:border-gray-700 overflow-hidden mb-2">
                <View className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full items-center justify-center shadow-sm mb-3">
                  <Ionicons name="location" size={28} color="#f97316" />
                </View>
                <Text className="text-gray-600 dark:text-gray-400 font-medium text-lg">Pin Location on Map</Text>
                <Text className="text-gray-400 dark:text-gray-500 text-sm mt-1">Tap to change exact coordinates</Text>
              </View>

              {/* Location Details Form */}
              <View>
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-5">Location Details</Text>
                
                <View className="flex-col md:flex-row gap-0 md:gap-4">
                  <View className="flex-1">
                    <FormField name="city" label="City" placeholder="Enter City" />
                  </View>
                  <View className="flex-1">
                    <FormField name="district" label="District (Hayy)" placeholder="Enter District" />
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
