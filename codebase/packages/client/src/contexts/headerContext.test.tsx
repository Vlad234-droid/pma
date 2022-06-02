import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { HeaderProvider } from './headerContext';

describe('headerContext', () => {
  it('should render children', async () => {
    const { getByText } = render(
      <HeaderProvider>
        <div>Test children</div>
      </HeaderProvider>,
    );

    expect(getByText('Test children')).toBeInTheDocument();
  });
});
