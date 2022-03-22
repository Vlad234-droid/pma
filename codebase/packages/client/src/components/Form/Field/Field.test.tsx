import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Field from './Field';
import { Input } from '../Input';
import { Radio } from '../Radio';
import { Item } from '../Item';

describe('<Field />', () => {
  let consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });
  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('render Field with element Input without wrapper', async () => {
    const onChange = jest.fn();
    const setValue = jest.fn();
    render(<Field Element={Input} name={'TEST_ID'} onChange={onChange} setValue={setValue} />);
    const input = screen.getByTestId('TEST_ID');
    expect(input).toBeInTheDocument();
    input.focus();
    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
    });
    expect(onChange).toBeCalledTimes(1);
    expect(setValue).toBeCalledWith('TEST_ID', 't', { shouldDirty: true, shouldValidate: true });
  });

  it('render Field with element Input with wrapper', async () => {
    const onChange = jest.fn();
    const setValue = jest.fn();
    render(
      <Field
        label={'test_label'}
        Wrapper={Item}
        Element={Input}
        name={'TEST_ID'}
        onChange={onChange}
        setValue={setValue}
      />,
    );
    const label = screen.getByText('test_label');
    const input = screen.getByTestId('TEST_ID');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    input.focus();
    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
    });
    expect(onChange).toBeCalledTimes(1);
    //TODO: should delete in future
    expect(setValue).toBeCalledWith('TEST_ID', 't', { shouldDirty: true, shouldValidate: true });
  });

  it('render Field with element Radio without wrapper', async () => {
    const onChange = jest.fn();
    const setValue = jest.fn();
    render(<Field Element={Radio} name={'TEST_ID'} onChange={onChange} setValue={setValue} />);
    const radio = screen.getByTestId('TEST_ID');
    expect(radio).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(radio);
    });

    expect(onChange).toBeCalledWith({ target: { name: 'TEST_ID', value: true } });
    //TODO: should delete in future
    expect(setValue).toBeCalledWith('TEST_ID', true, { shouldDirty: true, shouldValidate: true });
  });
});
