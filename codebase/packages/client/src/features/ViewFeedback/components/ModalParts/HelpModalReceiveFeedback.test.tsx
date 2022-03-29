import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import HelpModalReceiveFeedback, { WRAPPER } from './HelpModalReceiveFeedback';

describe('Receive feedback modal', () => {
  const setHelpModalReceiveFeedback = jest.fn();
  const props = {
    setHelpModalReceiveFeedback,
  };
  it('render help wrapper', async () => {
    const { getByTestId } = render(<HelpModalReceiveFeedback {...props} />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call setHelpModalReceiveFeedback handler', async () => {
    render(<HelpModalReceiveFeedback {...props} />);
    setHelpModalReceiveFeedback();
    expect(setHelpModalReceiveFeedback).toHaveBeenCalled();
  });
});
