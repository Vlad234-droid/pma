import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import { renderWithTheme as render } from '../../utils/test';

import Datepicker, { TEST_ID, INPUT_TEST_ID } from './Datepicker';

describe('Datepicker', () => {
  afterEach(cleanup);
  const onChange = jest.fn();

  it('Datepicker render correctly', () => {
    const { getByTestId } = render(<Datepicker onChange={onChange} />);
    const datepicker = getByTestId(TEST_ID);
    expect(datepicker).toBeInTheDocument();
  });

  it('should onChange work correct', () => {
    const { getByTestId } = render(<Datepicker onChange={onChange} />);
    const value = '12/12/2022';
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledTimes(1);
  });

  it('should onChange with correct value', () => {
    const { getByTestId } = render(<Datepicker onChange={onChange} />);
    const value = '12/12/2022';
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledWith(new Date(value));
  });
});
