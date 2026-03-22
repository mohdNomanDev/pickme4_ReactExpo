import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager, Platform } from "react-native";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

const RESOURCES = {
  en: { translation: en },
  ar: { translation: ar },
};

export const LANGUAGE_KEY = "user-language";

// 1. Determine initial language synchronously for SSR/First paint
const getInitialLanguage = () => {
  const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";
  return deviceLanguage === "ar" ? "ar" : "en";
};

const initialLng = getInitialLanguage();

// 2. Immediate synchronous initialization
i18n.use(initReactI18next).init({
  resources: RESOURCES,
  lng: initialLng,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// 3. Handle RTL direction synchronously based on detected language
const isRTL = initialLng === "ar";
if (I18nManager.isRTL !== isRTL) {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
}
// Sync Web HTML tags on first paint
if (Platform.OS === "web" && typeof window !== "undefined") {
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = initialLng;
}

// 4. Async loading of saved preference (avoids crashing SSR)
export const initI18nPromise = (async () => {
  if (Platform.OS !== "web" || typeof window !== "undefined") {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    const targetLang = savedLanguage || initialLng;
    const shouldBeRTL = targetLang === "ar";

    if (savedLanguage && savedLanguage !== i18n.language) {
      await i18n.changeLanguage(savedLanguage);
    }
    
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
    }

    // Ensure Web HTML tags match the saved preference
    if (Platform.OS === "web" && typeof window !== "undefined") {
      document.documentElement.dir = shouldBeRTL ? "rtl" : "ltr";
      document.documentElement.lang = targetLang;
    }
  }
})();

export default i18n;
