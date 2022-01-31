// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import Colleagues from './Colleagues';
import {screen} from "../../../../utils/test";

jest.mock('features/MyTeam', () => {
  return {
    __esModule: true,
    WidgetTeamMateProfile: ({ onClick, rating }) => {
      return <div onClick={onClick}>{rating}</div>;
    },
    ColleagueInfo: () => {
      return <div>mocked_colleague_info</div>;
    }
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

  describe('#handlers', () => {
    it('should not render edit ratings modal, if !editMode', () => {
      const { getByText, queryByTestId } = render(<Colleagues {...props} />);

      fireEvent.click(getByText('Outstanding'));

      expect(queryByTestId('edit-rating-modal')).not.toBeInTheDocument();
    });

    it('should render edit ratings modal, if editMode and hide it on close', () => {
      const newProps = {
        ...props,
        editMode: true,
      };

      const { getByText, getByTestId, queryByTestId } = render(<Colleagues {...newProps} />);

      fireEvent.click(getByText('Outstanding'));

      expect(getByTestId('edit-rating-modal')).toBeInTheDocument();

      fireEvent.click(getByText('Cancel'));

      expect(queryByTestId('edit-rating-modal')).not.toBeInTheDocument();
    });

    it('should', () => {
      const newProps = {
        ...props,
        editMode: true,
      };

      const { getByText, getByTestId, queryByTestId } = render(<Colleagues {...newProps} />);

      fireEvent.click(getByText('Outstanding'));

      expect(getByTestId('edit-rating-modal')).toBeInTheDocument();

      const selectWhat = (screen.getByTestId('declineReasonWhat'));
      const selectHow = (screen.getByTestId('declineReasonHow'));

      fireEvent.change(selectWhat, { target: { value: 'Great' } });
      fireEvent.change(selectHow, { target: { value: 'Satisfactory' } });

      fireEvent.click(getByText('Save change'));

      expect(props.onSave).toHaveBeenCalled();
      expect(queryByTestId('edit-rating-modal')).not.toBeInTheDocument();
      expect(getByText('Satisfactory')).toBeInTheDocument();
    })
  });
});
