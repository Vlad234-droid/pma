import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import FilterModal, { FILTER_WRAPPER } from './FilterModal';
import { initialValues } from '../../config';

describe('FilterModal count component', () => {
  const setFilterModal = jest.fn();
  const setCheckedItems = jest.fn();
  const setIsCheckAll = jest.fn();

  const checkedItems = ['Work level-Colleagues', 'Work level-Work level 1'];
  const props = {
    filterModal: true,
    setFilterModal,
    checkedItems,
    setCheckedItems,
    isCheckAll: ['Work level'],
    setIsCheckAll,
    initialValues,
  };
  it('it should display wrapper', async () => {
    const { getByTestId } = render(<FilterModal {...props} />);
    const wrapper = getByTestId(FILTER_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should display checked items', async () => {
    const { getByTestId } = render(<FilterModal {...props} />);
    const checkbox = getByTestId(props.checkedItems[0]);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });
  it('it should display checked items of Select all is active', async () => {
    const { getByTestId } = render(<FilterModal {...props} />);

    checkedItems.forEach((item) => {
      const checkbox = getByTestId(item);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });
  });
  it('it should render modal titles', async () => {
    const { getAllByText } = render(<FilterModal {...props} />);

    const titles = getAllByText(/Filter/);
    expect(titles.length).toEqual(2);
    titles.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
