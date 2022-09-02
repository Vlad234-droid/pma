import React from 'react';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

// eslint-disable-next-line import/no-named-as-default
import File, { TEST_ID } from './File';

describe('File', () => {
  const onDelete = jest.fn();
  const props = {
    onDelete,
    file: {
      fileName: 'fileName',
      fileLength: 10,
      uuid: 'uuid',
    },
  };
  it('render File', async () => {
    const { getByText } = renderWithTheme(
      <File {...props}>
        <div>upload file</div>
      </File>,
    );
    expect(getByText('fileName')).toBeInTheDocument();
  });
  it('shout call onDelete prop', async () => {
    const { getByTestId } = renderWithTheme(
      <File {...props}>
        <div>upload file</div>
      </File>,
    );
    const button = getByTestId(TEST_ID);
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
