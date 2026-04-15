import userDataJson from "@/TestData/UserData.json";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import { useSelector } from "react-redux";
import { ProfileOption } from "../../components/profile/ProfileOption";
import { QuickStats } from "../../components/profile/QuickStats";
import { SettingsSection } from "../../components/profile/SettingsSection";
import { UserInfoCard } from "../../components/profile/UserInfoCard";
import { RootState } from "../../store/store";

// Fetch first user from mock data for display purposes
// const currentUser = UserData[0];

export default function ProfilePage() {
      const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();
  const storeUser = useSelector((state: RootState) => state.user?.currentUser);
  let [currentUser, setCurrentUser] = useState(storeUser || userDataJson[0]);

  useEffect(() => {
    if (storeUser) {
      setCurrentUser(storeUser);
    } else {
      setCurrentUser(userDataJson[0]);
    }
  }, [storeUser]);

  const userName =
    currentUser.name.full;

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-[120px]"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-extrabold text-gray-900 dark:text-white text-start">
            {"Profile"}
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
            walletLabel={"Wallet"}
            pointsLabel={"Points"}
          />

          {/* Settings Sections */}
          <SettingsSection
            title={"Account Settings"}
          >
            <ProfileOption
              icon="person-outline"
              title={"Personal Information"}
              onPress={() => router.push("/Food/personalinformation")}
            />
            <ProfileOption
              icon="location-outline"
              title={"Saved Addresses"}
              value={currentUser.addresses.length.toString()}
            />
            <ProfileOption
              icon="card-outline"
              title={"Payment Methods"}
            />
          </SettingsSection>

          <SettingsSection title={"Preferences"}>
            <ProfileOption
              icon="notifications-outline"
              title={"Notifications"}
              hasSwitch
              switchValue={true}
            />
            <ProfileOption
              icon="language-outline"
              title={"Language"}
              value={'English'}
            />
            <ProfileOption
              icon="moon-outline"
              title={"Dark Mode"}
              hasSwitch
              switchValue={colorScheme === "dark"}
              onPress={toggleColorScheme}
            />
          </SettingsSection>

          <SettingsSection title={"More"} isLast>
            <ProfileOption
              icon="help-buoy-outline"
              title={"Help Center"}
            />
            <ProfileOption
              icon="document-text-outline"
              title={"Terms & Conditions"}
            />
            <ProfileOption
              icon="log-out-outline"
              title={"Log Out"}
              isDestructive
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
