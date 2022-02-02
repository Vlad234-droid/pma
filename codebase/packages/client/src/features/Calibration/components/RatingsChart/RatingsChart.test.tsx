// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { Rating } from 'config/enum';

import RatingsChart from './RatingsChart';

describe('<RatingsChart />', () => {
  const props = {
    currentData: [
      { name: Rating.OUTSTANDING, 2022: 13 },
      { name: Rating.GREAT, 2022: 37 },
      { name: Rating.SATISFACTORY, 2022: 46 },
      { name: Rating.BELOW_EXPECTED, 2022: 6 },
    ],
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
