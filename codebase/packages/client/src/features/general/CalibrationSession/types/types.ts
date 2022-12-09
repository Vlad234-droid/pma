import { ColleagueReview, RatingStatistic } from '@pma/openapi';
import { initialStatistics } from '../config';

type ColleagueReviewType = Array<ColleagueReview>;

export enum ActiveList {
  LIST = 'LIST',
  GRAPH = 'GRAPH',
  TABLE = 'TABLE',
}

export type RatingsType = Record<
  'outstanding' | 'great' | 'satisfactory' | 'below_expected' | 'unsubmitted',
  ColleagueReviewType
>;

export type StatisticsType = Array<RatingStatistic>;

export type statisticsType = typeof initialStatistics;