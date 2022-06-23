import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import { MainWidgetBase, TEST_ID } from './MainWidgetBase';
import { getTescoContent } from './getTescoContent';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('MainWidget', () => {
  const testHandler = jest.fn();

  it('should render MainWidget', async () => {
    renderWithTheme(<MainWidgetBase getContent={getTescoContent} count={3} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
