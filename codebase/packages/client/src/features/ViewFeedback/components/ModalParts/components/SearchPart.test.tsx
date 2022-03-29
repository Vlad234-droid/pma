import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import SearchPart, { WRAPPER } from './SearchPart';

describe('Search', () => {
  const setValue = jest.fn();
  const props = {
    setValue,
    selectedColleague: { colleague: { profile: { firstName: '', lastName: '' } } },
    date: '',
  };
  it('render search wrapper', async () => {
    const { getByTestId } = render(<SearchPart {...props} />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call setValue handler', async () => {
    render(<SearchPart {...props} />);
    props.setValue();
    expect(props.setValue).toHaveBeenCalled();
  });
});
