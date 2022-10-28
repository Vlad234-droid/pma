import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import UnderlayModal, { UNDERLAY_WRAPPER } from './UnderlayModal';

describe('UnderlayModal', () => {
  const Children = ({ onClose }) => (
    <div>
      <button onClick={onClose} />
    </div>
  );
  const onClose = jest.fn();
  const props = {
    onClose,
    transitionDuration: 300,
  };
  it('it should render underlay modal', () => {
    const { getByTestId } = render(
      <UnderlayModal {...props}>{({ onClose: handleClose }) => <Children onClose={handleClose} />}</UnderlayModal>,
    );
    const wrapper = getByTestId(UNDERLAY_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
