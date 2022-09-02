import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BasicFormModal } from './BasicFormModal';

describe('BasicFormModal', () => {
  const onClose = jest.fn();
  const props = {
    onClose,
    title: 'title',
  };

  it('it should render BasicFormModal wrapper', async () => {
    const { getByTestId } = render(
      <BasicFormModal {...props}>
        <div>children</div>
      </BasicFormModal>,
    );
    const wrapper = getByTestId('overlay-container');
    expect(wrapper).toBeInTheDocument();
  });

  it('it should fire onClose prop', async () => {
    const { getByTestId } = render(
      <BasicFormModal {...props}>
        <div>children</div>
      </BasicFormModal>,
    );
    const icon = getByTestId('cancel');
    fireEvent.click(icon);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('it should render title', async () => {
    const { getByText } = render(
      <BasicFormModal {...props}>
        <div>children</div>
      </BasicFormModal>,
    );
    const title = getByText(props.title);
    expect(title).toBeInTheDocument();
  });
});
