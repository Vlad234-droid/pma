import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import InfoBlock, { WRAPPER_ID } from './InfoBlock';

describe('InfoBlock', () => {
  const props = {
    text: 'text',
  };

  it('it should render InfoBlock content', async () => {
    const { getByTestId, getByText } = render(<InfoBlock {...props} />);
    const wrapper = getByTestId(WRAPPER_ID);
    const text = getByText(props.text);
    expect(wrapper).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
