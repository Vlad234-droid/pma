import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import CompletedNotes, { NOTES_WRAPPER } from './CompletedNotes';

describe('Completed notes', () => {
  const props = {
    item: [
      { colleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077', feedbackItems: [{}, {}] },
      { colleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b076', feedbackItems: [{}, {}] },
    ],
  };
  it('it should render completed notes wrapper', async () => {
    const { getByTestId } = render(<CompletedNotes {...props} />);
    const wrapper = getByTestId(NOTES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
