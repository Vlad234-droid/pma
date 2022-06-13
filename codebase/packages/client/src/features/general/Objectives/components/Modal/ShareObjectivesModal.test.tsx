import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { default as ShareObjectivesModal } from './ShareObjectivesModal';
import { Status } from 'config/enum';

describe('<ShareObjectivesModal />', () => {
  it('render ShareObjectivesModal', async () => {
    const objectives = [
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
        status: Status.WAITING_FOR_APPROVAL,
      },
    ];
    const onClose = jest.fn();
    const manager = 'Test Manager';
    render(<ShareObjectivesModal objectives={objectives} onClose={onClose} manager={manager} />);

    expect(screen.getByText(/You have 1 shared objectives/)).toBeInTheDocument();
    expect(screen.getByText(/From Test Manager/)).toBeInTheDocument();
    expect(screen.getByTestId('objective-accordion')).toBeInTheDocument();
    expect(screen.getAllByTestId('objective-accordion').length).toEqual(1);

    fireEvent.click(screen.getByTestId('arrowleft'));
    expect(onClose).toBeCalled();
  });
});
