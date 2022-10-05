import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import DrawerModal, { WRAPPER_ID } from './DrawerModal';
import { SearchOption } from 'config/enum';

describe('DrawerModal', () => {
  const setOpen = jest.fn();
  const onSelect = jest.fn();
  const onClose = jest.fn();
  const props = {
    setOpen,
    title: 'title',
    onSelect,
    onClose,
    active: SearchOption.NAME,
  };

  it('it should render DrawerModal wrapper', async () => {
    const { getByTestId } = render(<DrawerModal {...props} />);
    const wrapper = getByTestId(WRAPPER_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should render title', async () => {
    const { getByText } = render(<DrawerModal {...props} />);
    const title = getByText(props.title);
    expect(title).toBeInTheDocument();
  });

  it('by default Search option is Name', async () => {
    const { getByTestId } = render(<DrawerModal {...props} />);
    const radio = getByTestId('name');

    expect(radio).toBeChecked();
  });

  it('by default Search option is Email', async () => {
    props.active = SearchOption.EMAIL;
    const { getByTestId } = render(<DrawerModal {...props} />);
    const radio = getByTestId('email');
    expect(radio).toBeChecked();
  });
});
