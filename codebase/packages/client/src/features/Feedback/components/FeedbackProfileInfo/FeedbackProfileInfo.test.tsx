import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import FeedbackProfileInfo, { TEST_ID } from './FeedbackProfileInfo';
import { fireEvent } from '@testing-library/react';

describe('FeedbackProfileInfo', () => {
  const props = {
    firstName: 'Name',
    lastName: 'LastName',
    job: 'Test Job',
    department: 'Test Department',
    updatedTime: '1 day',
    onExpandPress: jest.fn(),
  };

  it('should render', async () => {
    const { queryByTestId } = render(<FeedbackProfileInfo {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render firstName', async () => {
    render(<FeedbackProfileInfo {...props} />);
    expect(props.firstName).toBe('Name');
  });

  it('should render lastName', async () => {
    render(<FeedbackProfileInfo {...props} />);
    expect(props.lastName).toBe('LastName');
  });

  it('should render job', async () => {
    render(<FeedbackProfileInfo {...props} />);
    expect(props.job).toBe('Test Job');
  });

  it('should render department', async () => {
    render(<FeedbackProfileInfo {...props} />);
    expect(props.department).toBe('Test Department');
  });

  it('should render updatedTime', async () => {
    render(<FeedbackProfileInfo {...props} />);
    expect(props.updatedTime).toBe('1 day');
  });

  it('should click onExpandPress', async () => {
    const { getByRole } = render(<FeedbackProfileInfo {...props} />);
    const button = getByRole('button');

    fireEvent.click(button);
    expect(props.onExpandPress).toBeCalled();
  });
});
