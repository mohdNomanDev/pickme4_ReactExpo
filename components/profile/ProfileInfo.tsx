import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import { profileSchema } from '../../utils/validations';

export interface ProfileInfoProps {
  user: any;
  onSave: (data: any) => void;
}

export const ProfileInfo = ({ user, onSave }: ProfileInfoProps) => {
    
  const formik = useFormik({
    initialValues: {
      firstName: user?.name?.first || '',
      lastName: user?.name?.last || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // Filter only changed fields
      const changes = Object.keys(values).reduce((acc: any, key) => {
        if (values[key as keyof typeof values] !== formik.initialValues[key as keyof typeof values]) {
          acc[key] = values[key as keyof typeof values];
        }
        return acc;
      }, {});

      if (Object.keys(changes).length > 0) {
        onSave(changes);
      } else {
        // If no changes, we can still call onSave with empty object or handle as needed
        // Usually, navigating back is expected even if no changes were saved
        onSave({});
      }
    },
  });

  const InputField = ({ label, value, onChangeText, onBlur, icon, keyboardType = 'default', editable = true, error, touched }: any) => (
    <View className="mb-4">
      <Text className={`text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${'text-left'}`}>
        {label}
      </Text>
      <View className={`flex-row items-center bg-white dark:bg-gray-800 border ${touched && error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl px-4 py-3 md:py-4  ${!editable ? 'opacity-70' : ''}`}>
        <Ionicons name={icon} size={20} color={touched && error ? '#ef4444' : '#9ca3af'} className={'mr-3 md:mr-4'} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          editable={editable}
          className={`flex-1 text-base md:text-lg text-gray-900 dark:text-white ${'text-left'}`}
          placeholderTextColor="#9ca3af"
        />
      </View>
      {touched && error && (
        <Text className={`text-xs text-red-500 mt-1 ${'text-left'}`}>
          {error}
        </Text>
      )}
    </View>
  );

  return (
    <View className="w-full max-w-[800px] mx-auto">
      {/* Avatar Section */}
      <View className="items-center mb-8 md:mb-12">
        <View className="relative">
          <View className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-sm">
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <Ionicons name="person" size={40} color="#9ca3af" />
            )}
          </View>
          <TouchableOpacity className="absolute bottom-0 right-0 md:bottom-1 md:right-1 bg-orange-500 w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center border-2 border-white dark:border-gray-800">
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Fields - responsive grid for web/tablet */}
      <View className="gap-2 md:gap-4">
        <View className="md:flex-row md:gap-6 w-full">
          <View className="flex-1">
            <InputField 
              label={'First Name'} 
              value={formik.values.firstName} 
              onChangeText={formik.handleChange('firstName')} 
              onBlur={formik.handleBlur('firstName')}
              icon="person-outline" 
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
            />
          </View>
          <View className="flex-1">
            <InputField 
              label={'Last Name'} 
              value={formik.values.lastName} 
              onChangeText={formik.handleChange('lastName')} 
              onBlur={formik.handleBlur('lastName')}
              icon="person-outline" 
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
            />
          </View>
        </View>
        
        <View className="md:flex-row md:gap-6 w-full">
          <View className="flex-1">
            <InputField 
              label={'Email Address'} 
              value={formik.values.email} 
              onChangeText={formik.handleChange('email')} 
              onBlur={formik.handleBlur('email')}
              icon="mail-outline" 
              keyboardType="email-address"
              error={formik.errors.email}
              touched={formik.touched.email}
            />
          </View>
          <View className="flex-1">
            <InputField 
              label={'Phone Number'} 
              value={formik.values.phone} 
              onChangeText={formik.handleChange('phone')} 
              onBlur={formik.handleBlur('phone')}
              icon="call-outline" 
              keyboardType="phone-pad"
              error={formik.errors.phone}
              touched={formik.touched.phone}
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View className="mt-8 mb-4 md:mt-10">
        <TouchableOpacity 
          onPress={() => formik.handleSubmit()}
          activeOpacity={0.8}
          className="bg-orange-500 rounded-xl py-4 md:py-5 items-center shadow-sm"
          style={{ boxShadow: "0 4px 6px -1px rgba(249, 115, 22, 0.2)" }}
        >
          <Text className="text-white font-bold text-lg md:text-xl">
            {'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
