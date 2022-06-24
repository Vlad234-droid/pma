import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import CreateButton from './CreateButton';
import { renderWithTheme as render, screen } from 'utils/test';

jest.mock('features/general/ObjectivesForm', () => {
  return {
    __esModule: true,
    ObjectiveForm: ({ onSave }) => {
      return <div onClick={onSave}>mocked_CreateUpdateObjective</div>;
    },
    ObjectivesForm: ({ onSave }) => {
      return <div onClick={onSave}>mocked_CreateUpdateObjectives</div>;
    },
  };
});

describe.skip('<CreateButton />', () => {
  it('CreateButton CreateUpdateObjective', async () => {
    render(<CreateButton useSingleStep={true} buttonText={'buttonText'} />);

    fireEvent.click(screen.getByText('buttonText'));

    expect(screen.getByText('mocked_CreateUpdateObjective')).toBeInTheDocument();
    expect(screen.queryByText('mocked_CreateUpdateObjectives')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancel'));
    expect(screen.queryByText('mocked_CreateUpdateObjective')).not.toBeInTheDocument();
  });
  it('CreateButton CreateUpdateObjectives', async () => {
    render(<CreateButton useSingleStep={false} buttonText={'buttonText'} />);

    fireEvent.click(screen.getByText('buttonText'));

    expect(screen.getByText('mocked_CreateUpdateObjectives')).toBeInTheDocument();
    expect(screen.queryByText('mocked_CreateUpdateObjective')).not.toBeInTheDocument();
  });
});
