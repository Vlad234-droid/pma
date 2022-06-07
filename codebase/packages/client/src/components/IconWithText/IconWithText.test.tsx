import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import { IconWithText, WRAPPER_ID } from './IconWithText';
import { Graphics } from '../Icon';

describe('IconWithText component', () => {
  const props: { graphic: Graphics; text: string; onClick: () => void | undefined } = {
    text: 'mocked_text',
    graphic: 'person',
    onClick: jest.fn(),
  };
  it('it should render wrapper', () => {
    const { getByTestId } = render(<IconWithText {...props} />);
    const wrapper = getByTestId(WRAPPER_ID);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should fire onChange handler', async () => {
    const { getByTestId } = render(<IconWithText {...props} />);
    const wrapper = getByTestId(WRAPPER_ID);
    fireEvent.click(wrapper);
    expect(props.onClick).toHaveBeenCalled();
  });
  it('it should render text from props', () => {
    const { getByText } = render(<IconWithText {...props} />);
    const text = getByText(props.text);
    expect(text).toBeInTheDocument();
  });
});
