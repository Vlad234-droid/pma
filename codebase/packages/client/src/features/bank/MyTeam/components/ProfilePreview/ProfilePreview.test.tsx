// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';
// @ts-ignore
import { Status } from 'config/enum';

import ProfilePreview from './ProfilePreview';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

describe('<TimelinePreview />', () => {
  const props = {
    employee: generateEmployeeReview(),
    status: Status.PENDING,
    onClick: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<ProfilePreview {...props} />);

      expect(getByTestId('timeline-preview')).toBeInTheDocument();
    });

    it('should render <ColleagueInfo />', () => {
      const { getByTestId } = render(<ProfilePreview {...props} />);

      expect(getByTestId('colleague-info')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClick on wrapper click', () => {
      const { getByTestId } = render(<ProfilePreview {...props} />);

      fireEvent.click(getByTestId('timeline-preview'));
      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
