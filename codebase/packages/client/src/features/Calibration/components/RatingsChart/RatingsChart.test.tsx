// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { Rating } from 'config/enum';

import RatingsChart from './RatingsChart';

describe('<RatingsChart />', () => {
  const props = {
    currentData: {
      title: '2022',
      ratings: {
        [Rating.OUTSTANDING]: 13,
        [Rating.GREAT]: 37,
        [Rating.SATISFACTORY]: 46,
        [Rating.BELOW_EXPECTED]: 6,
      },
    },
  };

  describe('#render', () => {
    it('should render chart', () => {
      const { getByTestId } = render(<RatingsChart {...props} />);

      expect(getByTestId('ratings-chart')).toBeInTheDocument();
    });

    it('should render title', () => {
      const { getByText } = render(<RatingsChart {...props} />);

      expect(getByText(`Calibration submission ${new Date().getFullYear()}`)).toBeInTheDocument();
    });
  });
});
