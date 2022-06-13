import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import PeopleTeam, { TEST_ID, SECONDARY_WIDGET_ID } from './PeopleTeam';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('PeopleTeam', () => {
  it('should render PeopleTeam', async () => {
    renderWithTheme(<PeopleTeam />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('should render SecondaryWidget', async () => {
    renderWithTheme(<PeopleTeam />);
    const widget = screen.queryByTestId(SECONDARY_WIDGET_ID);

    expect(widget).toBeInTheDocument();
  });
});
