import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { default as ShareObjectivesModal } from './ShareObjectivesModal';

jest.mock('features/general/Review', () => ({
  ...(jest.requireActual('features/general/Review') as any),
  transformReviewsToObjectives: () => [
    {
      id: 1,
      title: 'title',
      subTitle: 'subTitle',
      description: 'description',
      explanations: [
        {
          title: 'explanation title',
          description: 'explanation description',
        },
      ],
      declineReason: 'declineReason',
      status: 'WAITING_FOR_APPROVAL',
    },
  ],
}));

describe('<ShareObjectivesModal />', () => {
  it('render ShareObjectivesModal', async () => {
    const onClose = jest.fn();
    const manager = 'Test Manager';
    render(<ShareObjectivesModal onClose={onClose} manager={manager} description='You have 1 shared objectives' />);

    expect(screen.getByText(/You have 1 shared objectives/)).toBeInTheDocument();
    expect(screen.getByText(/From Test Manager/)).toBeInTheDocument();
    expect(screen.getByTestId('objective-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('objective-list').length).toEqual(1);

    fireEvent.click(screen.getByTestId('arrowleft'));
    expect(onClose).toBeCalled();
  });
});
