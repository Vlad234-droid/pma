import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import WorkLevelStatistics, { WORK_LEVEL_CONTENT_WRAPPER } from './WorkLevelStatistics';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

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
      limitedObjectiveReports: [
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

  const toggleFullView = jest.fn();

  const props = {
    toggleFullView,
    isFullView: false,
  };

  it('should render work level content', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <WorkLevelStatistics {...props} />
      </BrowserRouter>,
      { ...state },
    );
    const wrapper = getByTestId(WORK_LEVEL_CONTENT_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('should call toggleFullView handler', async () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <WorkLevelStatistics {...props} />
      </BrowserRouter>,
      { ...state },
    );
    const full = getByTestId('full-button');
    fireEvent.click(full);
    expect(toggleFullView).toHaveBeenCalled();
    const pieChart = queryByTestId('pie-chart-content-id');
    expect(pieChart).toBeNull();
  });
});
