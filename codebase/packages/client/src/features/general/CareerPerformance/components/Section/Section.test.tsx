// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Section from './Section';

describe('<Section />', () => {
  describe('#render', () => {
    const props = {
      title: <div>mocked_title</div>,
      children: <div>mocked_children</div>,
    };

    it('should render wrapper', () => {
      const { getByTestId } = render(<Section {...props} />);

      expect(getByTestId('section')).toBeInTheDocument();
    });

    it('should render passed title and children', () => {
      const { getByText } = render(<Section {...props} />);

      expect(getByText('mocked_title')).toBeInTheDocument();
      expect(getByText('mocked_children')).toBeInTheDocument();
    });
  });
});
