import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ObjectivesReportStatistics, {
  APPROVED_COLLEAGUES_WRAPPER,
  OBJECTIVES_WRAPPER,
  NOT_APPROVED_COLLEAGUES_WRAPPER,
} from './ObjectivesReportStatistics';
import { Page } from 'pages';
import { buildPath, buildPathWithParams } from 'features/Routes';

describe('ObjectivesReportStatistics', () => {
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

  const params = {
    year: '2021',
  };

  const history = createMemoryHistory();

  history.push(buildPathWithParams(buildPath(Page.OBJECTIVES_SUBMITTED_REPORT), { ...params }));

  it('it should render objectives report statistics wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ObjectivesReportStatistics />
      </BrowserRouter>,
      {
        report,
      },
    );
    const wrapper = getByTestId(OBJECTIVES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should render colleague profile with approved objective', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <ObjectivesReportStatistics />
      </BrowserRouter>,
      {
        report,
      },
    );
    const colleague = getAllByTestId(APPROVED_COLLEAGUES_WRAPPER);

    expect(colleague.length).toEqual(2);
  });
  it('it should render list of not approved objective', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <ObjectivesReportStatistics />
      </BrowserRouter>,
      {
        report,
      },
    );
    const colleague = getAllByTestId(NOT_APPROVED_COLLEAGUES_WRAPPER);

    expect(colleague.length).toEqual(1);
  });
});
