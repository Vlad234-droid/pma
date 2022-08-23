import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import Objectives, { TEST_ID } from './Objectives';
import { Status } from 'config/enum';

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

jest.mock('@pma/pdf-renderer', () => {
  return {
    __esModule: true,
    usePDF: () => {
      return ['mock', () => true];
    },
  };
});

jest.mock('../TogglePriority', () => {
  return {
    __esModule: true,
    TogglePriority: () => {
      return <div />;
    },
  };
});

describe.skip('Objectives list', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  const props = {
    objectives: [
      {
        id: 1,
        title: 'Test title',
        subTitle: 'Test subtitle',
        description: 'Test description',
        explanations: [
          {
            title: 'Explanation title',
            description: 'Explanation description',
          },
        ],
        declineReason: 'Test declie reason',
        status: Status.DRAFT,
      },
    ],
  };

  it('should render Objectives', async () => {
    renderWithTheme(<Objectives {...props} />);
    const main = screen.queryByTestId(TEST_ID);
    expect(main).toBeInTheDocument();
  });

  it('should render objectives list', async () => {
    const { queryByText } = renderWithTheme(<Objectives {...props} />);
    const noObjectives = queryByText('No objectives created');
    expect(noObjectives).not.toBeInTheDocument();
  });

  it('should NOT render objectives list', async () => {
    props.objectives = [];

    const { queryByText } = renderWithTheme(<Objectives {...props} />);
    const noObjectives = queryByText('No objectives created');
    expect(noObjectives).toBeInTheDocument();
  });
});
