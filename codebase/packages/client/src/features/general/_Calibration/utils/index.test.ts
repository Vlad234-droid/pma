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
      const data = {
        title: '2022',
        ratings: {
          [Rating.OUTSTANDING]: 12,
          [Rating.GREAT]: 13,
          [Rating.SATISFACTORY]: 11,
          [Rating.BELOW_EXPECTED]: 10,
        },
      };

      const expected = {
        data: [
          {
            name: Rating.OUTSTANDING,
            '2022': 12,
          },
          {
            name: Rating.GREAT,
            '2022': 13,
          },
          {
            name: Rating.SATISFACTORY,
            '2022': 11,
          },
          {
            name: Rating.BELOW_EXPECTED,
            '2022': 10,
          },
        ],
        total: { '2022': 46 },
      };

      expect(getComputedData(data)).toEqual(expected);
    });

    it('should return computed data, if compareData passed', () => {
      const data = {
        title: '2022',
        ratings: {
          [Rating.OUTSTANDING]: 12,
          [Rating.GREAT]: 13,
          [Rating.SATISFACTORY]: 11,
          [Rating.BELOW_EXPECTED]: 10,
        },
      };

      const compareData = {
        title: '2021',
        ratings: {
          [Rating.OUTSTANDING]: 10,
          [Rating.GREAT]: 9,
          [Rating.SATISFACTORY]: 11,
          [Rating.BELOW_EXPECTED]: 20,
        },
      };

      const expected = {
        data: [
          {
            name: Rating.OUTSTANDING,
            '2022': 12,
            '2021': 10,
          },
          {
            name: Rating.GREAT,
            '2022': 13,
            '2021': 9,
          },
          {
            name: Rating.SATISFACTORY,
            '2022': 11,
            '2021': 11,
          },
          {
            name: Rating.BELOW_EXPECTED,
            '2022': 10,
            '2021': 20,
          },
        ],
        total: { '2022': 46, '2021': 50 },
      };

      expect(getComputedData(data, compareData)).toEqual(expected);
    });
  });
});
