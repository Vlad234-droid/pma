import React from 'react';

import { renderWithTheme as render } from 'utils/test';

import HistoryTable from './HistoryTable';

describe('<HistoryTable />', () => {
  it('should not return wrapper, if items.length < 1', () => {
    const props = {
      items: [],
      headers: ['mocked_header_1', 'mocked_header_2'],
      isVisible: true,
    };

    const { queryByTestId } = render(<HistoryTable {...props} />);

    expect(queryByTestId('history-table')).not.toBeInTheDocument();
  });

  it('should return wrapper and item data, if items.length === 1', () => {
    const props = {
      items: [
        {
          updatedTime: new Date(2022, 11, 17, 12, 10, 23, 47),
          updatedBy: {
            firstName: 'mocked_first_name',
            lastName: 'mocked_last_name',
          },
          action: 'mocked_action',

        },
      ],
      headers: ['mocked_header_1', 'mocked_header_2'],
      isVisible: true,
    };

    const { getByTestId, getByText } = render(<HistoryTable {...props} />);

    expect(getByTestId('history-table')).toBeInTheDocument();
    expect(getByText('mocked_header_1')).toBeInTheDocument();
    expect(getByText('mocked_header_2')).toBeInTheDocument();
    expect(getByText('mocked_first_name mocked_last_name')).toBeInTheDocument();
    expect(getByText('mocked_action')).toBeInTheDocument();
    expect(getByText('17/12/2022 at 12:10')).toBeInTheDocument();
  });

  it('should return wrapper and item data, if items.length > 1', () => {
    const props = {
      items: [
        {
          updatedTime: new Date(2022, 11, 17, 12, 10, 23, 47),
          updatedBy: {
            firstName: 'mocked_first_name',
            lastName: 'mocked_last_name',
          },
          action: 'mocked_action',

        },

        {
          updatedTime: new Date(2021, 11, 17, 12, 10, 23, 47),
          action: 'mocked_action_another',

        },
      ],
      headers: ['mocked_header_1', 'mocked_header_2'],
      isVisible: true,
    };

    const { getByTestId, getByText } = render(<HistoryTable {...props} />);

    expect(getByTestId('history-table')).toBeInTheDocument();
    expect(getByText('mocked_header_1')).toBeInTheDocument();
    expect(getByText('mocked_header_2')).toBeInTheDocument();
    expect(getByText('mocked_first_name mocked_last_name')).toBeInTheDocument();
    expect(getByText('mocked_action')).toBeInTheDocument();
    expect(getByText('mocked_action_another')).toBeInTheDocument();
    expect(getByText('17/12/2022 at 12:10')).toBeInTheDocument();
    expect(getByText('17/12/2021 at 12:10')).toBeInTheDocument();
  });

  it('should hide wrapper, if !isVisible', () => {
    const props = {
      items: [
        {
          updatedTime: new Date(2022, 11, 17, 12, 10, 23, 47),
          updatedBy: {
            firstName: 'mocked_first_name',
            lastName: 'mocked_last_name',
          },
          action: 'mocked_action',

        },
      ],
      headers: ['mocked_header_1', 'mocked_header_2'],
      isVisible: false,
    };

    const { getByTestId } = render(<HistoryTable {...props} />);

    expect(getByTestId('history-table')).toHaveStyle('display: none');
  });
});
