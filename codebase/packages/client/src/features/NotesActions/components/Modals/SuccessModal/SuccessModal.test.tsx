import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';

import SuccessModal, { SUCCESS_MODAL_WRAPPER, OK_BTN } from './SuccessModal';
import { renderWithTheme as render } from 'utils/test';

it('render success modal', async () => {
  const testHandler = jest.fn();
  const values = { folder: 'New folder', folderTitle: 'New title for New folder', title: 'Title for note' };

  const { getByTestId, queryByTestId } = render(
    <SuccessModal values={values} createFolder={false} cancelModal={testHandler} />,
  );

  const modalWrappper = queryByTestId(SUCCESS_MODAL_WRAPPER);
  const okBtn = getByTestId(OK_BTN);
  expect(modalWrappper).toBeInTheDocument();

  fireEvent.click(okBtn);

  await waitFor(() => expect(testHandler).toHaveBeenCalled());
});
