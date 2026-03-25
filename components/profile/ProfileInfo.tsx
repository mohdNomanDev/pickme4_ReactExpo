import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import { Ionicons } from '@expo/vector-icons';

export interface ProfileInfoProps {
  user: any;
  onSave: (data: any) => void;
}

export const ProfileInfo = ({ user, onSave }: ProfileInfoProps) => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const [firstName, setFirstName] = useState(user?.name?.first || '');
  const [lastName, setLastName] = useState(user?.name?.last || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const InputField = ({ label, value, onChangeText, icon, keyboardType = 'default', editable = true }: any) => (
    <View className="mb-4">
      <Text className={`text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
        {label}
      </Text>
      <View className={`flex-row items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 md:py-4 ${isRTL ? 'flex-row-reverse' : ''} ${!editable ? 'opacity-70' : ''}`}>
        <Ionicons name={icon} size={20} color="#9ca3af" className={isRTL ? 'ml-3 md:ml-4' : 'mr-3 md:mr-4'} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
          className={`flex-1 text-base md:text-lg text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );

  return (
    <View className="w-full max-w-[800px] mx-auto w-full">
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
              label={t('profile.first_name', 'First Name')} 
              value={firstName} 
              onChangeText={setFirstName} 
              icon="person-outline" 
            />
          </View>
          <View className="flex-1">
            <InputField 
              label={t('profile.last_name', 'Last Name')} 
              value={lastName} 
              onChangeText={setLastName} 
              icon="person-outline" 
            />
          </View>
        </View>
        
        <View className="md:flex-row md:gap-6 w-full">
          <View className="flex-1">
            <InputField 
              label={t('profile.email', 'Email Address')} 
              value={email} 
              onChangeText={setEmail} 
              icon="mail-outline" 
              keyboardType="email-address"
            />
          </View>
          <View className="flex-1">
            <InputField 
              label={t('profile.phone', 'Phone Number')} 
              value={phone} 
              onChangeText={setPhone} 
              icon="call-outline" 
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View className="mt-8 mb-4 md:mt-10">
        <TouchableOpacity 
          onPress={() => onSave({ firstName, lastName, email, phone })}
          activeOpacity={0.8}
          className="bg-orange-500 rounded-xl py-4 md:py-5 items-center shadow-sm"
          style={{ boxShadow: "0 4px 6px -1px rgba(249, 115, 22, 0.2)" }}
        >
          <Text className="text-white font-bold text-lg md:text-xl">
            {t('common.save_changes', 'Save Changes')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
