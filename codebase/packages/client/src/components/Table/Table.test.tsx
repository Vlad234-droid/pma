import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import Table, { TABLE_WRAPPER } from './Table';

describe('Work level content', () => {
  const props = {
    currentItems: [
      {
        colleagueUuid: 'mocked_data',
        employeeNo: 'mocked_data',
        firstName: 'mocked_data',
        howAchieved: 'mocked_data',
        howOverAchieved: 'mocked_data',
        jobTitle: 'mocked_data',
        lastName: 'mocked_data',
        lineManager: 'mocked_data',
        objectiveNumber: 10,
        strategicDriver: 'mocked_data',
        title: 'mocked_data',
        workingLevel: 'mocked_data',
      },
    ],
    tableTitles: ['mocked_title'],
  };

  it('should render table wrapper', async () => {
    const { getByTestId } = render(<Table {...props} />);
    const wrapper = getByTestId(TABLE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('should show proper table title', async () => {
    const { getByText } = render(<Table {...props} />);
    const text = getByText(/mocked_title/i);
    expect(text).toBeInTheDocument();
    expect(text.textContent).toEqual(props.tableTitles[0]);
  });
});
