import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme } from 'utils/test';

import { CreateModal } from './CreateModal';

describe('ObjectiveAccordion', () => {
  it('render', async () => {
    const { getByTestId, getByText, findByText } = renderWithTheme(<CreateModal />);
    expect(getByText(/Submit/i).getAttribute('aria-disabled')).toBe('true');

    const objectiveTitleInput = getByTestId('objectiveTitle');
    expect(objectiveTitleInput).toBeInTheDocument();
    fireEvent.change(objectiveTitleInput, { target: { value: '23' } });
    expect(objectiveTitleInput.value).toBe('23');

    fireEvent.change(objectiveTitleInput, { target: { value: '' } });
    expect(objectiveTitleInput.value).toBe('');
    expect(await findByText(/required field/i)).toBeInTheDocument();
    expect(objectiveTitleInput).toBeInTheDocument();
    fireEvent.change(objectiveTitleInput, { target: { value: '23' } });
    expect(objectiveTitleInput.value).toBe('23');

    const objectiveDescriptionInput = getByTestId('objectiveDescription');
    expect(objectiveDescriptionInput).toBeInTheDocument();
    fireEvent.change(objectiveDescriptionInput, { target: { value: '23' } });
    expect(objectiveDescriptionInput.value).toBe('23');

    const meetObjectiveInput = getByTestId('meetObjective');
    expect(meetObjectiveInput).toBeInTheDocument();
    fireEvent.change(meetObjectiveInput, { target: { value: '23' } });
    expect(meetObjectiveInput.value).toBe('23');

    const exceedObjectiveInput = getByTestId('exceedObjective');
    expect(exceedObjectiveInput).toBeInTheDocument();
    fireEvent.change(exceedObjectiveInput, { target: { value: '23' } });
    expect(exceedObjectiveInput.value).toBe('23');

    await waitFor(() => {
      expect(getByText(/Submit/i).getAttribute('aria-disabled')).toBe(null);
    });
  });
});
