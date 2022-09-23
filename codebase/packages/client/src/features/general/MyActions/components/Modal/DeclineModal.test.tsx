// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';
// @ts-ignore
import { ReviewType } from 'config/types';

import DeclineModal from './DeclineModal';

describe('<DeclineModal />', () => {
  const props = {
    onClose: jest.fn(),
    onSave: jest.fn(),
    review: generateEmployeeReview(),
    code: ReviewType.MYR,
  };

  describe('#render', () => {
    it('should render title', () => {
      const { getByText } = render(<DeclineModal {...props} />);

      expect(getByText('Decline reason')).toBeInTheDocument();
    });

    it('should render simple content, if reviewType is not Objective', () => {
      const { getByText } = render(<DeclineModal {...props} />);

      expect(
        getByText(
          "Done, you’ve rejected this form as it doesn't reflect the conversation you had with your colleague. Please pick up with them directly to discuss more.",
        ),
      ).toBeInTheDocument();
    });

    it('should render select, if reviewType is Objective', () => {
      const newProps = {
        ...props,
        code: ReviewType.OBJECTIVE,
      };

      const { getByText } = render(<DeclineModal {...newProps} />);

      expect(getByText('You’ve rejected your colleague’s objectives because they were not:')).toBeInTheDocument();
    });
  });
});
