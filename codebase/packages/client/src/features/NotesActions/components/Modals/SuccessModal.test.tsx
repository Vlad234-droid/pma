import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { SUCCESS_MODAL_WRAPPER, OK_BTN } from './SuccessModal';
import SuccessModal from './SuccessModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { schemaNotes } from '../../components/Modals/schema/schema';

it('render success modal', async () => {
  const testHandler = jest.fn();
  const values = { folder: 'New folder', folderTitle: 'New title for New folder', title: 'Title for note' };
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaNotes),
  });
  const { getByTestId, queryByTestId, findByTestId } = renderWithTheme(
    <SuccessModal
      values={values}
      setPersonalNoteModal={testHandler}
      setSuccessModal={testHandler}
      createFolder={false}
      setCreateFolder={testHandler}
      methods={methods}
    />,
  );

  const modalWrappper = queryByTestId(SUCCESS_MODAL_WRAPPER);
  const okBtn = getByTestId(OK_BTN);
  expect(modalWrappper).toBeInTheDocument();
  fireEvent.click(okBtn);
  expect(modalWrappper).toBeNull();
});
