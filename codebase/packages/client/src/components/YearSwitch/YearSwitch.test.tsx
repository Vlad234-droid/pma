import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import YearSwitch, { TEST_ID, TEST_LABEL } from './YearSwitch';
import { getCurrentYear } from 'utils';

describe('YearSwitch component', () => {
  const onChange = jest.fn();
  const props = { currentYear: getCurrentYear(), onChange };
  it('it should render YearSwitch component', async () => {
    const { getByTestId } = render(<YearSwitch {...props} />);
    const wrapper = getByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
  it('current year should be active', async () => {
    const { getByTestId } = render(<YearSwitch {...props} />);
    const current = getByTestId(getCurrentYear());
    expect((current as HTMLInputElement).checked).toEqual(true);
  });
  it('it should fire onChange handler', async () => {
    const { getByTestId } = render(<YearSwitch {...props} />);
    const previous = getByTestId(Number(getCurrentYear()) - 1);
    expect(previous).toBeInTheDocument();
    fireEvent.click(previous);
    expect(onChange).toHaveBeenCalled();
  });

  it('should render description text', async () => {
    const { queryByText } = render(<YearSwitch currentYear={getCurrentYear()} onChange={onChange} />);

    const desc = queryByText('Display objectives for:');
    expect(desc).toBeInTheDocument();
  });

  it('should render label', async () => {
    const { getAllByTestId } = render(<YearSwitch currentYear={getCurrentYear()} onChange={onChange} />);

    const label = getAllByTestId(TEST_LABEL);
    expect(label[0]).toBeInTheDocument();
  });
});
