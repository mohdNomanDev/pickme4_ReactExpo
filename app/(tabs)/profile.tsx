import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import UserData from '../../TestData/UserData.json';

// Fetch first user from mock data for display purposes
const currentUser = UserData[0];

// Reusable component for profile options
const ProfileOption = ({ 
  icon, 
  title, 
  value, 
  isRTL, 
  isDestructive = false, 
  hasSwitch = false,
  switchValue = false,
  onPress 
}: { 
  icon: keyof typeof Ionicons.glyphMap; 
  title: string; 
  value?: string; 
  isRTL: boolean; 
  isDestructive?: boolean;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={hasSwitch}
      activeOpacity={0.7}
      className={`flex-row items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800/50`}
    >
      <View className={`w-10 h-10 rounded-full items-center justify-center ${isDestructive ? 'bg-red-50 dark:bg-red-500/10' : 'bg-gray-50 dark:bg-gray-700'}`}>
        <Ionicons name={icon} size={20} color={isDestructive ? '#ef4444' : '#6b7280'} />
      </View>
      
      <View className="flex-1 px-4">
        <Text className={`text-base font-medium ${isDestructive ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
          {title}
        </Text>
      </View>

      {value && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 px-2 font-medium">
          {value}
        </Text>
      )}

      {hasSwitch ? (
        <Switch 
          value={switchValue} 
          onValueChange={onPress}
          trackColor={{ false: '#d1d5db', true: '#fdba74' }}
          thumbColor={switchValue ? '#f97316' : '#f3f4f6'}
          style={Platform.OS === 'ios' ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
        />
      ) : !isDestructive && (
        <Ionicons 
          name={isRTL ? "chevron-back" : "chevron-forward"} 
          size={20} 
          color="#9ca3af" 
        />
      )}
    </TouchableOpacity>
  );
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const userName = isRTL && currentUser.name.ar ? currentUser.name.ar : currentUser.name.full;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 120 }} // Extra padding for the floating tab bar
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-extrabold text-gray-900 dark:text-white text-start">
            {t('tabs.profile', 'Profile')}
          </Text>
        </View>

        <View className="px-5 w-full max-w-[600px] mx-auto">
          {/* User Info Card */}
          <View className="bg-white dark:bg-gray-800 rounded-[28px] p-5 shadow-sm shadow-black/5 flex-row items-center mb-6">
            <Image 
              source={{ uri: currentUser.avatar }} 
              className="w-16 h-16 rounded-full bg-gray-200"
            />
            <View className="flex-1 px-4 justify-center">
              <Text className="text-xl font-bold text-gray-900 dark:text-white text-start mb-1">
                {userName}
              </Text>
              <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 text-start">
                {currentUser.phone}
              </Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 rounded-full items-center justify-center">
              <Ionicons name="pencil" size={18} color="#f97316" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats (Wallet & Points) */}
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity activeOpacity={0.7} className="flex-1 bg-white dark:bg-gray-800 rounded-[24px] p-4 shadow-sm shadow-black/5 flex-row items-center">
              <View className="w-10 h-10 bg-green-50 dark:bg-green-500/10 rounded-full items-center justify-center mr-3">
                <Ionicons name="wallet" size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5 text-start">
                  {t('profile.wallet', 'Wallet')}
                </Text>
                <Text className="text-base font-bold text-gray-900 dark:text-white text-start">
                  {currentUser.walletBalance.toFixed(2)} <Text className="text-xs font-medium">SAR</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} className="flex-1 bg-white dark:bg-gray-800 rounded-[24px] p-4 shadow-sm shadow-black/5 flex-row items-center">
              <View className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 rounded-full items-center justify-center mr-3">
                <Ionicons name="star" size={20} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5 text-start">
                  {t('profile.points', 'Points')}
                </Text>
                <Text className="text-base font-bold text-gray-900 dark:text-white text-start">
                  {currentUser.loyaltyPoints}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Settings Sections */}
          <Text className="text-sm font-bold text-gray-900 dark:text-white mb-3 px-2 text-start uppercase tracking-wider">
            {t('profile.account_settings', 'Account Settings')}
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-sm shadow-black/5 mb-8">
            <ProfileOption icon="person-outline" title={t('profile.personal_info', 'Personal Information')} isRTL={isRTL} />
            <ProfileOption icon="location-outline" title={t('profile.saved_addresses', 'Saved Addresses')} value={currentUser.addresses.length.toString()} isRTL={isRTL} />
            <ProfileOption icon="card-outline" title={t('profile.payment_methods', 'Payment Methods')} isRTL={isRTL} />
          </View>

          <Text className="text-sm font-bold text-gray-900 dark:text-white mb-3 px-2 text-start uppercase tracking-wider">
            {t('profile.preferences', 'Preferences')}
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-sm shadow-black/5 mb-8">
            <ProfileOption 
              icon="notifications-outline" 
              title={t('profile.notifications', 'Notifications')} 
              hasSwitch 
              switchValue={true} 
              isRTL={isRTL} 
            />
            <ProfileOption 
              icon="language-outline" 
              title={t('profile.language', 'Language')} 
              value={isRTL ? "العربية" : "English"} 
              isRTL={isRTL} 
            />
            <ProfileOption 
              icon="moon-outline" 
              title={t('profile.dark_mode', 'Dark Mode')} 
              hasSwitch 
              switchValue={colorScheme === 'dark'} 
              onPress={toggleColorScheme}
              isRTL={isRTL} 
            />
          </View>

          <Text className="text-sm font-bold text-gray-900 dark:text-white mb-3 px-2 text-start uppercase tracking-wider">
            {t('profile.more', 'More')}
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-sm shadow-black/5 mb-6">
            <ProfileOption icon="help-buoy-outline" title={t('profile.help_center', 'Help Center')} isRTL={isRTL} />
            <ProfileOption icon="document-text-outline" title={t('profile.terms', 'Terms & Conditions')} isRTL={isRTL} />
            <ProfileOption icon="log-out-outline" title={t('profile.logout', 'Log Out')} isDestructive isRTL={isRTL} />
          </View>

          <Text className="text-center text-xs text-gray-400 font-medium mb-6">
            App Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
