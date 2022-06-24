import i18n from 'i18next';
import { DateTime } from 'luxon';
import { initReactI18next } from 'react-i18next';

import commonEn from 'locales/en/common.json';
import generalEn from 'locales/en/general.json';
import bankEn from 'locales/en/bank.json';

const resources = {
  en: {
    common: commonEn,
    general: generalEn,
    bank: bankEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  defaultNS: 'common',
  lng: 'en',
  interpolation: {
    format: (value: any, format: any, lang: any): string => {
      if (format === 'uppercase') return value.toUpperCase();
      if (value instanceof Date) return DateTime.fromJSDate(value).setLocale(lang).toFormat(format);
      return value;
    },
    escapeValue: false,
  },
});

export default i18n;
