import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
import ObjectiveRatings from './ObjectiveRatings';
import { TILE_WRAPPER } from 'components/Tile/TileWrapper';

const uuid = '15818570-cd6b-4957-8a82-3d34dcb0b077';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    uuid: uuid,
  }),
}));

const data = [
  {
    code: 'OBJECTIVE',
    colleagueCycleUuid: 'f64fd85b-c638-4d03-a89d-cef863b1d654',
    description: 'My objectives',
    endTime: '2022-03-07T00:00:00.000Z',
    lastUpdatedTime: '2022-05-24T08:45:21.140Z',
    properties: {
      BEFORE_END_DATE: '2022-02-28',
      BEFORE_START_DATE: '2022-02-07',
      END_DATE: '2022-03-07',
      START_DATE: '2022-02-21',
      pm_review_max: '5',
      pm_review_min: '3',
    },
    reviewType: 'OBJECTIVE',
    startTime: '2022-02-21T00:00:00.000Z',
    status: 'STARTED',
    type: 'REVIEW',
    uuid: 'be65a8ad-90f1-4267-8111-62ce6d8140c8',
  },
];

const timeline = {
  meta: { loading: false, loaded: true, error: null },
  [uuid]: data,
};

describe('PreviousReviewForms feature', () => {
  it('it should render PreviousReviewForms backward icon', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ObjectiveRatings />
      </BrowserRouter>,
    );
    const icon = getByTestId('backwardLink');
    expect(icon).toBeInTheDocument();
  });
  it('it should show previous year', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <ObjectiveRatings />
      </BrowserRouter>,
    );
    const prevYear = getAllByTestId('label-id');
    expect(prevYear[1]).toBeInTheDocument();
  });
  it('it should display a plug', async () => {
    timeline.meta.loaded = false;
    const { getByTestId } = render(
      <BrowserRouter>
        <ObjectiveRatings />
      </BrowserRouter>,
      { timeline },
    );
    const plug = getByTestId(TILE_WRAPPER);
    expect(plug).toBeInTheDocument();
  });
});
