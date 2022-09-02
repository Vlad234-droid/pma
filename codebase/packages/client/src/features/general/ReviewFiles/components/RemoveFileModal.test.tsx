import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RemoveFileModal } from './RemoveFileModal';

describe('Remove file modal', () => {
  const onClose = jest.fn();
  const props = {
    fileName: 'name',
    colleagueUUID: 'uuid',
    fileUuid: 'fileUuid',
    onClose,
  };
  const previousReviewFiles = {
    deleteFileMeta: { loading: false, loaded: true, error: null },
  };

  it('it should render delete file modal', async () => {
    const { getByText } = render(<RemoveFileModal {...props} />, { previousReviewFiles });
    const title = getByText(/remove the file/i);
    expect(title).toBeInTheDocument();
  });

  it('it should fire onClose prop', async () => {
    const { getByText } = render(<RemoveFileModal {...props} />, { previousReviewFiles });
    const button = getByText(/cancel/i);
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('it should render success modal after deleting file', async () => {
    const { getByText } = render(<RemoveFileModal {...props} />, { previousReviewFiles });
    const button = getByText(/confirm/i);
    fireEvent.click(button);

    await waitFor(() => {
      const text = getByText(`${props.fileName} was removed successfully!`);
      expect(text).toBeInTheDocument();
    });
  });
});
