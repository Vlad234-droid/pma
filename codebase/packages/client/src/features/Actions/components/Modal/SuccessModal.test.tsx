// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';
// @ts-ignore
import { ReviewType, Status } from 'config/enum';

import SuccessModal from './SuccessModal';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<SuccessModal />', () => {
  describe('#render', () => {
    const props = {
      review: ReviewType.OBJECTIVE,
      status: Status.DECLINED,
      onClose: jest.fn(),
    };

    it('should render success modal with check mark', () => {
      const { getByTestId } = render(<SuccessModal {...props} />);

      expect(getByTestId('success-modal')).toBeInTheDocument();
      expect(getByTestId('success-check-mark')).toBeInTheDocument();
    });

    it('should render expected title and content, if status is DECLINED and type is OBJECTIVE', () => {
      const { getByText } = render(<SuccessModal {...props} />);
      const expectedTitle = 'Declined objectives and / or reviews';
      const expectedContent =
        'You’ve rejected this form as it doesn’t reflect the conversation you had with your colleague. ' +
        'Please pick up with them directly to discuss more.';

      expect(getByText(expectedTitle)).toBeInTheDocument();
      expect(getByText(expectedContent)).toBeInTheDocument();
      expect(getByText('Done!')).toBeInTheDocument();
    });

    it('should render expected title and content, if status is DECLINED and type is MYR', () => {
      const newProps = {
        ...props,
        review: ReviewType.MYR,
      };
      const { getByText } = render(<SuccessModal {...newProps} />);
      const expectedTitle = 'Declined objectives and / or reviews';
      const expectedContent =
        'You’ve rejected this form as it doesn’t reflect the conversation you had with your colleague. ' +
        'Please pick up with them directly to discuss more.';

      expect(getByText(expectedTitle)).toBeInTheDocument();
      expect(getByText(expectedContent)).toBeInTheDocument();
      expect(getByText('Done!')).toBeInTheDocument();
    });

    it('should render expected title and content, if status is DECLINED and type is EYR', () => {
      const newProps = {
        ...props,
        review: ReviewType.EYR,
      };
      const { getByText } = render(<SuccessModal {...newProps} />);
      const expectedTitle = 'Declined objectives and / or reviews';
      const expectedContent =
        'You’ve rejected this form as it doesn’t reflect the conversation you had with your colleague. ' +
        'Please pick up with them directly to discuss more.';

      expect(getByText(expectedTitle)).toBeInTheDocument();
      expect(getByText(expectedContent)).toBeInTheDocument();
      expect(getByText('Done!')).toBeInTheDocument();
    });

    it('should render expected title and content, if status is APPROVED and type is OBJECTIVE', () => {
      const newProps = {
        ...props,
        status: Status.APPROVED,
      };
      const { getByText } = render(<SuccessModal {...newProps} />);
      const expectedTitle = 'Approved objectives and / or reviews';
      const expectedContent = `You have approved your colleague's objectives.`;

      expect(getByText(expectedTitle)).toBeInTheDocument();
      expect(getByText(expectedContent)).toBeInTheDocument();
      expect(getByText('Done!')).toBeInTheDocument();
    });

    it('should render expected title and content, if status is APPROVED and type is MYR', () => {
      const newProps = {
        ...props,
        status: Status.APPROVED,
        review: ReviewType.MYR,
      };
      const { getByText } = render(<SuccessModal {...newProps} />);
      const expectedTitle = 'Approved objectives and / or reviews';
      const expectedContent = `You have approved your colleague's mid-year review.`;

      expect(getByText(expectedTitle)).toBeInTheDocument();
      expect(getByText(expectedContent)).toBeInTheDocument();
      expect(getByText('Done!')).toBeInTheDocument();
    });

    it('should render expected title and content, if status is APPROVED and type is EYR', () => {
      const newProps = {
        ...props,
        status: Status.APPROVED,
        review: ReviewType.EYR,
      };
      const { getByText } = render(<SuccessModal {...newProps} />);
      const expectedTitle = 'Approved objectives and / or reviews';
      const expectedContent = `You have approved your colleague's year-end review.`;

      expect(getByText(expectedTitle)).toBeInTheDocument();
      expect(getByText(expectedContent)).toBeInTheDocument();
      expect(getByText('Done!')).toBeInTheDocument();
    });
  });
});
