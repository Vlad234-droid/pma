import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render, screen } from 'utils/test';
import DownloadReportModal, { DOWNLOAD_WRAPPER } from './DownloadReportModal';
import { findByTestId, fireEvent, getByRole } from '@testing-library/react';
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
    const { getByRole } = render(<DownloadReportModal {...props} />);
    const cancel = getByRole('button', { name: /Cancel/i });
    expect(cancel).toBeInTheDocument();
  });
  it('it should render success part', async () => {
    const { getByTestId, getByText, getByRole, findByTestId } = render(<DownloadReportModal {...props} />);
    const option = getByTestId('0');
    const year = getByTestId('year');
    const submit = getByRole('button', { name: /Download/i });

    await act(async () => {
      fireEvent.click(option);
      fireEvent.click(year);
    });

    const currYear = getByText(getCurrentYear());
    expect(currYear).toBeInTheDocument();
    expect(getByTestId('year-list')).toBeInTheDocument();
    expect(submit).toHaveAttribute('aria-disabled', 'true');
    await act(async () => {
      fireEvent.click(currYear);
      fireEvent.click(submit);
    });
    expect(submit).not.toHaveAttribute('aria-disabled', 'true');
  });
});
