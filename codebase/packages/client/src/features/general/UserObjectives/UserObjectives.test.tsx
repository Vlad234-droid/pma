import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import UserObjectives, { TEST_ID } from './UserObjectives';
import { BrowserRouter } from 'react-router-dom';
import { colleagueUUIDSelector, getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';

jest.mock('@pma/store', () => ({
  ...(jest.requireActual('@pma/store') as any),
  getPreviousReviewFilesSelector: () => () => [],
}));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('User Objectives', () => {
  window.HTMLElement.prototype.scrollTo = function () {};

  const props = {};

  it('should render UserObjectives', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <UserObjectives {...props} />
      </BrowserRouter>,
    );
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render Back Button', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <UserObjectives {...props} />
      </BrowserRouter>,
    );
    const backBtn = queryByTestId('test-back-btn');

    expect(backBtn).toBeInTheDocument();
  });

  it('should NOT render step indicator', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <UserObjectives {...props} />
      </BrowserRouter>,
    );
    const stepIndicator = queryByTestId('test-step-indicator');

    expect(stepIndicator).not.toBeInTheDocument();
  });

  it('should NOT render objectives', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <UserObjectives {...props} />
      </BrowserRouter>,
    );

    const downloadBtn = queryByTestId('test-download-btn');
    expect(downloadBtn).not.toBeInTheDocument();
  });
});
