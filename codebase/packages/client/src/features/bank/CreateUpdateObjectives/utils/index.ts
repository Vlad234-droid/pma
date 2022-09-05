import { Status } from 'config/types';
import { Objective } from '../type';

export const prioritiesInStatuses = (statuses: Status[]) => (priorities: Objective[]) =>
  priorities.filter((priority) => priority.status && statuses.includes(priority.status));

export const prioritiesNotInStatuses = (statuses: Status[]) => (priorities: Objective[]) =>
  priorities.filter((priority) => priority.status && !statuses.includes(priority.status));
