// @ts-ignore
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { LINKS } from 'config/constants';

import HelpWidgets from './HelpWidgets';

jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    Link: ({ children }) => {
      return <div>{children}</div>;
    },
  };
});

describe('<HelpWidgets />', () => {
  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<HelpWidgets />);

      expect(getByTestId('help-widgets')).toBeInTheDocument();
    });

    it('should render tiles', () => {
      const { getByTestId, getByText } = render(<HelpWidgets />);

      expect(getByTestId('question-tile')).toBeInTheDocument();
      expect(getByTestId('question')).toBeInTheDocument();
      expect(getByText('Want to learn more about Your Contribution at Tesco?')).toBeInTheDocument();
    });
  });
});
