// @ts-ignore
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Search from './Search';

describe('<Search />', () => {
  const props = {
    focus: true,
    onFocus: jest.fn(),
    onSearch: jest.fn(),
    value: 'mocked_value',
  };

  describe('#render', () => {
    it('should render correctly', () => {
      const { getByTestId } = render(<Search {...props} />);

      expect(getByTestId('search-wrapper')).toBeInTheDocument();
      expect(getByTestId('search')).toBeInTheDocument();
      expect(getByTestId('input-search')).toBeInTheDocument();
    });

    it('should render wide wrapper, if focus is true', () => {
      const { getByTestId } = render(<Search {...props} />);

      expect(getByTestId('search-wrapper')).toHaveStyle('width: 240px');
    });

    it('should render narrow wrapper, if !focus', () => {
      const newProps = {
        ...props,
        focus: false,
      };

      const { getByTestId } = render(<Search {...newProps} />);

      expect(getByTestId('search-wrapper')).toHaveStyle('width: 40px');
    });

    it('should render provided value, if focus is true', () => {
      const { getByTestId } = render(<Search {...props} />);

      expect((getByTestId('input-search') as HTMLInputElement).value).toBe('mocked_value');
    });

    it('should not render value, if !focus', () => {
      const newProps = {
        ...props,
        focus: false,
      };

      const { getByTestId } = render(<Search {...newProps} />);

      expect((getByTestId('input-search') as HTMLInputElement).value).toBe('');
    });
  });

  describe('#handlers', () => {
    it('should call props.onFocus on item focus', () => {
      const { getByTestId } = render(<Search {...props} />);

      fireEvent.focus(getByTestId('input-search'));
      expect(props.onFocus).toHaveBeenCalled();
    });

    it('should call props.onSearch on input change', () => {
      const { getByTestId } = render(<Search {...props} />);

      fireEvent.focus(getByTestId('input-search'));
      fireEvent.change(screen.getByTestId('input-search'), { target: { value: 'new_mocked_value' } });
      expect(props.onSearch).toHaveBeenCalled();
    });
  });
});
