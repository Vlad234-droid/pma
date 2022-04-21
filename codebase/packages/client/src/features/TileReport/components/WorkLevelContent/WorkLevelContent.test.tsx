import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import WorkLevelContent, { WORK_LEVEL_CONTENT_WRAPPER } from './WorkLevelContent';
import { TABLE_WRAPPER } from 'components/Table/Table';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Work level content', () => {
  const state = {
    report: {
      objectiveReports: [
        [
          'UKE12380626',
          'eecebff8-a0e1-4e2f-a703-6fcbb0e6f6fb',
          'Vitalii',
          'Kolodribskyi',
          'WL5',
          'Colleague',
          'Vitalii Kolodribskyi',
          1,
          'APPROVED',
          'Magnetic Value',
          'asdad asdads',
          'asdad asdadsasdad asdads',
          'asdad asdadsasdad asdads',
        ],
      ],
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
    },
  };

  it('should render work level content', async () => {
    const { getByTestId } = render(<WorkLevelContent />, { ...state });
    const wrapper = getByTestId(WORK_LEVEL_CONTENT_WRAPPER);
    const table_wrapper = getByTestId(TABLE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
    expect(table_wrapper).toBeInTheDocument();
  });
});
