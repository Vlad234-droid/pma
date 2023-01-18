import { ColleagueReview } from '@pma/openapi';

type ColleagueReviewType = Array<ColleagueReview>;

export enum View {
  LIST = 'LIST',
  GRAPH = 'GRAPH',
  TABLE = 'TABLE',
}
export enum Ratings {
  Outstanding = 'OUTSTANDING',
  Great = 'GREAT',
  Satisfactory = 'SATISFACTORY',
  BelowExpected = 'BELOW_EXPECTED',
  NewToBusiness = 'NEW_TO_BUSINESS',
  Unsubmitted = 'UNSUBMITTED',
}

export type RatingsType = Record<Lowercase<Ratings>, ColleagueReviewType>;
