import React from 'react';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { File } from './File';

it('render File', async () => {
  const { getByText } = renderWithTheme(
    <File
      file={{
        fileName: 'fileName',
        fileLength: 10,
        uuid: 'uuid',
      }}
    >
      <div>upload file</div>
    </File>,
  );
  expect(getByText('fileName')).toBeInTheDocument();
});
