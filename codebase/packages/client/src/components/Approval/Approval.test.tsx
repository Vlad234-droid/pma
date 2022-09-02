import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Approval from './Approval';
import { TILE_WRAPPER } from 'components/Tile';

describe('Approval', () => {
  const onApprove = jest.fn();
  const onDecline = jest.fn();
  const props = {
    text: 'text',
    isActive: true,
    onApprove,
    onDecline,
  };

  it('it should render Approval wrapper', async () => {
    const { getByTestId } = render(<Approval {...props} />);
    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should render title', async () => {
    const { getByText } = render(<Approval {...props} />);
    const title = getByText(props.text);
    expect(title).toBeInTheDocument();
  });

  it('it should fire onApprove prop', async () => {
    const { getByText } = render(<Approval {...props} />);
    const button = getByText(/approve/i);
    fireEvent.click(button);
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('it should fire onDecline prop', async () => {
    const { getByText } = render(<Approval {...props} />);
    const button = getByText(/decline/i);
    fireEvent.click(button);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});
