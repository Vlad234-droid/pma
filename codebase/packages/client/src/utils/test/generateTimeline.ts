// import faker from 'faker';

import { Timeline, ReviewType, Status, TimelineType } from '../../config/types';

import { generateArray } from './generateArray';
import { dateToIso } from '../date';

type Config = {
  reviewType?: ReviewType;
  status?: Status;
  type?: TimelineType;
};

const generateTimeline = (config?: Config) => {
  const timeline: Timeline = {
    code: 'mocked_code',
    colleagueCycleUuid: 'mocked_colleague_cycle_id',
    cycleUuid: 'mocked_cycle_id',
    description: 'mocked_description',
    endTime: dateToIso(new Date()),
    reviewType: config?.reviewType || ReviewType.OBJECTIVE,
    startTime: dateToIso(new Date()),
    status: config?.status || Status.PENDING,
    summaryStatus: config?.status || Status.PENDING,
    type: config?.type || TimelineType.CYCLE,
    uuid: 'mocked_timeline_uuid',
    properties: {},
  };

  // const timeline: Timeline = {
  //   code: faker.random.words(1),
  //   count: faker.datatype.number(),
  //   colleagueCycleUuid: faker.random.words(1),
  //   description: faker.random.words(5),
  //   endTime: dateToIso(new Date()),
  //   reviewType: config?.reviewType || ReviewType.OBJECTIVE,
  //   startTime: dateToIso(new Date()),
  //   status: config?.status || Status.PENDING,
  //   type: config?.type || TimelineType.CYCLE,
  //   uuid: faker.random.words(1),
  // };

  return timeline;
};

const generateTimelines = (length: number, config?: Config) =>
  generateArray(length).map(() => generateTimeline(config));

export { generateTimeline, generateTimelines };
