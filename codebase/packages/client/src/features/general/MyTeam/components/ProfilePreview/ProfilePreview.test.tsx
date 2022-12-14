// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { Status, Rating } from 'config/enum';

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
      const { getByTestId } = render(
        <BrowserRouter>
          <ProfilePreview {...props} />
        </BrowserRouter>,
      );

      expect(getByTestId('timeline-preview')).toBeInTheDocument();
    });

    it('should render <ColleagueInfo />', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <ProfilePreview {...props} />
        </BrowserRouter>,
      );

      expect(getByTestId('colleague-info')).toBeInTheDocument();
    });

    it('should render View profile button, if !props.rating', () => {
      const { getByText } = render(
        <BrowserRouter>
          <ProfilePreview {...props} />
        </BrowserRouter>,
      );

      expect(getByText('View profile')).toBeInTheDocument();
    });

    it('should render <ExpandButton />, if !props.rating', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <ProfilePreview {...props} />
        </BrowserRouter>,
      );

      expect(getByTestId('expand-button')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClick on wrapper click', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <ProfilePreview {...props} />
        </BrowserRouter>,
      );

      fireEvent.click(getByTestId('timeline-preview'));
      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
