import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import ColleaguesFinder, { TEST_ID } from './ColleaguesFinder';
import { fireEvent } from '@testing-library/react';

describe('Colleague finder', () => {
  const onSelect = jest.fn();
  const props = {
    onSelect,
    value: 'mocked_value',
    multiple: false,
    selected: [],
  };
  it('render give colleague finder wrapper', async () => {
    const { getByTestId } = render(<ColleaguesFinder {...props} />);
    const wrapper = getByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should display value', async () => {
    const { getByTestId } = render(<ColleaguesFinder {...props} onSelect={onSelect} />);
    const input = getByTestId('search_option');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'mocked_value' } });
    //@ts-ignore
    expect(input.value).toBe('mocked_value');
  });
});
