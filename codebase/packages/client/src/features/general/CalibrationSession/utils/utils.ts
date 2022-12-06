import { RatingStatisticRatingEnum } from '@pma/openapi';
import { isNegative } from 'utils';

export const toLocalRating = (rating: string) =>
  !isNegative(rating.indexOf(' ')) ? rating.toLowerCase().replace(' ', '_') : rating.toLowerCase();

export const buildData = (statistics, t, key) =>
  statistics.reduce(
    (acc, item) => ({
      ...acc,
      ...(item.rating === RatingStatisticRatingEnum.Unsubmitted
        ? {}
        : {
            [t(item.rating.toLowerCase())]: item[key],
          }),
    }),
    {},
  );
