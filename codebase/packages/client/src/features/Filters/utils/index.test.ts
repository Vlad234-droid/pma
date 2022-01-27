// @ts-ignore
import { generateEmployeeReview } from 'utils/test';

import { sortEmployeesFn, searchEmployeesFn, searchEmployeesAndManagersFn } from './index';
import { SortBy } from '../config/types';

describe('Filters utils', () => {
  describe('sortEmployeesFn', () => {
    const reviews = [
      {
        ...generateEmployeeReview(),
        firstName: 'Z',
      },
      {
        ...generateEmployeeReview(),
        firstName: 'A',
      },
    ];

    it('should return employees as it is, if !sort in arguments', () => {
      const expected = [...reviews];
      expect(sortEmployeesFn(reviews)).toEqual(expected);
    });

    it('should return employees sorted from a to z, if AZ sort passed', () => {
      const expected = [...reviews].reverse();
      expect(sortEmployeesFn(reviews, SortBy.AZ)).toEqual(expected);
    });

    it('should return employees sorted from z to a, if ZA sort passed', () => {
      const reviews = [
        {
          ...generateEmployeeReview(),
          firstName: 'A',
        },
        {
          ...generateEmployeeReview(),
          firstName: 'Z',
        },
      ];

      const expected = [...reviews].reverse();
      expect(sortEmployeesFn(reviews, SortBy.ZA)).toEqual(expected);
    });

    it('should return employees sorted from z to a, if ZA sort passed and empty value occurred', () => {
      const reviews = [
        {
          ...generateEmployeeReview(),
          firstName: 'A',
        },
        {
          ...generateEmployeeReview(),
          firstName: undefined,
        },
      ];

      const expected = [...reviews];
      expect(sortEmployeesFn(reviews, SortBy.ZA)).toEqual(expected);
    });

    it('should return employees sorted from a to z, if AZ sort passed and empty value occurred', () => {
      const reviews = [
        {
          ...generateEmployeeReview(),
          firstName: 'Z',
        },
        {
          ...generateEmployeeReview(),
          firstName: undefined,
        },
      ];

      const expected = [...reviews].reverse();
      expect(sortEmployeesFn(reviews, SortBy.AZ)).toEqual(expected);
    });
  });

  describe('searchEmployeesFn', () => {
    const reviews = [
      {
        ...generateEmployeeReview(),
        firstName: 'Zzzaaaa',
      },
      {
        ...generateEmployeeReview(),
        firstName: 'Aaaazzzz',
      },
    ];

    it('should return employees as they are, if !search passed', () => {
      const expected = [...reviews];
      expect(searchEmployeesFn(reviews)).toEqual(expected);
    });

    it('should return employees as they are, if search.length < 3', () => {
      const expected = [...reviews];
      expect(searchEmployeesFn(reviews, 'Aa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in firstName', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesFn(reviews, 'Aaa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in firstName in lowerCase', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesFn(reviews, 'aaa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in firstName in upperCase', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesFn(reviews, 'AAA')).toEqual(expected);
    });

    it('should return several employees, if several items found started with searched value in firstName', () => {
      const reviews = [
        {
          ...generateEmployeeReview(),
          firstName: 'Aaazzzzz',
        },
        {
          ...generateEmployeeReview(),
          firstName: 'Aaaazzzz',
        },
      ];

      const expected = [...reviews];
      expect(searchEmployeesFn(reviews, 'Aaa')).toEqual(expected);
    });

    it('should return empty array, if no items found started with searched value in firstName', () => {
      const expected = [];
      expect(searchEmployeesFn(reviews, 'Aaz')).toEqual(expected);
    });

    it('should return empty array, if no items found started with searched value in firstName', () => {
      const expected = [];
      expect(searchEmployeesFn(reviews, 'Aaaaza')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in lastName', () => {
      const reviews = [
        {
          ...generateEmployeeReview(),
          lastName: 'Zzzaaaa',
        },
        {
          ...generateEmployeeReview(),
          lastName: 'Aaaazzzz',
        },
      ];

      const expected = [reviews[1]];
      expect(searchEmployeesFn(reviews, 'aaa')).toEqual(expected);
    });
  });

  describe('searchEmployeesAndManagersFn', () => {
    const reviews = [
      {
        ...generateEmployeeReview(),
        firstName: 'Zzzaaaa',
        lineManager: {
          uuid: 'mocked_line_manager_id',
          firstName: 'FFF77777',
          jobName: 'mocked_line_manager_job_name',
          lastName: 'LLL77777',
          middleName: 'mocked_line_manager_middle_name',
          businessType: 'mocked_line_manager_business_type',
        }
      },
      {
        ...generateEmployeeReview(),
        firstName: 'Aaaazzzz',
        lineManager: {
          uuid: 'mocked_line_manager_id',
          firstName: 'FFF66666',
          jobName: 'mocked_line_manager_job_name',
          lastName: 'LLL66666',
          middleName: 'mocked_line_manager_middle_name',
          businessType: 'mocked_line_manager_business_type',
        }
      },
    ];

    it('should return employees as they are, if !search passed', () => {
      const expected = [...reviews];
      expect(searchEmployeesAndManagersFn(reviews)).toEqual(expected);
    });

    it('should return employees as they are, if search.length < 3', () => {
      const expected = [...reviews];
      expect(searchEmployeesAndManagersFn(reviews, 'Aa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in firstName', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'Aaa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in firstName in lowerCase', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'aaa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in firstName in upperCase', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'AAA')).toEqual(expected);
    });

    it('should return empty array, if no items found started with searched value in firstName', () => {
      const expected = [];
      expect(searchEmployeesAndManagersFn(reviews, 'Aaz')).toEqual(expected);
    });

    it('should return empty array, if no items found started with searched value in firstName', () => {
      const expected = [];
      expect(searchEmployeesAndManagersFn(reviews, 'Aaaaza')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in lastName', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'aaa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in managers lastName', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'LLL66')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in managers firstName', () => {
      const expected = [reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'FFF66')).toEqual(expected);
    });

    it('should return several employees, if not only one item found started with searched value in managers firstName', () => {
      const expected = [reviews[0], reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'FFF')).toEqual(expected);
    });

    it('should return several employees, if not only one item found started with searched value in managers lastName', () => {
      const expected = [reviews[0], reviews[1]];
      expect(searchEmployeesAndManagersFn(reviews, 'LLL')).toEqual(expected);
    });

    it('should return several employees, if not only one item found started with searched value in managers lastName or firstName', () => {
      const newReviews = [
        {
          ...reviews[0],
          lineManager: {
            ...reviews[0].lineManager,
            firstName: 'yyyyyysttts',
          },
        },
        {
          ...reviews[1],
          lineManager: {
            ...reviews[1].lineManager,
            lastName: 'yyydssssss',
          },
        },
      ];
      const expected = [newReviews[0], newReviews[1]];
      expect(searchEmployeesAndManagersFn(newReviews, 'yyy')).toEqual(expected);
    });

    it('should return several employees, if not only one item found started with searched value in managers or employee lastName or firstName', () => {
      const newReviews = [
        {
          ...reviews[0],
          lineManager: {
            ...reviews[0].lineManager,
            firstName: 'yyyyyysttts',
          },
        },
        {
          ...reviews[1],
          lastName: 'yyysssssss'
        },
      ];
      const expected = [newReviews[0], newReviews[1]];
      expect(searchEmployeesAndManagersFn(newReviews, 'LLL')).toEqual(expected);
    });
  });
});
