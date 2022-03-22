import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import LeftsideMenuItem from './LeftsideMenuItem';

describe('<LeftsideMenuItem />', () => {
  it('render LeftsideMenuItem element exist', async () => {
    const { getByAltText } = render(<LeftsideMenuItem name={'name'} imgUrl={'imgUrl'} />);
    const image = getByAltText('imgUrl');
    const name = screen.getByText(/name/i);
    const counter = screen.queryByTestId('NOTIFY_COUNTER');

    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(counter).not.toBeInTheDocument();
  });

  it('render LeftsideMenuItem all element exist', async () => {
    const { getByAltText } = render(<LeftsideMenuItem name={'name'} imgUrl={'imgUrl'} notifyCount={3} />);
    const image = getByAltText('imgUrl');
    const name = screen.getByText(/name/i);
    const counter = screen.getByTestId('NOTIFY_COUNTER');

    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
    expect(counter.textContent).toEqual('3');
  });
});
