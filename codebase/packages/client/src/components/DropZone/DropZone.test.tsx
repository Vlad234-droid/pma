import React from 'react';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { DropZone } from './DropZone';

it('render DropZone and upload file', async () => {
  const onUpload = jest.fn();
  renderWithTheme(
    <DropZone onUpload={onUpload}>
      <div>upload file</div>
    </DropZone>,
  );

  const input = screen.getByLabelText(/upload file/i);
  const file = new File(['🦦'], 'hello.png', { type: 'image/png' });
  userEvent.upload(input, file);

  expect(onUpload).toHaveBeenCalledTimes(1);
  expect(input.files[0]).toStrictEqual(file);
  expect(input.files.item(0)).toStrictEqual(file);
  expect(input.files).toHaveLength(1);
});
