import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import { Subtitle, TITLE_CONTAINER } from './Subtitle';
import { Graphics } from '../Icon';

describe('Subtitle', () => {
  const props = {
    invertColors: true,
    graphic: 'add' as Graphics,
  };
  it('it should render container', () => {
    const { getByTestId } = render(
      <Subtitle {...props}>
        <div>children</div>
      </Subtitle>,
    );
    const container = getByTestId(TITLE_CONTAINER);
    expect(container).toBeInTheDocument();
  });
});
