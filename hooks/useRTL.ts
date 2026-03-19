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
   * On Web, if dir="rtl" is set on html, flex-row already behaves like RTL.
   * On Mobile, we need flex-row-reverse to manually flip the layout.
   */
  const rowClass = isWeb ? "flex-row" : `flex-row ${isRTL ? "flex-row-reverse" : ""}`;
  
  /**
   * Spacing utility: space-x doesn't always handle RTL well on native without space-x-reverse.
   * Gap is preferred for Web, space-x for Mobile.
   */
  const getGapClass = (spacing: number = 2) => {
    if (isWeb) return `gap-${spacing}`;
    return isRTL ? `space-x-reverse space-x-${spacing}` : `space-x-${spacing}`;
  };

  const textAlign = isRTL ? "text-right" : "text-left";
  const flexRow = isWeb ? "flex-row" : (isRTL ? "flex-row-reverse" : "flex-row");

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
