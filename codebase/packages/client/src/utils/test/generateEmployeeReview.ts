import faker from 'faker';

import { Employee } from 'config/types';

import { generateReviews } from './generateReview';
import { generateTimelines } from './generateTimeline';

const generateEmployeeReview = () => {
  const review: Employee = {
    businessType: faker.random.words(1),
    firstName: faker.random.words(1),
    jobName: faker.random.words(1),
    lastName: faker.random.words(1),
    middleName: faker.random.words(1),
    uuid: faker.random.words(1),
    reviews: generateReviews(2),
    timeline: generateTimelines(2),
  };

  return review;
};

export { generateEmployeeReview };
