// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import ViewFilters, { VIEW_FILTERS } from './ViewFilters';
import { View } from '../../config/types';

describe('<ViewFilters />', () => {
  const props = {
    onChange: jest.fn(),
    view: View.FULL_TEAM,
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<ViewFilters {...props} />);

      expect(getByTestId(VIEW_FILTERS)).toBeInTheDocument();
    });

    it('should render correctly', () => {
      const { getByText, getByTestId } = render(<ViewFilters {...props} />);

      expect(getByTestId(View.FULL_TEAM)).toBeInTheDocument();
      expect(getByTestId(View.DIRECT_REPORTS)).toBeInTheDocument();
      expect(getByText('My direct reports')).toBeInTheDocument();
      expect(getByText('My full team')).toBeInTheDocument();
    });

    it('should check radio with current view', () => {
      const { getByTestId } = render(<ViewFilters {...props} />);

      expect(getByTestId(props.view)).toBeChecked();
    });
  });

  describe('#handlers', () => {
    it('should call props.onChange on select another radio', () => {
      const { getByTestId } = render(<ViewFilters {...props} />);

      fireEvent.click(getByTestId(View.DIRECT_REPORTS));

      expect(props.onChange).toHaveBeenCalled();
    });
  });
});
