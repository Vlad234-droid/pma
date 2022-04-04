import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import GoalInfo, { DELETE_TEST_ID, EDIT_TEST_ID } from './GoalInfo';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

describe('GoalInfo', () => {
  const props = {
    id: 1,
    title: 'Test title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    data: [],
    formElements: [],
    deleteGoal: jest.fn(),
    editGoal: jest.fn(),
  };

  it('GoalInfo In Document', async () => {
    render(<GoalInfo {...props} />);

    const goal = screen.getByText('Test title');
    expect(goal).toBeInTheDocument();
  });

  it('description & subtitle is rendered', async () => {
    render(<GoalInfo {...props} />);

    const subtitle = screen.getByText('Test Subtitle');
    const desctription = screen.getByText('Test Description');

    expect(desctription).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('id provided', async () => {
    render(<GoalInfo {...props} />);

    const subtitle = screen.getByText('Test Subtitle');
    const desctription = screen.getByText('Test Description');

    expect(desctription).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('while click Delete button', async () => {
    const { queryByTestId } = render(<GoalInfo {...props} />);

    const deleteBtn = queryByTestId(DELETE_TEST_ID);
    fireEvent.click(deleteBtn);

    expect(props.deleteGoal).not.toHaveBeenCalledTimes(1);
  });

  it('while click Edit button', async () => {
    const { queryByTestId } = render(<GoalInfo {...props} />);

    const editBtn = queryByTestId(EDIT_TEST_ID);
    fireEvent.click(editBtn);

    expect(props.editGoal).not.toHaveBeenCalledTimes(2);
  });
});
