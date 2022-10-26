import React, { Suspense } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Report, { REPORT_WRAPPER } from './ReportPage';
import { getCurrentYear, getNextYear } from 'utils';
import { FILTER_WRAPPER } from 'features/general/Report/components/FilterModal/FilterModal';
import { LEFT_SIDE_BUTTON } from 'components/ButtonsWrapper/ButtonsWrapper';

describe('Report page', () => {
  it('render report wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Report />
        </Suspense>
      </BrowserRouter>,
    );
    const wrapper = getByTestId(REPORT_WRAPPER);

    expect(wrapper).toBeInTheDocument();
  });
  it('it should change select value ', () => {
    const prevYear = `${getCurrentYear()}-${getNextYear(1)}`;

    const { getByTestId, queryByText, getAllByText } = render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Report />
        </Suspense>
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('year_options'));
    fireEvent.click(getAllByText(prevYear)[0]);

    expect(queryByText('Choose an area')).not.toBeInTheDocument();
    expect(getAllByText(prevYear)[0]).toBeInTheDocument();
  });
  it('it should open report modal', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Report />
        </Suspense>
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('edit'));
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
  });
  it('it should close report modal', async () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Report />
        </Suspense>
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('edit'));
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
    const cancel = getByTestId(LEFT_SIDE_BUTTON);
    expect(cancel).toBeInTheDocument();

    fireEvent.click(cancel);
    await waitFor(() => {
      expect(queryByTestId('modal-wrapper')).not.toBeInTheDocument();
    });
  });
  it('it should open filter modal', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Report />
        </Suspense>
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('settings'));
    expect(getByTestId(FILTER_WRAPPER)).toBeInTheDocument();
  });
  it('it should open edit dashboard', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Report />
        </Suspense>
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('edit'));
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
  });
});
