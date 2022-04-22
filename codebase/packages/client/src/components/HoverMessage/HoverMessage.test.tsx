import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import HoverMessage, { MESSAGE_WRAPPER } from './HoverMessage';

describe('HoverMessage', () => {
  const props = {
    text: 'mocked_text',
  };

  it('it should render HoverMessage wrapper', async () => {
    const { getByTestId } = render(<HoverMessage {...props} />);
    const wrapper = getByTestId(MESSAGE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should render proper text', () => {
    const { getByText } = render(<HoverMessage {...props} />);
    const text = getByText(/mocked_text/i);
    expect(text).toBeInTheDocument();
  });
});
