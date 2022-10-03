import { Review } from 'config/types';
import { Objective } from '../type';

export const transformReviewsToObjectives = (reviews: Review[] = []): Objective[] => {
  return reviews?.map((reviewItem) => {
    const status = reviewItem.status;
    const lastUpdatedTime = reviewItem.lastUpdatedTime;
    const objective = reviewItem?.properties;
    const subTitle = objective?.['title'] || '';
    const description = objective?.['description'] || '';
    const uuid = reviewItem.uuid;

    return {
      id: Number(reviewItem.number),
      title: `Priority ${reviewItem.number}`,
      subTitle: subTitle,
      description: description,
      status,
      lastUpdatedTime,
      uuid,
    };
  });
};
