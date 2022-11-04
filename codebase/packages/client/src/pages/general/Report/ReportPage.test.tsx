import React, { Suspense } from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getCurrentYear, getNextYear } from 'utils';
import Report, { REPORT_WRAPPER } from './ReportPage';

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
