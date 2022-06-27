// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { act } from '@testing-library/react';
// @ts-ignore
import { Status, ReviewType } from 'config/enum';
import { FormType } from '@pma/store';
import { SchemaFixtureVariables } from 'utils/test/fixtures/schema';
import ColleagueGroupReviews from './ColleagueGroupReviews';

describe('<ColleagueGroupReviews />', () => {
  const mock = jest.fn();
  const props = {
    reviews: [
      {
        number: 1,
        status: 'WAITING_FOR_APPROVAL',
        type: 'OBJECTIVE',
        properties: {
          textfield: 'textfield_textfield',
        },
        uuid: '181673cb-7a1f-492e-b7b2-f80f9686b49c',
      },
    ],
    schema: {
      components: [
        {
          label: SchemaFixtureVariables.TEXT_FIELD_LABEL_OBJECTIVE,
          type: FormType.TEXT_FIELD,
          id: 'Field_0geokc1',
          key: FormType.TEXT_FIELD,
          validate: {
            required: false,
            maxLength: 500,
          },
          expression: {},
        },
      ],
    },
    updateReviewStatus: () => (t) => mock(t),
    updateColleagueReviews: jest.fn(),
    reviewType: ReviewType.OBJECTIVE,
    status: Status.WAITING_FOR_APPROVAL,
  };
  describe('#render', () => {
    it('should render ', async () => {
      await act(async () => {
        render(<ColleagueGroupReviews {...props} />);

        // const decline = screen.getAllByRole('button', { name: /Decline/i })[1];
        // const approve = screen.getByRole('button', { name: /Approve/i });

        expect(screen.getByText(SchemaFixtureVariables.TEXT_FIELD_LABEL_OBJECTIVE)).toBeInTheDocument();
        expect(screen.getByText('textfield_textfield')).toBeInTheDocument();

        // expect(decline).not.toHaveAttribute('aria-disabled', 'true');
        // expect(approve).not.toHaveAttribute('aria-disabled', 'true');
        expect(mock).toBeCalled();
      });
    });
  });
});
