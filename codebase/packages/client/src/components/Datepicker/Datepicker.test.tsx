// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from '../../utils/test';

import Datepicker, { TEST_ID, INPUT_TEST_ID } from './Datepicker';

jest.mock('lodash.debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  }),
);

describe('Datepicker', () => {
  it('Datepicker render correctly', () => {
    const { getByTestId } = render(<Datepicker onChange={jest.fn()} />);
    const datepicker = getByTestId(TEST_ID);
    expect(datepicker).toBeInTheDocument();
  });

  it('should onChange called correct time', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Datepicker onChange={onChange} />);
    const value = '12/12/2022';
    const input = getByTestId(INPUT_TEST_ID).firstChild;
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledTimes(1);
  });

  it('should onChange with correct value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Datepicker onChange={onChange} />);
    const value = '12/12/2022';
    const input = getByTestId(INPUT_TEST_ID).firstChild;
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledWith(new Date(value));
  });
});
