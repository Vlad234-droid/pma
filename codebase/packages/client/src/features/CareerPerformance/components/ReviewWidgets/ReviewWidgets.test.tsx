// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import ReviewWidgets from './ReviewWidgets';

describe('<ReviewWidgets />', () => {
  describe('#render', () => {
    const props = {
      basicTileStyle: {},
      midYearReview: 'mocked_myr',
      endYearReview: 'mocked_eyr',
    };

    it('should not render myr and eyr, if !props.showMyReview', () => {
      const { queryByTestId, queryByText } = render(<ReviewWidgets {...props} />);

      expect(queryByTestId('mid-year-review')).not.toBeInTheDocument();
      expect(queryByText('Mid-year review')).not.toBeInTheDocument();
      expect(queryByTestId('end-year-review')).not.toBeInTheDocument();
      expect(queryByText('Year-end review')).not.toBeInTheDocument();
    });

    it('should not render annual performance , if !props.showAnnualReview', () => {
      const { queryByTestId, queryByText } = render(<ReviewWidgets {...props} />);

      expect(queryByTestId('annual-performance-review')).not.toBeInTheDocument();
      expect(queryByText('Annual performance review')).not.toBeInTheDocument();
    });

    it('should render myr and eyr, if props.showMyReview', () => {
      const newProps = {
        ...props,
        showMyReview: true,
      };

      const { getByTestId, getByText } = render(<ReviewWidgets {...newProps} />);

      expect(getByTestId('mid-year-review')).toBeInTheDocument();
      expect(getByText('Mid-year review')).toBeInTheDocument();
      expect(getByTestId('end-year-review')).toBeInTheDocument();
      expect(getByText('Year-end review')).toBeInTheDocument();
    });

    it('should render annual performance , if !props.showAnnualReview', () => {
      const newProps = {
        ...props,
        showAnnualReview: true,
      };

      const { getByTestId, getByText } = render(<ReviewWidgets {...newProps} />);

      expect(getByTestId('annual-performance-review')).toBeInTheDocument();
      expect(getByText('Annual performance review')).toBeInTheDocument();
    });
  });
});
