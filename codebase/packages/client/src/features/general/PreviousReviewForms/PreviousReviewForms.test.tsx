import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
import PreviousReviewForms from './PreviousReviewForms';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const data = [
  {
    colleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
    lastUpdatedTime: '2022-05-24T10:21:14.724Z',
    number: 1,
    properties: {
      look_back: 'look back some capture',
      how_rating: 'Satisfactory',
      what_rating: 'Outstanding',
      look_forward: 'look forward on focus',
      overall_rating: 'Satisfactory',
    },
    status: 'APPROVED',
    tlPointUuid: '0b8b4f53-358e-49b5-88dc-329c43a2559a',
    type: 'MYR',
    uuid: 'f8c3c847-3aaa-4b04-a50b-026c99a8a2f6',
  },
  {
    colleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
    lastUpdatedTime: '2022-05-24T10:22:01.128Z',
    number: 1,
    properties: {
      based_on_my_feedback: 'mocked_text',
      day_job: 'mocked_text',
      how_rating: 'Satisfactory',
      impact_on_others: 'mocked_text',
      in_the_year_ahead: 'mocked_text',
      objective: 'Over-achieved',
      overall_rating: 'Satisfactory',
      what_rating: 'Outstanding',
      yourself: 'mocked_text',
    },
    status: 'WAITING_FOR_APPROVAL',
    tlPointUuid: '39e81d07-03b7-4c96-945d-ae93f634b4de',
    type: 'EYR',
    uuid: 'b9885585-9639-4b7a-ac9e-ff994014d4f6',
  },
];

const reviews = {
  meta: { loading: false, loaded: true, error: null },
  data: [],
};

describe('PreviousReviewForms feature', () => {
  it('it should render PreviousReviewForms backward icon', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PreviousReviewForms />
      </BrowserRouter>,
    );
    const icon = getByTestId('backwardLink');
    expect(icon).toBeInTheDocument();
  });
  it('it should show previous year', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <PreviousReviewForms />
      </BrowserRouter>,
    );
    const prevYear = getAllByTestId('label-id');
    expect(prevYear[1]).toBeInTheDocument();
  });

  it('it should display section with accordion', async () => {
    //@ts-ignore
    reviews.data = data;
    const { getByTestId } = render(
      <BrowserRouter>
        <PreviousReviewForms />
      </BrowserRouter>,
      { reviews },
    );
    const section = getByTestId('section');
    expect(section).toBeInTheDocument();
  });
});
