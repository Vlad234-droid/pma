import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import InfoMassage, { MESSAGE_WRAPPER } from './InfoMassage';

describe('Info message', () => {
  const goBack = jest.fn();
  const props = {
    goBack,
  };

  it('it should render info wrapper', () => {
    const { getByTestId } = render(<InfoMassage {...props} />);
    const wrapper = getByTestId(MESSAGE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call goBack handler', () => {
    const { getByRole } = render(<InfoMassage {...props} />);
    const wrapper = getByRole('button');
    fireEvent.click(wrapper);
    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
