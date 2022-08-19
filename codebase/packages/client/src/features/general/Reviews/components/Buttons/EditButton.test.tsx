import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import EditButton from './EditButton';
import { renderWithTheme as render, screen } from 'utils/test';

describe.skip('<EditButton />', () => {
  it('EditButton CreateUpdateObjective', async () => {
    render(<EditButton buttonText={'buttonText'} />);

    fireEvent.click(screen.getByText('buttonText'));

    expect(screen.getByText('mocked_CreateUpdateObjective')).toBeInTheDocument();
    expect(screen.queryByText('mocked_CreateUpdateObjectives')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancel'));
    expect(screen.queryByText('mocked_CreateUpdateObjective')).not.toBeInTheDocument();
  });
  it('EditButton CreateUpdateObjectives', async () => {
    render(<EditButton buttonText={'buttonText'} />);

    fireEvent.click(screen.getByText('buttonText'));

    expect(screen.getByText('mocked_CreateUpdateObjectives')).toBeInTheDocument();
    expect(screen.queryByText('mocked_CreateUpdateObjective')).not.toBeInTheDocument();
  });
});
