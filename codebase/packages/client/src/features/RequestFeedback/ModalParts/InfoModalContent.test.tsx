import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import InfoModalContent, { WRAPPER } from './InfoModalContent';

describe('info modal component', () => {
  const onClose = jest.fn();
  const props = {
    onClose,
  };
  it('render info wrapper', async () => {
    const { getByTestId } = render(<InfoModalContent {...props} />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onClose handler', async () => {
    render(<InfoModalContent {...props} />);
    onClose();
    expect(onClose).toHaveBeenCalled();
  });
});
