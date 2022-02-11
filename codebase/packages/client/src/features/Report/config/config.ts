import { Status } from 'config/enum';

export const field_options = [
  { value: 'id_1', label: '2022' },
  { value: 'id_2', label: '2021' },
  { value: 'id_3', label: '2020' },
];

export const years = {
  2021: '2021',
};

export const listOfStatuses = [
  Status.APPROVED,
  Status.DRAFT,
  Status.WAITING_FOR_APPROVAL,
  Status.DECLINED,
  Status.COMPLETED,
  Status.OVERDUE,
  Status.STARTED,
  Status.NOT_STARTED,
  Status.NOT_CREATED,
];
