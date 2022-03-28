import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import InfoModal from './InfoModal';

describe('<InfoModal />', () => {
  it('InfoModal render without description', async () => {
    const onCancel = jest.fn();
    render(<InfoModal title={'test_title'} onCancel={onCancel} />);
    expect(screen.getByText(/test_title/)).toBeInTheDocument();
    expect(screen.queryByTestId('info-modal-description')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onCancel).toBeCalled();
  });

  it('InfoModal render with description', async () => {
    const onCancel = jest.fn();
    render(<InfoModal title={'test_title'} onCancel={onCancel} description={'test_description'} />);
    expect(screen.getByText(/test_title/)).toBeInTheDocument();
    expect(screen.queryByTestId('info-modal-description')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onCancel).toBeCalled();
  });
});
