import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Details from './Details';

describe('<Details />', () => {
  it('render Details element exist', async () => {
    render(<Details title={'TEST_TITLE'} description={'TEST_DESCRIPTION'} />);

    const title = screen.getByText(/TEST_TITLE/i);
    const description = screen.getByText(/TEST_DESCRIPTION/i);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('ender Details element click', async () => {
    const { getByAltText } = render(<Details title={'TEST_TITLE'} description={'TEST_DESCRIPTION'} />);

    const title = screen.getByText(/TEST_TITLE/i);
    const image = getByAltText('arrow');
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle('transform: rotate(0deg)');
    fireEvent.click(title);
    expect(image).toHaveStyle('transform: rotate(180deg)');
  });
});
