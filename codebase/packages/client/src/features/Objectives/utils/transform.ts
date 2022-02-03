import * as T from '../types';
import { Status } from 'config/enum';

export const transformReviewsToObjectives = (
  reviews: T.Review[] = [],
  formElements?: Record<string, string>[],
): T.Objective[] => {
  return reviews?.map((reviewItem) => {
    const status = reviewItem.status;
    const declineReason = status === Status.DECLINED ? reviewItem?.changeStatusReason : '';
    const objective = reviewItem?.properties?.mapJson;
    const subTitle = objective['title'] || '';
    const description = objective['description'] || '';
    let explanations: T.Explanation[] = [];

    if (formElements) {
      explanations = formElements
        .filter(({ key }) => !['title', 'description'].includes(key))
        .map((component) => {
          const { key, label } = component;

          return { title: label, description: objective[key] };
        });
    }

    return {
      id: Number(reviewItem.number),
      title: `Objective ${reviewItem.number}`,
      subTitle: subTitle,
      description: description,
      declineReason,
      explanations,
      status,
    };
  });
};
