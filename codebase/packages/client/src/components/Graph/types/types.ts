import { Rating } from 'config/enum';

export type RatingChartData = {
  title: string;
  ratings: Record<Rating.OUTSTANDING | Rating.GREAT | Rating.SATISFACTORY | Rating.BELOW_EXPECTED, number>;
};
