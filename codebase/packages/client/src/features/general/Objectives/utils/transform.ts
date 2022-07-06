import { Status } from 'config/enum';
import { Tenant } from 'utils';
import { Review } from 'config/types';
import { Objective, Explanation } from '../types';

export const transformReviewsToObjectives = (
  reviews: Review[] = [],
  formElements?: Record<string, string>[],
  tenant = Tenant.GENERAL,
): Objective[] => {
  return reviews?.map((reviewItem) => {
    const status = reviewItem.status;
    const lastUpdatedTime = reviewItem.lastUpdatedTime;
    const declineReason = status === Status.DECLINED ? reviewItem?.changeStatusReason : '';
    const objective = reviewItem?.properties;
    const subTitle = objective?.['title'] || '';
    const description = objective?.['description'] || '';
    let explanations: Explanation[] = [];
    const uuid = reviewItem.uuid;

    if (formElements) {
      explanations = formElements
        .filter(({ key }) => !['title', 'description'].includes(key))
        .map((component) => {
          const { key, label } = component;

          return { title: label, description: objective?.[key] || '' };
        });
    }

    return {
      id: Number(reviewItem.number),
      title: `${tenant === Tenant.GENERAL ? 'Objective' : 'Priority'} ${reviewItem.number}`,
      subTitle: subTitle,
      description: description,
      declineReason,
      explanations,
      status,
      lastUpdatedTime,
      uuid,
    };
  });
};
