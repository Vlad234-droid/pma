import { ColleagueReview } from '@pma/openapi';

type ColleagueReviewType = Array<ColleagueReview>;

export enum ActiveList {
  LIST = 'LIST',
  GRAPH = 'GRAPH',
  TABLE = 'TABLE',
}
export enum RatingStatisticRatingEnum {
  Outstanding = 'OUTSTANDING',
  Great = 'GREAT',
  Satisfactory = 'SATISFACTORY',
  BelowExpected = 'BELOW_EXPECTED',
  Unsubmitted = 'UNSUBMITTED',
}

export type RatingsType = Record<
  'outstanding' | 'great' | 'satisfactory' | 'below_expected' | 'unsubmitted',
  ColleagueReviewType
>;
