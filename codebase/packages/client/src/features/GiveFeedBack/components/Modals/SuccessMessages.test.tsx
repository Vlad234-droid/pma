import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import SuccessMessage, { SUCCESS_WRAPPER } from './SuccessMessage';

describe('SuccessMessage', () => {
  const onSuccess = jest.fn();
  const props = {
    selectedColleagueUuid: '',
    onSuccess,
  };

  it('it should render success wrapper', () => {
    const { getByTestId } = render(<SuccessMessage {...props} />);
    const wrapper = getByTestId(SUCCESS_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onSuccess handler', () => {
    const { getByRole } = render(<SuccessMessage {...props} />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
