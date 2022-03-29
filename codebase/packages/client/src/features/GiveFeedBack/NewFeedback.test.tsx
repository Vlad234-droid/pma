import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import NewFeedback from './NewFeedback';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('New feedback component', () => {
  it('render give feedback wrapper', async () => {
    const { getByTestId } = render(<NewFeedback />);
    const form = getByTestId('form-wrapper');
    expect(form).toBeInTheDocument();
  });
});
