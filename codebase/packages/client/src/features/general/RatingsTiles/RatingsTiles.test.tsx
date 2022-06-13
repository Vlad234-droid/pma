import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import RatingsTiles, { TILES_WRAPPER } from './RatingsTiles';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('RatingTiles feature', () => {
  const colleagues = {
    list: [],
    meta: { loading: false, loaded: true, error: null },
    profile: [],
    colleague: {
      colleagueUUID: 'mocked_id',
      profile: { firstName: 'me', lastName: 'ha' },
      workRelationships: [
        {
          department: { businessType: 'mocked_type', name: 'mocked_name' },
          job: { id: 'mocked_id', name: 'mocked_name' },
          manager: {
            profile: {
              firstName: 'mocked_name',
              lastName: 'mocked_name',
            },
          },
        },
      ],
    },
  };

  it('it should render RatingsTiles wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <RatingsTiles />
      </BrowserRouter>,
      { colleagues },
    );
    const wrapper = getByTestId(TILES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render backwardLink', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <RatingsTiles />
      </BrowserRouter>,
    );
    const back = getByTestId('backwardLink');
    expect(back).toBeInTheDocument();
  });
  it('it should render profile info', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <RatingsTiles />
      </BrowserRouter>,
      { colleagues },
    );

    const profileInfo = getByText(
      `${colleagues.colleague.profile.firstName} ${colleagues.colleague.profile.lastName} | ${colleagues.colleague.workRelationships[0].job.name} ${colleagues.colleague.workRelationships[0].department.name}`,
    );
    expect(profileInfo).toBeInTheDocument();
  });
  it('it should render 3 link tiles', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <RatingsTiles />
      </BrowserRouter>,
    );
    const tiles = getAllByTestId('tile-link');
    expect(tiles.length).toEqual(3);
  });
  it('it should render tiles titles', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <RatingsTiles />
      </BrowserRouter>,
    );
    const ratings = getByText(/Calibration ratings/);
    const objectives = getByText(/What, how and overall ratings/);
    const review = getByText(/Review forms/);
    expect(ratings).toBeInTheDocument();
    expect(objectives).toBeInTheDocument();
    expect(review).toBeInTheDocument();
  });
});
