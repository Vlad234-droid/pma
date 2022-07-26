import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import FileList, { FILE_LIST_TEST_ID } from './FileList';

describe.skip('FileList', () => {
  const onDelete = jest.fn();
  const name = 'test name';
  const props = {
    files: [{ name, uuid: 'testUuid', href: 'https://www.tesco.com/' }],
    onDelete,
  };

  it('#render', () => {
    const { findByTestId, findByText } = render(<FileList {...props} />);
    expect(findByTestId(FILE_LIST_TEST_ID)).toBeInTheDocument();
    expect(findByText(name)).toBeInTheDocument();
  });

  it('#onDelete', async () => {
    const { getAllByRole } = render(<FileList {...props} />);
    fireEvent.click(getAllByRole('icon')[0]);
    expect(onDelete).toBeCalledTimes(1);
  });
});
