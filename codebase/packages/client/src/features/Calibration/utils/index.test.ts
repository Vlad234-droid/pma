// @ts-ignore
import { Rating } from 'config/enum';

import { getGraphBars, getComputedData } from './index';

describe('<Calibratin /> utils', () => {
  describe('#getGraphBars', () => {
    it('should return an array of values from keys other then name', () => {
      const data = [
        {
          name: Rating.OUTSTANDING,
          2022: 13,
          2023: 12,
        },
        {
          name: Rating.GREAT,
          2022: 37,
          2023: 19,
        },
      ];
      const expected = ['2022', '2023'];

      expect(getGraphBars(data)).toEqual(expected);
    });

    it('should return empty array, if no values other then name', () => {
      const data = [
        {
          name: Rating.OUTSTANDING,
        },
        {
          name: Rating.GREAT,
        },
      ];

      expect(getGraphBars(data)).toEqual([]);
    });
  });

  describe('#getComputedData', () => {
    it('should return data as it is, if no compareData', () => {
      const data = [
        {
          name: Rating.OUTSTANDING,
          2022: 13,
        },
        {
          name: Rating.GREAT,
          2022: 37,
        },
      ];

      expect(getComputedData(data)).toEqual(data);
    });

    it('should return computed data, if compareData passed', () => {
      const data = [
        {
          name: Rating.OUTSTANDING,
          2022: 13,
        },
        {
          name: Rating.GREAT,
          2022: 37,
        },
      ];

      const compareData = [
        {
          name: Rating.OUTSTANDING,
          2021: 17,
          'Expected distribution': 11,
        },
        {
          name: Rating.GREAT,
          2021: 33,
          'Expected distribution': 35,
        },
      ];

      const expected = [
        {
          name: Rating.OUTSTANDING,
          2021: 17,
          2022: 13,
          'Expected distribution': 11,
        },
        {
          name: Rating.GREAT,
          2021: 33,
          2022: 37,
          'Expected distribution': 35,
        },
      ];

      expect(getComputedData(data, compareData)).toEqual(expected);
    });
  });
});
