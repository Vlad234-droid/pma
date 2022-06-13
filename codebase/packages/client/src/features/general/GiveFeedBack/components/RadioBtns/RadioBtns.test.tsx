import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import RadioBtns, { RADIO_WRAPPER } from './RadioBtns';

describe('Radio buttons', () => {
  const onCheck = jest.fn();
  const handleBtnClick = jest.fn();
  const props = {
    checkedRadio: 'DRAFT',
    onCheck,
    handleBtnClick,
  };
  it('should render radio wrapper', async () => {
    const { getByTestId } = renderWithTheme(<RadioBtns {...props} />);
    const wrapper = getByTestId(RADIO_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should not fire while click in draft radio', async () => {
    const { getByText } = renderWithTheme(<RadioBtns {...props} />);
    const draft = getByText('Drafts');
    expect(draft).toBeInTheDocument();
    fireEvent.click(getByText('Drafts'));
    props.onCheck('SUBMITTED');
    expect(onCheck).toHaveBeenCalled();
  });
  it('it should not fire while click in submitted radio', async () => {
    const { getByText } = renderWithTheme(<RadioBtns {...props} />);
    const unreadRadio = getByText('Shared');
    expect(unreadRadio).toBeInTheDocument();
    fireEvent.click(getByText('Shared'));
    props.onCheck('DRAFT');
    expect(onCheck).toHaveBeenCalled();
  });
});
