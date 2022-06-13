import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import ModalDownloadFeedback, { DOWNLOAD_WRAPPER } from './ModalDownloadFeedback';
import { fireEvent } from '@testing-library/react';

jest.mock('@pma/pdf-renderer', () => {
  return {
    __esModule: true,
    usePDF: () => {
      return ['mock', () => true];
    },
  };
});

describe('Modal download component component', () => {
  const setOpenMainModal = jest.fn();
  const setModalSuccess = jest.fn();
  const closeHandler = jest.fn();

  const props = {
    setOpenMainModal,
    modalSuccess: false,
    setModalSuccess,
    closeHandler,
    downloadTitle: 'title',
    downloadDescription: 'desc',
  };
  it('it should render modal wrapper', async () => {
    const { getByTestId } = render(<ModalDownloadFeedback {...props} />);
    const wrapper = getByTestId(DOWNLOAD_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call closeHandler handler', async () => {
    const { getByRole } = render(<ModalDownloadFeedback {...props} />);
    const cancel = getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancel);
    expect(closeHandler).toHaveBeenCalled();
  });
});
