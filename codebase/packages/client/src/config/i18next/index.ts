import i18n from 'i18next';
import { DateTime } from 'luxon';
import { PUBLIC_URL } from 'config/constants';

import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { checkTrailingSlash } from 'utils/helper';

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    saveMissing: false,
    updateMissing: false,
    backend: {
      loadPath: `${checkTrailingSlash(PUBLIC_URL)}locales/{{lng}}/{{ns}}.json`,
      queryStringParams: { v: '0.0.1' },
    },
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
