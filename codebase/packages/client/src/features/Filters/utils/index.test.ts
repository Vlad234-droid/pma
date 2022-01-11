import { generateEmployeeReview } from 'utils/test';

import { sortEmployeesFn, searchEmployeesFn } from './index';
import { SortBy } from '../config/types';

describe('Filters utils', () => {
  describe('sortEmployeesFn', () => {
    const reviews = [{
      ...generateEmployeeReview(),
      firstName: 'Z',
    }, {
      ...generateEmployeeReview(),
      firstName: 'A',
    }];

    it('should return employees as it is, if !sort in arguments', () => {
      const expected = [...reviews];
      expect(sortEmployeesFn(reviews)).toEqual(expected);
    });

    it('should return employees sorted from a to z, if AZ sort passed', () => {
      const expected = [...reviews].reverse();
      expect(sortEmployeesFn(reviews, SortBy.AZ)).toEqual(expected);
    });

    it('should return employees sorted from z to a, if ZA sort passed', () => {
      const reviews = [{
        ...generateEmployeeReview(),
        firstName: 'A',
      }, {
        ...generateEmployeeReview(),
        firstName: 'Z',
      }];

      const expected = [...reviews].reverse();
      expect(sortEmployeesFn(reviews, SortBy.ZA)).toEqual(expected);
    });

    it('should return employees sorted from z to a, if ZA sort passed and empty value occurred', () => {
      const reviews = [{
        ...generateEmployeeReview(),
        firstName: 'A',
      }, {
        ...generateEmployeeReview(),
        firstName: undefined,
      }];

      const expected = [...reviews];
      expect(sortEmployeesFn(reviews, SortBy.ZA)).toEqual(expected);
    });

    it('should return employees sorted from a to z, if AZ sort passed and empty value occurred', () => {
      const reviews = [{
        ...generateEmployeeReview(),
        firstName: 'Z',
      }, {
        ...generateEmployeeReview(),
        firstName: undefined,
      }];

      const expected = [...reviews].reverse();
      expect(sortEmployeesFn(reviews, SortBy.AZ)).toEqual(expected);
    });
  });

  describe('searchEmployeesFn', () => {
    const reviews = [{
      ...generateEmployeeReview(),
      firstName: 'Zzzaaaa',
    }, {
      ...generateEmployeeReview(),
      firstName: 'Aaaazzzz',
    }];

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
      const reviews = [{
        ...generateEmployeeReview(),
        firstName: 'Aaazzzzz',
      }, {
        ...generateEmployeeReview(),
        firstName: 'Aaaazzzz',
      }];

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
      const reviews = [{
        ...generateEmployeeReview(),
        lastName: 'Zzzaaaa',
      }, {
        ...generateEmployeeReview(),
        lastName: 'Aaaazzzz',
      }];

      const expected = [reviews[1]];
      expect(searchEmployeesFn(reviews, 'aaa')).toEqual(expected);
    });

    it('should return one employee, if one item found started with searched value in middleName', () => {
      const reviews = [{
        ...generateEmployeeReview(),
        middleName: 'Zzzaaaa',
      }, {
        ...generateEmployeeReview(),
        middleName: 'Aaaazzzz',
      }];

      const expected = [reviews[1]];
      expect(searchEmployeesFn(reviews, 'aaa')).toEqual(expected);
    });
  });
});
