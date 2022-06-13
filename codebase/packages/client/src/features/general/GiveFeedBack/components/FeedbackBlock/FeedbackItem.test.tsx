import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import FeedbackItem, { TEST_ID } from './FeedbackItem';

describe('PDP Form', () => {
  const props = {
    item: {
      uuid: 'f30ff615-6f64-4fcf-9029-a92e50e68c59',
      status: 'SUBMITTED',
      feedbackItems: [
        {
          uuid: '1c819817-d3cb-4384-99dd-48e7ba52ebb0',
          code: 'Question 1',
          content: 'Content test 1',
          feedbackUuid: 'f30ff615-6f64-4fcf-9029-a92e50e68c59',
        },
        {
          uuid: '3341ae43-e27e-4ef8-a8c7-3ec2a1470c02',
          code: 'Question 2',
          content: 'Content test 2',
          feedbackUuid: 'f30ff615-6f64-4fcf-9029-a92e50e68c59',
        },
        {
          uuid: '2076ad4e-ceef-4f81-b692-bc3af369933d',
          code: 'Anything else?',
          content: 'Content test 3',

          feedbackUuid: 'f30ff615-6f64-4fcf-9029-a92e50e68c59',
        },
      ],
    },
    title: 'Test title',
    itemCodeText: 'Question 2',
  };

  it('should render FeedbackItem', async () => {
    const { getByTestId } = render(<FeedbackItem {...props} />);
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should render Title', async () => {
    const { getByText } = render(<FeedbackItem {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });
});
