import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import InfoModal, { MODAL_WRAPPER, DESCRIPTION_1, DESCRIPTION_2 } from './InfoModal';

describe('<InfoModal />', () => {
  it('InfoModal NotesActions render DESCRIPTION_1', async () => {
    const closeInfoModal = jest.fn();
    render(<InfoModal closeInfoModal={closeInfoModal} TEAM={false} />);

    expect(screen.getByTestId(MODAL_WRAPPER)).toBeInTheDocument();
    expect(screen.getByTestId(DESCRIPTION_1)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(closeInfoModal).toBeCalled();
  });

  it('InfoModal NotesActions render DESCRIPTION_2', async () => {
    const closeInfoModal = jest.fn();
    render(<InfoModal closeInfoModal={closeInfoModal} TEAM={true} />);

    expect(screen.getByTestId(MODAL_WRAPPER)).toBeInTheDocument();
    expect(screen.getByTestId(DESCRIPTION_2)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(closeInfoModal).toBeCalled();
  });
});
