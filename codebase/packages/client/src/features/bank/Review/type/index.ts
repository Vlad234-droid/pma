import { ReviewType } from 'config/enum';

export type ReviewFormType = {
  reviewType: ReviewType.MYR | ReviewType.EYR;
  onClose: () => void;
};
