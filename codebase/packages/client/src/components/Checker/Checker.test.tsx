import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import { Checker } from './Checker';
import { initialState } from './utils';

describe('Checker', () => {
  const Children = ({ active }) => <div>{active}</div>;
  const onChange = jest.fn();
  const props = {
    onChange,
    visible: true,
    options: [{ name: initialState, text: 'text' }],
    Children,
  };

  it('it should render radio group', () => {
    const { getByRole } = render(<Checker {...props}>{({ active }) => <Children active={active} />}</Checker>);
    const radio = getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('radio should be checked', () => {
    const { getByRole } = render(<Checker {...props}>{({ active }) => <Children active={active} />}</Checker>);
    const radio = getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('it should render radio description', () => {
    const { getByText } = render(<Checker {...props}>{({ active }) => <Children active={active} />}</Checker>);
    const text = getByText(props.options[0].text);
    expect(text).toBeInTheDocument();
  });
});
