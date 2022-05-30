import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import WistiaPlayer, { IFRAME_ID, TEST_ID } from './WistiaPlayer';

describe('WistiaPlayer feature', () => {
  it('should render wrapper', async () => {
    const { queryByTestId } = render(<WistiaPlayer videoId={'test-video-id'} aspectRatio={256} />);

    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render iframe', async () => {
    const { queryByTestId } = render(<WistiaPlayer videoId={'test-video-id'} aspectRatio={256} />);

    const iframe = queryByTestId(IFRAME_ID);
    expect(iframe).toBeInTheDocument();
  });
});
