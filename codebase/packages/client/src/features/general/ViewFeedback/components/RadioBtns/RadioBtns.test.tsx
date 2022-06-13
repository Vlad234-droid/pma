import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import RadioBtns, { RADIO_WRAPPER } from './RadioBtns';
import { RadioStatus } from '../ViewFeedback/ViewFeedback';

describe('Radio buttons', () => {
  const setCheckedRadio = jest.fn();
  const setFocus = jest.fn();
  const setFilterModal = jest.fn();
  const setFilterFeedbacks = jest.fn();
  const props = {
    checkedRadio: RadioStatus.READ,
    setCheckedRadio,
    focus: true,
    setFocus,
    setFilterModal,
    filterModal: true,
    setFilterFeedbacks,
  };
  it('should render radio button component', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} />);
    const wrapper = getByTestId(RADIO_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should not fire while click in unread radio', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} />);
    const unreadRadio = getByTestId('unread');
    expect(unreadRadio).toBeInTheDocument();
    fireEvent.click(unreadRadio);
    await waitFor(() => {
      expect(setCheckedRadio).toHaveBeenCalled();
    });
  });
  it('it should fire setCheckedRadio handler', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} checkedRadio={RadioStatus.UNREAD} />);
    const readRadio = getByTestId('read');
    expect(readRadio).toBeInTheDocument();
    fireEvent.click(getByTestId('read'));

    expect(setCheckedRadio).toHaveBeenCalledTimes(2);
  });
  it('it should fire setFocus, setFilterModal, setFilterFeedbacks handlers', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} checkedRadio={RadioStatus.UNREAD} />);
    fireEvent.click(getByTestId('read'));
    expect(setFocus).toHaveBeenCalled();
    expect(setFilterModal).toHaveBeenCalled();
  });
});
