//@ts-ignore
import { RootState } from 'typesafe-actions';

export const completedReviewsSelector = (state: RootState) => state.completedReviews.data;
