import { Rating } from 'config/enum';

export type RatingChartData = {
  title: string;
  ratings: {
    [Rating.OUTSTANDING]: number;
    [Rating.GREAT]: number;
    [Rating.SATISFACTORY]: number;
    [Rating.BELOW_EXPECTED]: number;
  };
};
