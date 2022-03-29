import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import RadioBtns, { RADIO_WRAPPER } from './RadioBtns';

describe('Radio buttons', () => {
  const setStatus = jest.fn();
  const setFilterModal = jest.fn();

  const props = {
    status: 'PENDING',
    setStatus,
    setFilterModal,
    filterModal: false,
  };
  it('should render radio wrapper', async () => {
    const { getByTestId } = render(<RadioBtns {...props} />);
    const wrapper = getByTestId(RADIO_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should not fire while click in draft radio', async () => {
    const { getByText } = render(<RadioBtns {...props} />);
    const draft = getByText('Pending');
    expect(draft).toBeInTheDocument();
    fireEvent.click(getByText('Pending'));
    props.setStatus('Pending');
    expect(setStatus).toHaveBeenCalled();
  });
  it('it should not fire while click in completed radio', async () => {
    const { getByText } = render(<RadioBtns {...props} />);
    const unreadRadio = getByText('Completed');
    expect(unreadRadio).toBeInTheDocument();
    fireEvent.click(getByText('Completed'));
    props.setStatus('Completed');
    expect(setStatus).toHaveBeenCalled();
  });
});
