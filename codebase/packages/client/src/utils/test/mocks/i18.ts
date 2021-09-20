import i18n from 'i18next';
import { DateTime } from 'luxon';

import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  saveMissing: true,
  interpolation: {
    format: (value: any, format: any, lang: any): string => {
      if (format === 'uppercase') return value.toUpperCase();
      if (value instanceof Date) return DateTime.fromJSDate(value).setLocale(lang).toFormat(format);
      return value;
    },
  },
  react: { useSuspense: false },
});

export default i18n;
