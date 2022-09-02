import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import FileList, { FILE_LIST_TEST_ID } from './FileList';

describe('FileList', () => {
  const onDelete = jest.fn();
  const name = 'test name';
  const props = {
    files: [{ name, uuid: 'testUuid', href: 'https://www.tesco.com/' }],
    onDelete,
  };

  it('#render', () => {
    const { getByTestId, getByText } = render(<FileList {...props} />);
    expect(getByTestId(FILE_LIST_TEST_ID)).toBeInTheDocument();
    expect(getByText(name)).toBeInTheDocument();
  });

  it('#onDelete', async () => {
    const { getByTestId } = render(<FileList {...props} />);
    fireEvent.click(getByTestId('delete'));
    expect(onDelete).toBeCalledTimes(1);
  });
});
