import { Employee } from 'config/types';

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

export const searchEmployeesFn = <T extends Employee, K extends string>(employees: T[], search?: K): T[] => {
  if (!search || search.length < 3) return employees;

  return employees.filter(
    (employee: Employee) =>
      employee.firstName.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.lastName.toLowerCase().startsWith(search.toLowerCase()) ||
      (employee.middleName && employee.middleName.toLowerCase().startsWith(search.toLowerCase())),
  );
};

export const sortEmployeesFn = <T extends Employee, K extends SortBy>(employees: T[], sort?: K): T[] => {
  if (!sort) return employees;

  let sorted = [] as T[];

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

const sortByAZNameFn = <T extends { firstName?: string }, K extends T>(a: T, b: K): number =>
  (a.firstName || '').toString().localeCompare((b.firstName || '').toString());
const sortByZANameFn = <T extends { firstName?: string }, K extends T>(a: T, b: K): number =>
  (b.firstName || '').toString().localeCompare((a.firstName || '').toString());
