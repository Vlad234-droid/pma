import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

import TileReport, { OBJECTIVES_WRAPPER } from './TileReport';

describe('TileReport', () => {
  beforeEach(() => {
    window.history.pushState({}, 'mocked_title', 'report/submitted-objectives?year=2021');
  });
  const report = {
    objectiveStatistics: {
      metadata: {
        columnMetadata: [
          {
            id: 'objectives-approved-percentage',
            name: 'Objectives approved percentage',
            type: 'mocked_type',
            description: 'mocked_description',
            code: 'Objectives approved percentage',
          },
        ],
      },
      data: [[4]],
    },
    colleagues: [
      {
        uuid: '23b887e7-3841-4b4e-9706-508f36a2a9ae',
        firstName: 'Andrii',
        middleName: null,
        lastName: 'Kuzmin',
        jobName: 'Developer',
        businessType: 'Office',
        lineManager: null,
        tags: { has_objective_approved: '1' },
      },
      {
        uuid: 'eecebff8-a0e1-4e2f-a703-6fcbb0e6f6fb',
        firstName: 'Vitalii',
        middleName: null,
        lastName: 'Kolodribskyi',
        jobName: 'Colleague',
        businessType: 'Office',
        lineManager: null,
        tags: { has_objective_approved: '1' },
      },
      {
        uuid: 'eecebff8-a0e1-4e2f-a703-6fcbb0e6f6fb',
        firstName: 'Vitalii',
        middleName: null,
        lastName: 'Kolodribskyi',
        jobName: 'Colleague',
        businessType: 'Office',
        lineManager: null,
        tags: { has_objective_approved: '0' },
      },
    ],
    schema: { meta: { loading: false, loaded: true, error: null } },
    objectiveReports: [],
  };

  it('it should render objectives report statistics wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
      {
        report,
      },
    );
    const wrapper = getByTestId(OBJECTIVES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render PieChart', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
    );

    expect(getByTestId('test-pie-chart')).toBeInTheDocument();
  });

  it('render Back button', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
    );

    expect(getByTestId('test-back-button')).toBeInTheDocument();
  });

  it('render FilterOptions', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
    );

    expect(getByTestId('filter-options-id')).toBeInTheDocument();
  });

  it('render content from getContent function', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
    );

    expect(getByTestId('content-id')).toBeInTheDocument();
  });

  it('should render full-view', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
    );

    expect(getByTestId('full-view')).toBeInTheDocument();
  });

  it('should not give an error in component', async () => {
    render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
    );
    const consoleError = jest.spyOn(global.console, 'error');
    expect(consoleError).not.toHaveBeenCalled();
  });
});
