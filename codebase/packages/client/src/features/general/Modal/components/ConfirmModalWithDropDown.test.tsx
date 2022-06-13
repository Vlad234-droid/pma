import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as Yup from 'yup';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import ConfirmModalWithDropDown, { TEST_DESCRIPTION, TEST_SELECT_ID } from './ConfirmModalWithDropDown';
import { fireEvent } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('ConfirmModalWithDropDown', () => {
  const onCancel = jest.fn();
  const onSave = jest.fn();

  const props = {
    title: 'Test title',
    description: 'Test Description',
    folderSchema: Yup.object().shape({
      folder: Yup.string().required(),
    }),
    fieldName: 'Field name',
    field_options: [{ value: 'Test value', label: 'Test label' }],
    field_placeholder: 'Field placeholder',
  };

  it('should render description', async () => {
    const { queryByTestId } = render(<ConfirmModalWithDropDown onCancel={onCancel} onSave={onSave} {...props} />);

    const description = queryByTestId(TEST_DESCRIPTION);
    expect(description).toBeInTheDocument();
  });

  it('should render Select', async () => {
    const { queryByTestId } = render(<ConfirmModalWithDropDown onCancel={onCancel} onSave={onSave} {...props} />);

    const select = queryByTestId(TEST_SELECT_ID);
    expect(select).toBeInTheDocument();
  });

  it('should call onCancel', async () => {
    const { getByText } = render(<ConfirmModalWithDropDown onCancel={onCancel} onSave={onSave} {...props} />);
    const cancelBtn = getByText(/Cancel/i);
    fireEvent.click(cancelBtn);
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onSave', async () => {
    const { getByText } = render(<ConfirmModalWithDropDown onCancel={onCancel} onSave={onSave} {...props} />);
    const submit = getByText(/Submit/i);
    fireEvent.click(submit);
    expect(onCancel).toHaveBeenCalled();
  });
});
