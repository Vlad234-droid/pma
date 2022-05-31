import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import YearSwitch, { TEST_ID, TEST_LABEL } from './YearSwitch';

describe('YearSwitch feature', () => {
  const onChange = jest.fn();
  it('should render wrapper', async () => {
    const { queryByTestId } = render(<YearSwitch currentYear={'2022'} onChange={onChange} />);

    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render description text', async () => {
    const { queryByText } = render(<YearSwitch currentYear={'2022'} onChange={onChange} />);

    const desc = queryByText('Display objectives for:');
    expect(desc).toBeInTheDocument();
  });

  it('should render label', async () => {
    const { getAllByTestId } = render(<YearSwitch currentYear={'2022'} onChange={onChange} />);

    const label = getAllByTestId(TEST_LABEL);
    expect(label[0]).toBeInTheDocument();
  });
});
