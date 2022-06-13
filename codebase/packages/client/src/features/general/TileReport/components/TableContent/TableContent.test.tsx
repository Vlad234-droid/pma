import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { TableContent, PROFILES_WRAPPER } from './TableContent';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Tile contanet', () => {
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
        tags: { has_eyr_approved_1_quarter: '1' },
      },
      {
        uuid: 'eecebff8-a0e1-4e2f-a703-6fcbb0e6f6fb',
        firstName: 'Vitalii',
        middleName: null,
        lastName: 'Kolodribskyi',
        jobName: 'Colleague',
        businessType: 'Office',
        lineManager: null,
        tags: { has_eyr_approved_2_quarter: '1' },
      },
      {
        uuid: 'eecebff8-a0e1-4e2f-a703-6fcbb0e6f6fb',
        firstName: 'Vitalii',
        middleName: null,
        lastName: 'Kolodribskyi',
        jobName: 'Colleague',
        businessType: 'Office',
        lineManager: null,
        tags: { has_eyr_approved_3_quarter: '0' },
      },
    ],
    schema: { meta: { loading: false, loaded: true, error: null } },
    objectiveReports: [],
  };

  it('it should render tile wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TableContent type='REPORT_ANNIVERSARY_REVIEWS' />
      </BrowserRouter>,
      {
        report,
      },
    );
    const wrapper = getByTestId(PROFILES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
