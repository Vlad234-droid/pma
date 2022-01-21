// import faker from 'faker';

import { Employee } from 'config/types';

import { generateReviews } from './generateReview';
import { generateTimelines } from './generateTimeline';

const generateEmployeeReview = () => {
  const employee: Employee = {
    businessType: 'mocked_business_type',
    firstName: 'mocked_first_name',
    jobName: 'mocked_job_name',
    lastName: 'mocked_last_name',
    middleName: 'mocked_middle_name',
    uuid: 'mocked_uuid',
    reviews: generateReviews(2),
    timeline: generateTimelines(2),
  };

  // const employee: Employee = {
  //   businessType: faker.random.words(1),
  //   firstName: faker.random.words(1),
  //   jobName: faker.random.words(1),
  //   lastName: faker.random.words(1),
  //   middleName: faker.random.words(1),
  //   uuid: faker.random.words(1),
  //   reviews: generateReviews(2),
  //   timeline: generateTimelines(2),
  // };

  return employee;
};

export { generateEmployeeReview };
