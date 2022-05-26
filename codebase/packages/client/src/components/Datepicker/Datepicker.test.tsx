// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import { formatDateStringFromISO, DATE_FORMAT } from 'utils';

import Datepicker, { TEST_ID, INPUT_TEST_ID, buildTargetObject } from './Datepicker';

jest.mock('lodash.debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  }),
);

describe('Datepicker', () => {
  it('Datepicker render correctly', () => {
    const { getByTestId } = render(<Datepicker name='test' onChange={jest.fn()} />);
    const datepicker = getByTestId(TEST_ID);
    expect(datepicker).toBeInTheDocument();
  });

  it('should onChange called correct time', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Datepicker name='test' onChange={onChange} />);
    const value = '12/12/2022';
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledTimes(1);
  });

  it('should onChange with correct value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Datepicker name='test' onChange={onChange} />);
    const value = '12/12/2022';
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledWith({
      target: { name: 'test', type: 'date', value: value.split('/').reverse().join('-') },
    });
  });

  it('should onChange with empty value', () => {
    const onChange = jest.fn();
    const name = 'test';
    const value = '12/12/2022';
    const { getByTestId } = render(<Datepicker name={name} onChange={onChange} value={value} />);
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toBeCalledWith({
      target: { name: 'test', type: 'date', value: '' },
    });
  });

  it('should onError when user enter invalid date', () => {
    const onError = jest.fn();
    const onChange = jest.fn();
    const { getByTestId } = render(<Datepicker name='test' onError={onError} onChange={onChange} />);
    const value = '12/12/202';
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onError).toBeCalledTimes(1);
    expect(onChange).not.toBeCalled();
  });

  it('should onError when user enter date less then minDate', () => {
    const onError = jest.fn();
    const onChange = jest.fn();

    const minDate = new Date('12/12/2022');
    const { getByTestId } = render(<Datepicker name='test' onError={onError} onChange={onChange} minDate={minDate} />);
    const value = '11/12/2022';
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onError).toBeCalledTimes(1);
    expect(onChange).not.toBeCalled();
  });

  it('should change date when user enter day biggest max day', () => {
    const onChange = jest.fn();
    const name = 'test';
    const value = '31/02/2022';
    const date = new Date('2022-02-31');
    const { getByTestId } = render(<Datepicker name={name} onChange={onChange} />);
    const input = getByTestId(INPUT_TEST_ID);
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalledWith(buildTargetObject(formatDateStringFromISO(date.toISOString(), DATE_FORMAT), name));
  });
});
