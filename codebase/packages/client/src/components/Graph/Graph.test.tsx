import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import Graph, { BAR_WRAPPER } from './Graph';

import { Rating } from 'config/enum';

describe('Graph', () => {
  const props = {
    title: 'Graph title',
    currentData: {
      title: 'title',
      ratings: {
        [Rating.OUTSTANDING]: 12,
        [Rating.GREAT]: 12,
        [Rating.SATISFACTORY]: 12,
        [Rating.BELOW_EXPECTED]: 12,
      },
    },
  };

  it('it should render Graph container', () => {
    const { getByTestId } = render(<Graph {...props} />);
    const wrapper = getByTestId(BAR_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should render graph title', async () => {
    const { getByText } = render(<Graph {...props} />);
    const title = getByText(props.title);
    expect(title).toBeInTheDocument();
  });
});
