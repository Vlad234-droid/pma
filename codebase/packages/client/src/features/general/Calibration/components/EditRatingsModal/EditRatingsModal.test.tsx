// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import EditRatingsModal from './EditRatingsModal';

jest.mock('features/general/MyTeam', () => {
  return {
    __esModule: true,
    ColleagueInfo: () => {
      return <div>mocked_colleague_info</div>;
    },
  };
});

describe('<EditRatingsModal />', () => {
  const props = {
    employee: generateEmployeeReview(),
    onClose: jest.fn(),
    onSave: jest.fn(),
  };

  describe('#render', () => {
    it('should render edit ratings modal', () => {
      const { getByTestId } = render(<EditRatingsModal {...props} />);

      expect(getByTestId('edit-rating-modal')).toBeInTheDocument();
    });

    it('should render title', () => {
      const { getByText } = render(<EditRatingsModal {...props} />);

      expect(getByText('Edit calibration')).toBeInTheDocument();
    });

    it('should render save button', () => {
      const { getByText } = render(<EditRatingsModal {...props} />);

      expect(getByText('Save change')).toBeInTheDocument();
    });

    it('should render ColleagueInfo', () => {
      const { getByText } = render(<EditRatingsModal {...props} />);

      expect(getByText('mocked_colleague_info')).toBeInTheDocument();
    });

    it('should render selects what and how and overall ratings', () => {
      const { getByText } = render(<EditRatingsModal {...props} />);

      expect(getByText(`Select your colleague's 'What' rating`)).toBeInTheDocument();
      expect(getByText(`Select your colleague's 'How' rating`)).toBeInTheDocument();
      expect(getByText(`Your colleague's overall rating is:`)).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClose on close button click', () => {
      const { getByText } = render(<EditRatingsModal {...props} />);

      fireEvent.click(getByText('Cancel'));

      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
