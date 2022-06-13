import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import FeedbackBlock from './FeedbackBlock';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Feedback blocks', () => {
  const props = {
    list: [
      { colleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077', feedbackItems: [{}, {}] },
      { colleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b076', feedbackItems: [{}, {}] },
    ],
    canEdit: false,
  };
  it('it should render propper amount of tiles', async () => {
    const { getAllByTestId } = render(<FeedbackBlock {...props} />);
    const accordions = getAllByTestId('accordion');
    expect(accordions.length).toBe(2);
  });
  it('it should render empty tile if not loaded', async () => {
    const { queryAllByTestId } = render(<FeedbackBlock {...props} />, {
      feedback: { feedbacks: { meta: { loaded: false } } },
    });
    const accordions = queryAllByTestId('accordion');
    expect(accordions).toEqual([]);
  });
});
