import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import RadioBtns, { RADIO_WRAPPER } from './RadioBtns';

describe('Radio buttons', () => {
  const setCheckedRadio = jest.fn();
  const setFocus = jest.fn();
  const setFilterModal = jest.fn();
  const setFilterFeedbacks = jest.fn();
  const props = {
    checkedRadio: {
      unread: true,
      read: false,
    },
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
    fireEvent.click(getByTestId('unread'));
    expect(unreadRadio.checked).toEqual(true);
    expect(setCheckedRadio).not.toHaveBeenCalled();
  });
  it('it should fire setCheckedRadio handler', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} />);
    const readRadio = getByTestId('read');
    expect(readRadio).toBeInTheDocument();
    fireEvent.click(getByTestId('read'));

    expect(setCheckedRadio).toHaveBeenCalledTimes(1);
  });
  it('it should fire setFocus, setFilterModal, setFilterFeedbacks handlers', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} />);
    fireEvent.click(getByTestId('read'));
    expect(setFocus).toHaveBeenCalledTimes(2);
    expect(setFilterModal).toHaveBeenCalledTimes(2);
    expect(setFilterFeedbacks).toHaveBeenCalledTimes(2);
  });
});
