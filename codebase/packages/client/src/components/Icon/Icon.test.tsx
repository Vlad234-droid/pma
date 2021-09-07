import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as themeRender } from 'utils/test';

import { Icon } from './Icon';

describe('Icon', () => {
  it('should have accessible name - if title not set', () => {
    const { getByTestId } = themeRender(<Icon testId='icon' graphic='add' />);

    const icon = getByTestId('icon');

    expect(icon).toHaveAccessibleName('Add');
  });

  it('should have accessible name - if title set', () => {
    const { getByTestId } = themeRender(<Icon testId='icon' title='Back to homepage' graphic='add' />);

    const icon = getByTestId('icon');

    expect(icon).toHaveAccessibleName('Back to homepage');
  });
});
