import { Text, View } from "react-native";
import ThemeToggle from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);

  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-6">
      <View className="absolute top-12 right-6 left-6 flex-row justify-between items-center">
        <ThemeToggle />
        <LanguageToggle />
      </View>

      <View className="p-8 bg-card dark:bg-card-dark rounded-3xl shadow-sm items-center border border-gray-100 dark:border-gray-800 w-full">
        <Text 
          className="text-3xl font-display font-bold text-primary mt-6 mb-2 w-full"
          style={{ textAlign: isRTL ? 'right' : 'center' }}
        >
          {t('home.title')}
        </Text>
        <Text 
          className="text-lg text-text dark:text-text-dark w-full"
          style={{ textAlign: isRTL ? 'right' : 'center' }}
        >
          {t('home.subtitle')}
        </Text>
        
        <View className="mt-8 px-8 py-4 bg-primary rounded-full shadow-lg shadow-primary/30">
          <Text className="text-white font-bold text-lg">
            {t('checkout.place_order')}
          </Text>
        </View>

        <View className={`mt-6 flex-row items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
          <View className="w-2 h-2 rounded-full bg-green-500" />
          <Text className="text-sm text-gray-500">
            {t('common.success')}
          </Text>
        </View>
      </View>
    </View>
  );
}
