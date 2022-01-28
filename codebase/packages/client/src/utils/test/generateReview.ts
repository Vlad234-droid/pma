// import faker from 'faker';

import { Review, ReviewType, Status } from 'config/types';

import { generateArray } from './generateArray';

type Config = {
  reviewType?: ReviewType;
  status?: Status;
};

const generateReview = (config?: Config) => {
  const review: Review = {
    number: 123,
    status: config?.status || Status.PENDING,
    type: config?.reviewType || ReviewType.OBJECTIVE,
    uuid: 'mocked_review_uuid',
  };

  // const review: Review = {
  //   number: faker.random.words(1),
  //   status: config?.status || Status.PENDING,
  //   type: config?.reviewType || ReviewType.OBJECTIVE,
  //   uuid: faker.random.words(1),
  // };

  return review;
};

const generateReviews = (length: number) => generateArray(length).map(() => generateReview());

export { generateReview, generateReviews };
