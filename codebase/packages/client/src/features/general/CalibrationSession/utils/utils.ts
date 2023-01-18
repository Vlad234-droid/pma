import { Ratings } from '../types';

import { isNegative } from 'utils';

export const toLocalRating = (rating: string) =>
  !isNegative(rating.indexOf(' ')) ? rating.toLowerCase().replace(' ', '_') : rating.toLowerCase();

export const buildData = (statistics, t, field) =>
  Object.entries(statistics).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(key === Ratings.Unsubmitted
        ? {}
        : {
            [t(key.toLowerCase())]: (value as any)?.[field] || '',
          }),
    }),
    {},
  );
