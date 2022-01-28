// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';
// @ts-ignore
import { ReviewType } from 'config/types';

import LinkButton from './LinkButton';

describe('<LinkButton />', () => {
  const props = {
    children: 'mocked_children',
    onClick: jest.fn(),
  };

  describe('#render', () => {
    it('should render button with passed children', () => {
      const { getByRole, getByText } = render(<LinkButton {...props} />);

      expect(getByRole('button')).toBeInTheDocument();
      expect(getByText('mocked_children')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClick on button click', () => {
      const { getByRole } = render(<LinkButton {...props} />);
      const button = getByRole('button');

      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
