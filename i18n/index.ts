import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

const RESOURCES = {
  en: { translation: en },
  ar: { translation: ar },
};

const LANGUAGE_KEY = 'user-language';

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  
  if (!savedLanguage) {
    // Detect device language
    const deviceLanguage = Localization.getLocales()[0].languageCode;
    savedLanguage = deviceLanguage === 'ar' ? 'ar' : 'en';
  }

  // Handle RTL direction on initial load
  const isRTL = savedLanguage === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // Note: App reload might be needed if direction changes, 
    // but on first load we just set the initial state.
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources: RESOURCES,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
};

initI18n();

export default i18n;
export { LANGUAGE_KEY };
