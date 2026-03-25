import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import FormField from '../common/FormField';
import { addressSchema } from '../../utils/validations';

const AddNewAddress = () => {
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
  };

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        validationSchema={addressSchema}
        onSubmit={handleSave}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <View>
            <Text>Add New Address</Text>

            {/* Map Placeholder */}
            <View>
              <Text>Map View Placeholder - Pin Location</Text>
            </View>

            {/* Location Details Form */}
            <View>
              <FormField
                name="city"
                label="City"
                placeholder="Enter City"
              />

              <FormField
                name="district"
                label="District / Neighborhood (Hayy)"
                placeholder="Enter District"
              />

              <FormField
                name="street"
                label="Street Name"
                placeholder="Enter Street Name"
              />

              <FormField
                name="buildingNumber"
                label="Building Number"
                placeholder="Enter Building Number"
              />

              <FormField
                name="floorApt"
                label="Floor / Apartment (Optional)"
                placeholder="Enter Floor/Apt"
              />

              <FormField
                name="additionalDirections"
                label="Additional Directions (Optional)"
                placeholder="Landmarks or extra directions"
                multiline
              />
            </View>

            {/* Contact Information */}
            <View>
              <Text>Contact Details</Text>
              
              <FormField
                name="contactName"
                label="Name"
                placeholder="Contact Person Name"
              />

              <FormField
                name="contactPhone"
                label="Phone Number"
                placeholder="Phone Number (e.g., 05X XXX XXXX)"
                keyboardType="phone-pad"
              />
            </View>

            {/* Address Label Selection */}
            <View>
              <Text>Save As</Text>
              <View>
                <TouchableOpacity onPress={() => setFieldValue('label', 'Home')}>
                  <Text style={{ fontWeight: values.label === 'Home' ? 'bold' : 'normal' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFieldValue('label', 'Work')}>
                  <Text style={{ fontWeight: values.label === 'Work' ? 'bold' : 'normal' }}>Work</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFieldValue('label', 'Other')}>
                  <Text style={{ fontWeight: values.label === 'Other' ? 'bold' : 'normal' }}>Other</Text>
                </TouchableOpacity>
              </View>
              {/* Optional: if you wanted to use a FormField or show error for label */}
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text>Save Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddNewAddress;
