import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import DownloadReportModal, { DOWNLOAD_WRAPPER } from './DownloadReportModal';
import { fireEvent } from '@testing-library/react';
import { getCurrentYear } from 'utils/date';
import { act } from 'react-dom/test-utils';

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
  it('it should render success part', async () => {
    const { getByTestId, getByText } = render(<DownloadReportModal {...props} />);
    const option = getByTestId('0');
    const year = getByTestId('year');

    await act(async () => {
      fireEvent.click(option);
      fireEvent.click(year);
    });

    const currYear = getByText(getCurrentYear());
    expect(currYear).toBeInTheDocument();
    expect(getByTestId('year-list')).toBeInTheDocument();
  });
});
