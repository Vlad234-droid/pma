import * as T from '../types';

export const transformReviewsToObjectives = (
  reviwes: T.Review[] = [],
  formElements?: Record<string, string>[],
): T.Objective[] => {
  return reviwes?.map((reviewItem) => {
    const status = reviewItem.status;
    const objective = reviewItem?.properties?.mapJson;
    const subTitle = objective['title'] || '';
    const description = objective['description'] || '';
    let explanations: T.Explanation[] = [];

    if (formElements) {
      explanations = formElements
        .filter(({ key }) => !['title', 'description'].includes(key))
        .map((component) => {
          const { key, label } = component;

          return { title: label, steps: objective[key] ? [objective[key]] : [] };
        });
    }

    return {
      id: Number(reviewItem.number),
      title: `Objective ${reviewItem.number}`,
      subTitle: subTitle,
      description: description,
      explanations,
      status,
    };
  });
};