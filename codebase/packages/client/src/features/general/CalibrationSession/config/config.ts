import { Ratings } from '../types';

const _limit = 10;
const _start = 0;

export const initialFields: Record<'_start' | '_limit', number> = {
  _start,
  _limit,
};

export const initialStatistics = [
  { rating: Ratings.Outstanding, count: 0, percentage: 0 },
  { rating: Ratings.Great, count: 0, percentage: 0 },
  { rating: Ratings.Satisfactory, count: 0, percentage: 0 },
  { rating: Ratings.BelowExpected, count: 0, percentage: 0 },
  { rating: Ratings.NewToBusiness, count: 0, percentage: 0 },
  { rating: Ratings.Unsubmitted, count: 0, percentage: 0 },
];

export const initialRatingEnums = [
  Ratings.Outstanding,
  Ratings.Great,
  Ratings.Satisfactory,
  Ratings.BelowExpected,
  Ratings.NewToBusiness,
  Ratings.Unsubmitted,
];

export const initialRatings = [
  Ratings.Great,
  Ratings.Satisfactory,
  Ratings.BelowExpected,
  Ratings.Outstanding,
  Ratings.NewToBusiness,
];
