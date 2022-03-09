import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import InfoMassage from './InfoMassage';
import { fireEvent, waitFor } from '@testing-library/react';
import { MESSAGE_WRAPPER, GO_BACK } from './InfoMassage';

describe('Info message container', () => {
  const handler = jest.fn();

  it('it should render message', () => {
    const { getByTestId } = render(<InfoMassage goBack={handler} />);
    const wrapper = getByTestId(MESSAGE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should close message modal', async () => {
    const { getByTestId, queryByTestId } = render(<InfoMassage goBack={handler} />);
    const goBackBtn = getByTestId(GO_BACK);
    fireEvent.click(goBackBtn);
    const wrapper = queryByTestId(MESSAGE_WRAPPER);
    await waitFor(() => expect(wrapper).toBeInTheDocument());
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
  });
});
