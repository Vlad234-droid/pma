import { ReviewForApproval } from 'config/types';

import { SortBy } from '../config/types';

export const getEmployeesSortingOptions = (t) => [
  {
    id: '1',
    label: SortBy.AZ,
    text: t('a_z', 'A-Z'),
  },
  {
    id: '2',
    label: SortBy.ZA,
    text: t('z_a', 'Z-A'),
  },
];

export const searchEmployeesFn = (employees: ReviewForApproval[], search?: string) => {
  if (!search || search.length < 3) return employees;

  return employees.filter(
    (employee: ReviewForApproval) =>
      employee.firstName.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.lastName.toLowerCase().startsWith(search.toLowerCase()) ||
      (employee.middleName && employee.middleName.toLowerCase().startsWith(search.toLowerCase())),
  );
};

export const sortEmployeesFn = (employees, sort) => {
  if (!sort) return employees;

  let sorted = [];

  switch (sort) {
    case SortBy.AZ:
      sorted = employees.sort(sortByAZNameFn);
      break;
    case SortBy.ZA:
      sorted = employees.sort(sortByZANameFn);
      break;
    default:
      sorted = employees;
  }

  return sorted;
};

const sortByAZNameFn = (a, b) => (a.firstName || '').toString().localeCompare((b.firstName || '').toString());
const sortByZANameFn = (a, b) => (b.firstName || '').toString().localeCompare((a.firstName || '').toString());
