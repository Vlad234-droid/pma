import isEmpty from 'lodash.isempty';

import { Employee } from 'config/types';

import { FilterOption, SortBy, FilterValues } from '../config/types';

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
      employee.lastName.toLowerCase().startsWith(search.toLowerCase()),
  );
};


export const searchEmployeesAndManagersFn = <T extends Employee, K extends string>(employees: T[], search?: K): T[] => {
  if (!search || search.length < 3) return employees;

  return employees.filter(
    (employee: Employee) =>
      employee.firstName.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.lastName.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.lineManager?.firstName.toLowerCase().startsWith(search.toLowerCase()) ||
      employee.lineManager?.lastName.toLowerCase().startsWith(search.toLowerCase()),
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

export const getInitialFilterValues = (options?: FilterOption[]) => {
  if (!options) return {};

  return (
    options.reduce((res, item) => {
      const itemOptions = item.multi ? item.options.reduce((res, option) => (
        {...res, [option]: false }
      ), {}) : '';

      return {...res, [item.id]: itemOptions };
    }, {})
  );
};

export const getFiltersWithValues = (filters: FilterValues) => (
  Object.entries(filters).reduce((res, [key, value]) => {
    if (typeof value === 'string') {
      return value ? {...res, [key]: value} : res;
    } else {
      const validFilters = Object.entries(value).reduce((res, [key, value]) => {
        if (value) {
          return {...res, [key]: value};
        }
        return res;
      }, {});

      if (!isEmpty(validFilters)) {
        return {...res, [key]: validFilters}
      }

      return res;
    }
  }, {})
);
