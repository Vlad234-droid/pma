import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReviewsActions } from '@pma/store';
import { renderWithTheme as render, screen } from '../../../utils/test';
import CreateObjectives from './CreateObjectives';

const testSchema = {
  components: [
    {
      key: 'title',
      label: '**Priority title**',
      type: 'textfield',
      id: 'Field_141o520',
      validate: { minLength: 10, required: true, maxLength: 10000 },
      description: 'Example: Build additional backlinks for Our Tesco.',
      description_origin: 'Example: Build additional backlinks for Our Tesco.',
    },
    {
      key: 'description',
      label: '**Description**',
      type: 'textfield',
      id: 'Field_05qgsfz',
      validate: { required: true, minLength: 10, maxLength: 10000 },
      description:
        'Example: Build 40 additional backlinks for Our Tesco by June. To do so I will connect with Ellie and Andrew from PR to develop an effective outreach strategy.',
      description_origin:
        'Example: Build 40 additional backlinks for Our Tesco by June. To do so I will connect with Ellie and Andrew from PR to develop an effective outreach strategy.',
    },
    {
      text: '**Please wait for the Big 6 to be published before submitting your priorities.**',
      type: 'text',
      id: 'Field_026gti0',
      text_origin: '**Please wait for the Big 6 to be published before submitting your priorities.**',
    },
  ],
  metadata: { cycle: {} },
};
describe('CreateObjectives', () => {
  it('creates draft when user clicks on "Review & Submit" button', async () => {
    const schema = { meta: { loading: false, loaded: true, error: null }, current: testSchema };
    const titleTestId = 'textarea-data.0.properties.title';
    const descriptionTestId = 'textarea-data.0.properties.description';

    jest.spyOn(ReviewsActions, 'createReview');
    jest.spyOn(ReviewsActions, 'updateReview');

    render(<CreateObjectives onClose={jest.fn()} onSuccessClose={jest.fn()} />, { schema });

    const reviewAndSubmitButton = screen.getByRole('button', { name: 'Review & Submit' });

    expect(reviewAndSubmitButton).toHaveAttribute('aria-disabled', 'true');

    userEvent.paste(screen.getByTestId(titleTestId), 'Priority Title 1');
    userEvent.paste(screen.getByTestId(descriptionTestId), 'Priority Description 1');

    await waitFor(() => expect(reviewAndSubmitButton).not.toHaveAttribute('aria-disabled', 'true'));

    userEvent.click(reviewAndSubmitButton);

    expect(ReviewsActions.createReview).toHaveBeenCalled();

    expect(screen.getByText('Please review your priorities')).toBeInTheDocument();
    expect(screen.getByText('Priority Title 1')).toBeInTheDocument();
    expect(screen.getByText('Priority Description 1')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Back' }));

    userEvent.clear(screen.getByTestId(titleTestId));
    userEvent.paste(screen.getByTestId(titleTestId), 'Priority Title 2');
    userEvent.clear(screen.getByTestId(descriptionTestId));
    userEvent.paste(screen.getByTestId(descriptionTestId), 'Priority Description 2');

    userEvent.click(screen.getByRole('button', { name: 'Review & Submit' }));

    expect(screen.queryByText('Priority Title 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Priority Description 1')).not.toBeInTheDocument();
    expect(screen.getByText('Priority Title 2')).toBeInTheDocument();
    expect(screen.getByText('Priority Description 2')).toBeInTheDocument();
  });
});
