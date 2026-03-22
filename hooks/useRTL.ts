import { Platform, I18nManager } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to handle RTL-aware styling and state.
 * Centralizes the logic for different platforms and directions.
 */
export const useRTL = () => {
  const { i18n } = useTranslation();
  const { isRTL: storeIsRTL, currentLanguage } = useSelector(
    (state: RootState) => state.language
  );

  // Fallback to i18n language if store is not yet synced
  const lang = (currentLanguage as 'en' | 'ar') || 
               (i18n.language?.split('-')[0] as 'en' | 'ar') || 
               'en';
  
  const isRTL = lang === 'ar';
  const isWeb = Platform.OS === 'web';

  /**
   * React Native's I18nManager naturally reverses flex-row when RTL is active.
   * On Web, dir="rtl" on the HTML tag ensures flex-row behaves identically.
   * Do NOT use flex-row-reverse conditionally, as it breaks the automatic flip.
   */
  const rowClass = "flex-row";
  
  /**
   * Spacing utility: NativeWind handles gap natively across platforms now,
   * but fallback to this just in case.
   */
  const getGapClass = (spacing: number = 2) => {
    return `gap-${spacing}`;
  };

  // Modern NativeWind v4 logical properties: text-start / text-end are better
  // but keeping textAlign for backwards compatibility in components.
  const textAlign = "text-start";
  const flexRow = "flex-row";

  return {
    isRTL,
    isWeb,
    lang,
    rowClass,
    getGapClass,
    textAlign,
    flexRow,
  };
};
