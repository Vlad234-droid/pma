// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';
// @ts-ignore
import { Status, Rating } from 'config/enum';

import TimelinePreview from './TimelinePreview';

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
      const { getByTestId } = render(<TimelinePreview {...props} />);

      expect(getByTestId('timeline-preview')).toBeInTheDocument();
    });

    it('should render <ColleagueInfo />', () => {
      const { getByTestId } = render(<TimelinePreview {...props} />);

      expect(getByTestId('colleague-info')).toBeInTheDocument();
    });

    it('should render View profile button, if !props.rating', () => {
      const { getByText } = render(<TimelinePreview {...props} />);

      expect(getByText('View profile')).toBeInTheDocument();
    });

    it('should render <ExpandButton />, if !props.rating', () => {
      const { getByTestId } = render(<TimelinePreview {...props} />);

      expect(getByTestId('expand-button')).toBeInTheDocument();
    });

    it('should render icon, if !props.rating', () => {
      const { getByTestId } = render(<TimelinePreview {...props} />);

      expect(getByTestId('timeline-icon')).toBeInTheDocument();
    });

    it('should not render icon, if props.rating', () => {
      const newProps = {
        ...props,
        rating: Rating.BELOW_EXPECTED,
      };

      const { queryByTestId } = render(<TimelinePreview {...newProps} />);

      expect(queryByTestId('timeline-icon')).not.toBeInTheDocument();
    });

    it('should not render <ExpandButton />, if props.rating', () => {
      const newProps = {
        ...props,
        rating: Rating.BELOW_EXPECTED,
      };

      const { queryByTestId } = render(<TimelinePreview {...newProps} />);

      expect(queryByTestId('expand-button')).not.toBeInTheDocument();
    });

    it('should not render View profile and render props.rating, if props.rating', () => {
      const newProps = {
        ...props,
        rating: Rating.BELOW_EXPECTED,
      };

      const { queryByText, getByText } = render(<TimelinePreview {...newProps} />);

      expect(queryByText('View profile')).not.toBeInTheDocument();
      expect(getByText(newProps.rating)).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClick on wrapper click', () => {
      const { getByTestId } = render(<TimelinePreview {...props} />);

      fireEvent.click(getByTestId('timeline-preview'));
      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
