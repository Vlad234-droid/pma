import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { Plug, TEST_NOTIFICATION } from './Plug';

describe('Plug component', () => {
  const props = {
    text: 'Test text',
    closable: true,
  };

  it('should render Notification', async () => {
    const { queryByTestId } = render(<Plug {...props} />);

    const notification = queryByTestId(TEST_NOTIFICATION);
    expect(notification).toBeInTheDocument();
  });

  it('should render Notification Text', async () => {
    const { getByText } = render(<Plug {...props} />);

    const notificationText = getByText('Test text');
    expect(notificationText).toBeInTheDocument();
  });
});
