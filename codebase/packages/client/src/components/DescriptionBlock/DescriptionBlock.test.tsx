import React from 'react';
import { renderWithTheme as render } from 'utils/test';

import DescriptionBlock from './DescriptionBlock';

describe('<DescriptionBlock />', () => {
  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<DescriptionBlock />);

      expect(getByTestId('description-block')).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = render(<DescriptionBlock>mocked_children</DescriptionBlock>);

      expect(getByText('mocked_children')).toBeInTheDocument();
    });

    it('should apply styles, if they are passed', () => {
      const { getByTestId } = render(<DescriptionBlock style={{ background: 'red' }} />);

      expect(getByTestId('description-block')).toHaveStyle('background: red');
    });
  });
});
