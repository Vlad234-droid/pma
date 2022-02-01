// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  const props = {
    isOpen: false,
    onClose: jest.fn(),
    children: <div>mocked_children</div>,
    title: 'mocked_title',
  };
  describe('#render', () => {
    it('should render sidebar', () => {
      const { getByTestId } = render(<Sidebar {...props} />);

      expect(getByTestId('sidebar')).toBeInTheDocument();
    });

    it('should render styles transform: scaleY(0) on wrapper, if !props.isOpen', () => {
      const { getByTestId } = render(<Sidebar {...props} />);

      expect(getByTestId('sidebar')).toHaveStyle('transform: scaleY(0)');
    });

    it('should render styles transform: scaleY(1) on wrapper, if props.isOpen', () => {
      const newProps = {
        ...props,
        isOpen: true,
      };
      const { getByTestId } = render(<Sidebar {...newProps} />);

      expect(getByTestId('sidebar')).toHaveStyle('transform: scaleY(1)');
    });

    it('should render title and children', () => {
      const { getByText } = render(<Sidebar {...props} />);

      expect(getByText('mocked_title')).toBeInTheDocument();
      expect(getByText('mocked_children')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClose on button click', () => {
      const { getByRole } = render(<Sidebar {...props} />);

      const button = getByRole('button');

      fireEvent.click(button);

      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
