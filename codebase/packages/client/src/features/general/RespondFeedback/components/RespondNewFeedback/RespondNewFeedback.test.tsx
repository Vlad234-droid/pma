import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import RespondNewFeedback from './RespondNewFeedback';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('RespondNewFeedback component', () => {
  it('render respond feedback wrapper', async () => {
    const { getByTestId } = render(<RespondNewFeedback />);
    const form = getByTestId('form_wrapper');
    expect(form).toBeInTheDocument();
  });
});
