// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
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

jest.mock('features/MyTeam', () => {
  return {
    __esModule: true,
    WidgetTeamMateProfile: ({ onClick, rating }) => {
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

      expect(getByText('outstanding')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should not render edit ratings modal, if !editMode', () => {
      const { getByText, queryByText } = render(<Colleagues {...props} />);

      fireEvent.click(getByText('outstanding'));

      expect(queryByText('mocked_ratings_modal')).not.toBeInTheDocument();
    });

    it('should render edit ratings modal, if editMode', () => {
      const newProps = {
        ...props,
        editMode: true,
      };

      const { getByText } = render(<Colleagues {...newProps} />);

      fireEvent.click(getByText('outstanding'));

      expect(getByText('mocked_ratings_modal')).toBeInTheDocument();
    });
  });
});
