import { RatingStatisticRatingEnum } from '../types';

const _limit = 10;
const _start = 0;

export const initialFields: Record<'_start' | '_limit', number> = {
  _start,
  _limit,
};

export const initialStatistics = [
  { rating: RatingStatisticRatingEnum.Outstanding, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.Great, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.Satisfactory, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.BelowExpected, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.Unsubmitted, count: 0, percentage: 0 },
];

export const initialRatingEnums = [
  RatingStatisticRatingEnum.Outstanding,
  RatingStatisticRatingEnum.Great,
  RatingStatisticRatingEnum.Satisfactory,
  RatingStatisticRatingEnum.BelowExpected,
  RatingStatisticRatingEnum.Unsubmitted,
];

export const initialRatings = [
  RatingStatisticRatingEnum.Great,
  RatingStatisticRatingEnum.Satisfactory,
  RatingStatisticRatingEnum.BelowExpected,
  RatingStatisticRatingEnum.Outstanding,
];
