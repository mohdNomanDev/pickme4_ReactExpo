import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import FormField from '../common/FormField';
import { addressSchema } from '../../utils/validations';

interface AddNewAddressProps {
  onCancel?: () => void;
  onSaveSuccess?: () => void;
}

const AddNewAddress = ({ onCancel, onSaveSuccess }: AddNewAddressProps) => {
  const initialValues = {
    city: '',
    district: '',
    street: '',
    buildingNumber: '',
    floorApt: '',
    additionalDirections: '',
    label: 'Home',
    contactName: '',
    contactPhone: '',
  };

  const handleSave = (values: typeof initialValues) => {
    // TODO: Implement save logic
    console.log('Address saved:', values);
    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <View className="flex-1 bg-white dark:bg-card-dark rounded-t-3xl pt-2 mt-12 max-h-[90vh]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">Add New Address</Text>
        {onCancel && (
          <TouchableOpacity onPress={onCancel} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Ionicons name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={handleSave}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <View className="gap-6">
              {/* Map Placeholder */}
              <View className="h-48 bg-gray-50 dark:bg-gray-800/50 rounded-2xl items-center justify-center border border-gray-200 dark:border-gray-700 overflow-hidden mb-2">
                <View className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full items-center justify-center shadow-sm mb-3">
                  <Ionicons name="location" size={24} color="#f97316" />
                </View>
                <Text className="text-gray-500 dark:text-gray-400 font-medium">Pin Location on Map</Text>
              </View>

              {/* Location Details Form */}
              <View>
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Location Details</Text>
                
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <FormField name="city" label="City" placeholder="Enter City" />
                  </View>
                  <View className="flex-1">
                    <FormField name="district" label="District (Hayy)" placeholder="Enter District" />
                  </View>
                </View>

                <FormField name="street" label="Street Name" placeholder="Enter Street Name" />
                
                <View className="flex-row gap-4">
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

              {/* Contact Information */}
              <View className="mt-2">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Details</Text>
                <FormField name="contactName" label="Name" placeholder="Contact Person Name" />
                <FormField
                  name="contactPhone"
                  label="Phone Number"
                  placeholder="05X XXX XXXX"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Address Label Selection */}
              <View className="mt-2">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">Save As</Text>
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
                        className={`flex-1 py-3 px-2 rounded-xl flex-row items-center justify-center gap-2 border ${
                          isSelected 
                            ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/20' 
                            : 'bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700'
                        }`}
                      >
                        <Ionicons 
                          name={iconName} 
                          size={18} 
                          color={isSelected ? '#f97316' : '#6b7280'} 
                        />
                        <Text className={`font-medium text-sm ${isSelected ? 'text-orange-600 dark:text-orange-500' : 'text-gray-600 dark:text-gray-400'}`}>
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
                className="bg-orange-500 rounded-2xl py-4 mt-6 items-center shadow-md shadow-orange-200 dark:shadow-none"
              >
                <Text className="text-white font-bold text-lg">Save Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddNewAddress;
