// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Spinner from './Spinner';

describe('<Spinner />', () => {
  describe('#render', () => {
    it('should render spinner and text by default', () => {
      const { getByTestId, getByText } = render(<Spinner />);

      expect(getByTestId('spinner-wrapper')).toBeInTheDocument();
      expect(getByTestId('spinner-wrapper')).toHaveStyle('height: auto');
      expect(getByTestId('spinner-1')).toBeInTheDocument();
      expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('should not render text, if !props.withText', () => {
      const props = {
        withText: false,
      };

      const { queryByText } = render(<Spinner {...props} />);

      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('should render spinner with correct id', () => {
      const props = {
        id: '12',
      };

      const { getByTestId } = render(<Spinner {...props} />);

      expect(getByTestId('spinner-12')).toBeInTheDocument();
    });

    it('should render wrapper with correct height', () => {
      const props = {
        fullHeight: true,
      };

      const { getByTestId } = render(<Spinner {...props} />);

      expect(getByTestId('spinner-wrapper')).toHaveStyle('height: 50vh');
    });

    it('should render initial position', () => {
      const { getByTestId } = render(<Spinner />);

      expect(getByTestId('spinner-1')).toHaveStyle('transform: rotate(0deg)');
    });

    it('should render rotated position', () => {
      jest.useFakeTimers();

      const { getByTestId } = render(<Spinner />);
      jest.advanceTimersByTime(300);
      expect(getByTestId('spinner-1')).toHaveStyle('transform: rotate(90deg)');

      jest.advanceTimersByTime(850);

      expect(getByTestId('spinner-1')).toHaveStyle('transform: rotate(0deg)');
    });
  });
});
