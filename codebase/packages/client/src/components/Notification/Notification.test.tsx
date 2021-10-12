import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import Notification from './Notification';

describe('Notification', () => {
  const testHandler = jest.fn();
  const text = 'Test notification';

  it('should render Notification', async () => {
    const { queryByText } = render(<Notification graphic='information' iconColor='pending' text={text} />);

    const notification = queryByText(text);
    expect(notification).toBeInTheDocument();
    expect(testHandler).not.toHaveBeenCalled();
  });

  it('while click on back btn', async () => {
    const { queryByRole, queryByText } = render(
      <Notification graphic='information' iconColor='pending' text={text} onClick={testHandler} />,
    );

    const notification = queryByText(text);
    const notificationButton = queryByRole('button');
    fireEvent.click(notificationButton);

    expect(notification).not.toBeInTheDocument();
    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
