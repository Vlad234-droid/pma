// @ts-ignore
import React from 'react';
import { Rule } from '@dex-ddl/core';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Resources from './Resources';

jest.mock('images/Contribution.jpg', () => {
  return 'Contribution';
});
jest.mock('images/Check.jpg', () => {
  return 'Check';
});
jest.mock('images/Feedback.jpg', () => {
  return 'Feedback';
});
jest.mock('images/Learning.jpg', () => {
  return 'Learning';
});

describe('<Resources />', () => {
  describe('#render', () => {
    const padding: Rule = { padding: '1px' };
    const props = {
      basicTileStyle: padding,
    };

    it('should render expected components', () => {
      const { getByTestId } = render(<Resources {...props} />);

      expect(getByTestId('personal-contribution')).toBeInTheDocument();
      expect(getByTestId('personal-conversation')).toBeInTheDocument();
      expect(getByTestId('feedback')).toBeInTheDocument();
      expect(getByTestId('learning')).toBeInTheDocument();
    });
  });
});
