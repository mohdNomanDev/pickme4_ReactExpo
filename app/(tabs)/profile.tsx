import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRTL } from "../../hooks/useRTL";

// Components
import { useSelector } from "react-redux";
import { ProfileOption } from "../../components/profile/ProfileOption";
import { QuickStats } from "../../components/profile/QuickStats";
import { SettingsSection } from "../../components/profile/SettingsSection";
import { UserInfoCard } from "../../components/profile/UserInfoCard";

// Fetch first user from mock data for display purposes
// const currentUser = UserData[0];

export default function ProfilePage() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();
  const currentUser = useSelector((state) => state.user.currentUser);

  const userName =
    isRTL && currentUser.name.ar ? currentUser.name.ar : currentUser.name.full;

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }} // Extra padding for the floating tab bar
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-extrabold text-gray-900 dark:text-white text-start">
            {t("tabs.profile", "Profile")}
          </Text>
        </View>

        <View className="px-5 w-full max-w-[600px] mx-auto">
          {/* User Info Card */}
          <UserInfoCard
            avatar={currentUser.avatar}
            userName={userName}
            phone={currentUser.phone}
          />

          {/* Quick Stats (Wallet & Points) */}
          <QuickStats
            walletBalance={currentUser.walletBalance}
            loyaltyPoints={currentUser.loyaltyPoints}
            walletLabel={t("profile.wallet", "Wallet")}
            pointsLabel={t("profile.points", "Points")}
          />

          {/* Settings Sections */}
          <SettingsSection
            title={t("profile.account_settings", "Account Settings")}
          >
            <ProfileOption
              icon="person-outline"
              title={t("profile.personal_info", "Personal Information")}
              isRTL={isRTL}
              onPress={() => router.push("/Food/personalinformation")}
            />
            <ProfileOption
              icon="location-outline"
              title={t("profile.saved_addresses", "Saved Addresses")}
              value={currentUser.addresses.length.toString()}
              isRTL={isRTL}
            />
            <ProfileOption
              icon="card-outline"
              title={t("profile.payment_methods", "Payment Methods")}
              isRTL={isRTL}
            />
          </SettingsSection>

          <SettingsSection title={t("profile.preferences", "Preferences")}>
            <ProfileOption
              icon="notifications-outline"
              title={t("profile.notifications", "Notifications")}
              hasSwitch
              switchValue={true}
              isRTL={isRTL}
            />
            <ProfileOption
              icon="language-outline"
              title={t("profile.language", "Language")}
              value={isRTL ? "العربية" : "English"}
              isRTL={isRTL}
            />
            <ProfileOption
              icon="moon-outline"
              title={t("profile.dark_mode", "Dark Mode")}
              hasSwitch
              switchValue={colorScheme === "dark"}
              onPress={toggleColorScheme}
              isRTL={isRTL}
            />
          </SettingsSection>

          <SettingsSection title={t("profile.more", "More")} isLast>
            <ProfileOption
              icon="help-buoy-outline"
              title={t("profile.help_center", "Help Center")}
              isRTL={isRTL}
            />
            <ProfileOption
              icon="document-text-outline"
              title={t("profile.terms", "Terms & Conditions")}
              isRTL={isRTL}
            />
            <ProfileOption
              icon="log-out-outline"
              title={t("profile.logout", "Log Out")}
              isDestructive
              isRTL={isRTL}
            />
          </SettingsSection>

          <Text className="text-center text-xs text-gray-400 font-medium mb-6">
            App Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
