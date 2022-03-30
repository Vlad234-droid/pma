import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

import TileReport, { APPROVED_COLLEAGUES_WRAPPER, OBJECTIVES_WRAPPER, PROFILES_WRAPPER } from './TileReport';

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

  it('it should render profiles wrapper', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <TileReport />
      </BrowserRouter>,
      {
        report,
      },
    );
    const profile = getAllByTestId(PROFILES_WRAPPER);

    expect(profile[0]).toBeInTheDocument();
  });
  //it('it should render list of not approved objective', async () => {
  //  const { getAllByTestId } = render(
  //    <BrowserRouter>
  //      <TileReport />
  //    </BrowserRouter>,
  //    {
  //      report,
  //    },
  //  );
  //  const colleague = getAllByTestId(NOT_APPROVED_COLLEAGUES_WRAPPER);
  //
  //  expect(colleague.length).toEqual(1);
  //});
});
