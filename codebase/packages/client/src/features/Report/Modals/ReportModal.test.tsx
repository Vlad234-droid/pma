import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import DownloadReportModal, { DOWNLOAD_WRAPPER } from './ReportModal';

describe('Download report modal', () => {
  const onClose = jest.fn();
  const props = {
    onClose,
  };
  it('it should render download wrapper', async () => {
    const { getByTestId } = render(<DownloadReportModal {...props} />);

    const wrapper = getByTestId(DOWNLOAD_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it call onClose handler', async () => {
    const { getByText } = render(<DownloadReportModal {...props} />);
    const cancel = getByText('Cancel');
    expect(cancel).toBeInTheDocument();
  });
});
