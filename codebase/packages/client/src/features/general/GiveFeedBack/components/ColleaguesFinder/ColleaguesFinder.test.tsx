import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import ColleaguesFinder from './ColleaguesFinder';

describe('Colleague finder', () => {
  const onSelect = jest.fn();
  const props = {
    onSelect,
    error: 'This field is required',
    value: '🐽',
  };
  it('render give feedback wrapper', async () => {
    const { getByTestId } = render(<ColleaguesFinder {...props} />);
    const wrapper = getByTestId('search-part');
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onSelect handler', async () => {
    render(<ColleaguesFinder {...props} />);
    props.onSelect({});
    expect(await props.onSelect).toBeCalled();
  });
  it('it should show error message', async () => {
    render(<ColleaguesFinder {...props} />);
    expect(props.error).toEqual('This field is required');
  });
  it('it should receive propper value', async () => {
    render(<ColleaguesFinder {...props} />);
    expect(props.value).toEqual('🐽');
  });
});
