import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18nManager, Platform } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

const RESOURCES = {
  en: { translation: en },
  ar: { translation: ar },
};

export const LANGUAGE_KEY = 'user-language';

// 1. Determine initial language synchronously for SSR/First paint
const getInitialLanguage = () => {
  const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
  return deviceLanguage === 'ar' ? 'ar' : 'en';
};

const initialLng = getInitialLanguage();

// 2. Immediate synchronous initialization
i18n
  .use(initReactI18next)
  .init({
    resources: RESOURCES,
    lng: initialLng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// 3. Handle RTL direction synchronously based on detected language
const isRTL = initialLng === 'ar';
if (I18nManager.isRTL !== isRTL) {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
}

// 4. Async loading of saved preference (avoids crashing SSR)
if (Platform.OS !== 'web' || typeof window !== 'undefined') {
  AsyncStorage.getItem(LANGUAGE_KEY).then((savedLanguage) => {
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      
      const shouldBeRTL = savedLanguage === 'ar';
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        // On native, we don't reload here to avoid infinite loops on startup,
        // we assume the user will toggle if they want a different language than device default.
      }
    }
  });
}

export default i18n;
