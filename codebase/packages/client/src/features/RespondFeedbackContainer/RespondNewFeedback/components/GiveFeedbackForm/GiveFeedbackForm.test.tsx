import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import GiveFeedbackForm from './GiveFeedbackForm';
import { FORM_WRAPPER } from './GiveFeedbackForm';
import { waitFor } from '@testing-library/react';

describe('GiveFeedbackForm container', () => {
  const props = {
    onSubmit: jest.fn(),
    defaultValues: [{ content: 'test' }, { content: 'test' }, { content: '' }],
    currentColleague: {},
    goToInfo: jest.fn(),
    feedbackFields: [{}],
  };

  const submitContent = {
    feedbackItems: [
      { content: 'test2', code: 'Question 1' },
      { content: 'test2', code: 'Question 2' },
      { content: 'wefwef', code: 'Anything else?' },
    ],
    status: 'PENDING',
    targetColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
  };

  const colleagues = {
    list: [
      {
        colleague: {
          colleagueUUID: '15818570-cd6b-4957-8a82-3d34dcb0b077',
          contact: null,
          countryCode: null,
          effectivity: null,
          employeeId: null,
          externalSystems: null,
          profile: {
            dateOfBirth: null,
            firstName: 'John',
            gender: null,
            lastName: 'Dow',
            middleName: '',
            title: null,
          },
          serviceDates: null,
          workRelationships: [
            {
              department: { businessType: null, id: null, name: 'Kesgrave Metro' },
              job: { code: null, costCategory: null, id: null, name: 'Customer Assistant' },
            },
          ],
        },
        profileAttributes: null,
      },
    ],
  };

  it('it should render form', () => {
    const { getByTestId } = render(<GiveFeedbackForm {...props} />, { colleagues });
    const wrapper = getByTestId(FORM_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it sould submit form', async () => {
    render(<GiveFeedbackForm {...props} />, { colleagues });
    props.onSubmit(submitContent);
    await waitFor(() => expect(props.onSubmit).toBeCalled());
  });
  it('should display textarea', async () => {
    const { getByTestId } = render(<GiveFeedbackForm {...props} />, { colleagues });
    const textarea = getByTestId('feedbackItems.0');
    expect(textarea).toBeInTheDocument();
  });
});
