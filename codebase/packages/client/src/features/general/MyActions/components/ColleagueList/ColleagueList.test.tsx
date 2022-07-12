import React from 'react';

import { renderWithTheme as render } from 'utils/test';
import { Status } from 'config/enum';

import { ColleagueList } from './ColleagueList';

describe('<ColleagueList />', () => {
  const props = {
    status: Status.APPROVED,
    checkedItems: [],
    colleagues: [
      {
        uuid: '1111',
        timeline: ['11', '12'],
      },
      {
        uuid: '2222',
        timeline: [],
      },
    ],
    handleSelectItem: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper, if props.colleagues is not empty', () => {
      const { getByTestId } = render(<ColleagueList {...props} />);

      expect(getByTestId('colleague-list')).toBeInTheDocument();
      props.colleagues.forEach(({ uuid }) => {
        expect(getByTestId(`colleague-${uuid}`)).toBeInTheDocument();
      });
      props.colleagues.forEach(({ uuid }) => {
        expect(getByTestId(`colleague-wrapper-${uuid}`)).toBeInTheDocument();
      });
    });

    it('should not render wrapper, if props.colleagues is empty', () => {
      const newProps = {
        ...props,
        colleagues: [],
      };

      const { queryByTestId } = render(<ColleagueList {...newProps} />);

      expect(queryByTestId('colleague')).not.toBeInTheDocument();
      props.colleagues.forEach(({ uuid }) => {
        expect(queryByTestId(`colleague-wrapper-${uuid}`)).not.toBeInTheDocument();
      });
      props.colleagues.forEach(({ uuid }) => {
        expect(queryByTestId(`checkbox-${uuid}`)).not.toBeInTheDocument();
      });
    });

    it('should render checkbox for every colleague in the list, if status === Status.WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        status: Status.WAITING_FOR_APPROVAL,
      };

      const { getByTestId } = render(<ColleagueList {...newProps} />);

      newProps.colleagues.forEach(({ uuid }) => {
        expect(getByTestId(`checkbox-${uuid}`)).toBeInTheDocument();
      });
    });

    it('should render checkbox disabled, if timeline.length > 1', () => {
      const newProps = {
        ...props,
        status: Status.WAITING_FOR_APPROVAL,
      };

      const { getByTestId } = render(<ColleagueList {...newProps} />);

      expect(getByTestId(`1111`)).toHaveAttribute('disabled');
    });

    it('should render checkbox checked, if checkedItems.includes(colleague.uuid)', () => {
      const newProps = {
        ...props,
        status: Status.WAITING_FOR_APPROVAL,
        checkedItems: ['2222'],
      };

      const { getByTestId } = render(<ColleagueList {...newProps} />);

      expect(getByTestId(`2222`)).toHaveAttribute('checked');
    });
  });
});
