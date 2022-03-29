import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import SuccessModal, { WRAPPER } from './SuccessModal';

describe('Success  modal', () => {
  const onSuccess = jest.fn();
  const props = {
    onSuccess,
  };
  it('render success wrapper', async () => {
    const { getByTestId } = render(<SuccessModal {...props} />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onSuccess handler', async () => {
    render(<SuccessModal {...props} />);
    onSuccess();
    expect(onSuccess).toHaveBeenCalled();
  });
});
