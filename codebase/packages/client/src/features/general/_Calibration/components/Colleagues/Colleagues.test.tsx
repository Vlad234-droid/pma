// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import Colleagues from './Colleagues';

jest.mock('../EditRatingsModal', () => {
  return {
    __esModule: true,
    default: ({ onSave }) => {
      return <div onClick={onSave}>mocked_ratings_modal</div>;
    },
  };
});

jest.mock('features/general/MyTeam', () => {
  return {
    __esModule: true,
    TeamMateProfile: ({ onClick, rating }) => {
      return <div onClick={onClick}>{rating}</div>;
    },
    ColleagueInfo: () => {
      return <div>mocked_colleague_info</div>;
    },
  };
});

describe('<Colleagues />', () => {
  const props = {
    colleagues: [generateEmployeeReview()],
    editMode: false,
    onSave: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<Colleagues {...props} />);

      expect(getByTestId('calibration-colleagues')).toBeInTheDocument();
    });

    it('should render see more button', () => {
      const { getByText } = render(<Colleagues {...props} />);

      expect(getByText('See more')).toBeInTheDocument();
    });

    it('should render colleagues with ratings', () => {
      const { getByText } = render(<Colleagues {...props} />);

      expect(getByText('Outstanding')).toBeInTheDocument();
    });
  });
});
